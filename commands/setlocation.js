const { SlashCommandBuilder, messageLink } = require('@discordjs/builders');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('setlocation')
        .setDescription('Set current location to fetch stored information.')
        // Description and title on slash command.
    ,
    async execute(interaction) {

        await interaction.reply(interaction.user.tag);
        // Bot output. /ping comes in, 'Pong?' goes out.
    }

}