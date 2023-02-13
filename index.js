require('dotenv').config();

const {REST} = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { Client, GatewayIntentBits, Collection } = require('discord.js');

const fs = require('fs');
const path = require('path');

const client = new Client({

    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
});

// List of all commands

const commands = [];
client.commands = new Collection();

const commandPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandPath).filter(file => file.endsWith('.js'));

/*
Grabs all files within the directory ending in .js
to read each command into the commands array.
*/

for (const file of commandFiles) {

    const filePath = path.join(commandPath, file);
    const command = require(filePath);

    client.commands.set(command.data.name, command);
    commands.push(command.data.toJSON());
}

// On start, similar to Discord.py.
client.on("ready", () => {
    // Grabs all ids from servers to register with all servers.
    const guild_ids = client.guilds.cache.map(guild => guild.id);
    const rest = new REST({version: '9'}).setToken(process.env.token);

    for (const guildId of guild_ids) {

        rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, guildId),
            {body: commands})
        .then(() => console.log('Successfully updated the commands for guild ' + guildId))
        .catch(console.error);
    }

});


/* Direct interaction. Say / to trigger. Reaches into the commandname in said directory and--
-- returns specification. */
client.on("interactionCreate", async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try { await command.execute(interaction); }
    catch {
        console.error(error);
        await interaction.reply({content: "There was an error executing this command."});
    }
});

// Expect others below for other interaction ticks.

client.login(process.env.TOKEN);