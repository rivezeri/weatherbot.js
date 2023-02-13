/* EXAMPLE:
Most is pretty easy functional stuff. Just follow the string 
modifiers and follow documentation.
*/

const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with pong')
        // Description and title on slash command.
    ,
    async execute(interaction) {
        await interaction.reply('Pong?');
        // Bot output. /ping comes in, 'Pong?' goes out.
    }

}