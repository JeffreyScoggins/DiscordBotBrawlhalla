require('dotenv').config();
const bh_api = require('corehalla')(process.env.BRAWLHALLA_API);
const {ApplicationCommandOptionType, Client, Interaction} = require('discord.js');





module.exports = {

    
callback: async(client, interaction) => {

    const bracket = interaction.options.get('bracket-choice').value;
    const region = interaction.options.get('region').value;
    const page = interaction.options.get('page').value;
    const playerName = interaction.options.get('player-name').value;

    try{
        var options = {
            bracket,
            region,
            page,
            playerName
        }
        bh_api.
        
        bh_api.fetchLeaderboard(options).then(leaderboard => {
        
        })
        return;
    }catch(error){

        console.log(`Error returning player ranking: ${error}`);

    }

},

    name: 'ranking',
    description: 'replies with Brawlhalla rank',
    options:[
        {
            name: 'bracket-choice',
            description: 'Choose 1v1, or 2v2 for your ranking input',
            type: ApplicationCommandOptionType.String, 
            required: true,
            choices: [
                {
                    name: '1v1',
                    value: '1v1',
                },
                {
                    name: '2v2',
                    value: '2v2',
                }
            ],
           

        },
        {
            name: 'region',
            description: 'choose your region',
            type: ApplicationCommandOptionType.String,
            required: true,
            choices: [
                {
                    name: 'all',
                    value: 'all',
                },
                {
                    name: 'us-e',
                    value: 'us-e',
                },
                {
                    name: 'us-e',
                    value: 'us-w',
                },
                {
                    name: 'eu',
                    value: 'eu',
                },
                {
                    name: 'brz',
                    value: 'brz',
                },
                {
                    name: 'aus',
                    value: 'aus',
                },
                {
                    name: 'sea',
                    value: 'sea',
                },
                {
                    name: 'jap',
                    value: 'jap',
                },
            ],

        },
        {
            name: 'page',
            description: 'Page length',
            type: ApplicationCommandOptionType.Number,
            required: true,
            choices:[
                {
                name: '1',
                value: 1,
                },
            ],
        },
        {
            name: "player-name",
            description: "input player name",
            type: ApplicationCommandOptionType.String,
            required: true,
            value: '',
        },

    ],
};