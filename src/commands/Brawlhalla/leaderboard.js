require('dotenv').config();
const bh_api = require('corehalla')(process.env.BRAWLHALLA_API);
const {ApplicationCommandOptionType, Client, Interaction} = require('discord.js');





module.exports = {

    
callback: async(client, interaction) => {

    const bracket = interaction.options.get('bracket-choice').value;
    const region = interaction.options.get('region').value;
    const page = Number('1');

    try{
        var options = {
            bracket,
            region,
            page
        }
    
    leaderboard = await bh_api.fetchLeaderboard(options).catch(err => console.log(err));
    let leaderboardString = "";

    for (let [key, value, count] of Object.entries(leaderboard)) {
        count = ++key;
        if (count > 10){
            break;
        } else {
        leaderboardString +="**Rank:** " + count + "\n";
        leaderboardString += "**Name:** " + value.name + "\n";
        leaderboardString += "**Tier: **" + value.tier + "\n";
        leaderboardString += "**Games Played:** " + value.games + "\n";
        leaderboardString += "**Games Won:** " + value.wins + "\n";
        leaderboardString += "**Win Ratio:** " + value.wins/value.games + "\n";
        leaderboardString +="\n";
        }
    }

    //console.log(leaderboardString);
    if (leaderboardString.length < 2000){
   
        interaction.reply(`${leaderboardString}`);
    } else {

        // Creates a "message already created error" on 2nd loop////////////FIX ME////////////
        for (let i = 0, amount = Math.ceil(leaderboardString.length / 2000); i <= amount; i++){
            let breakLine = leaderboardString.lastIndexOf("```", 2000);
            leaderboardSubstring = leaderboardString.substring(0, breakLine);
            leaderboardString = leaderboardString.substring(breakLine, leaderboardString.length - 1);
            interaction.reply(`${leaderboardSubstring}`);

            
        }
    }
    

    return;

    }catch(error){

        return console.log(`Error returning player ranking: ${error}`);

    }

},

    name: 'leaderboard',
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
                    name: 'usa-east',
                    value: 'us-e',
                },
                {
                    name: 'usa-west',
                    value: 'us-w',
                },
                {
                    name: 'europe',
                    value: 'eu',
                },
                {
                    name: 'brazil',
                    value: 'brz',
                },
                {
                    name: 'austrailia',
                    value: 'aus',
                },
                {
                    name: 'souteast-asia',
                    value: 'sea',
                },
                {
                    name: 'japan',
                    value: 'jap',
                },
            ],

        },
    ],
};