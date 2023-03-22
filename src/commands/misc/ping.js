module.exports = {
    name: 'ping',
    description: 'Returns your ping speed.',
    //devOnly: Boolean,
    //testOnly: Boolean,
    //options: Object[],

    callback: async (client, interaction) => {
       await interaction.reply(`Pong! ${client.ws.ping}ms`);
    }
};