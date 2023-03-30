require('dotenv').config();
const bh_api = require('corehalla')(process.env.BRAWLHALLA_API);
const {ApplicationCommandOptionType, Client, Interaction} = require('discord.js');





module.exports = {

    
callback: async(client, interaction) => {

    const playerName = interaction.options.get('player-name').value;  
    var options = {
        perfect_match: false,
        unique: false
    }   

    try{
       
        playerStats = bh_api.findPlayer(playerName, options).catch(err => console.log(err)).then(playerStats => {console.log(playerStats);
        })
        //await interaction.reply(`${playerStats}`);

        return;
    }catch(error){

        return console.log(`${error}`);

        

    }

},

    name: 'player-stats',
    description: 'replies with Brawlhalla rank',
    options:[
        {
            name: "player-name",
            description: "input player name",
            type: ApplicationCommandOptionType.String,
            required: true,
            value: '',
        },

    ],
};