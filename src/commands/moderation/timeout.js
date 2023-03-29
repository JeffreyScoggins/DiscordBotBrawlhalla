const {ApplicationCommandOptionType, PermissionFlagsBits, Client, Interaction} = require('discord.js');
const ms = require('ms');

module.exports = {
    /**
     * 
     * @param {Client} client
     * @param {Interaction} interaction
     */

    callback: async(client, interaction) => {
        const targetUserId = interaction.options.get('target-user').value;
        const duration = interaction.options.get('duration').value; // 1d 1 day
        const msDuration = ms(duration);
        const durationInSeconds = duration / 1000;
        const durationInMinutes = Math.floor(duration / 1000 / 60);
        const durationInHours = Math.floor(duration / 1000 / 60 / 60);
        const durationInDays = Math.floor(duration / 1000 / 60 / 60 / 24);
        const reason = interaction.options.get('reason')?.value || "No reason provided";
        
        //await interaction.deferReply();

        const targetUser = await interaction.guild.members.fetch(targetUserId);

        if(!targetUser){
            await interaction.editReply("That user does not exist on this server.", {verbose: true});
            return;
        }

        if(targetUser.user.bot){
            await interaction.editReply("I can't time out a bot.", {verbose: true});
            return;
        }

        if(targetUserId === interaction.guild.ownerId){
            await interaction.editReply("You can't timeout the server owner.", {verbose: true});
            return;
        }
        
        // const targetUserRolePosition = targetUser.role.highest.position; // Highest role of target user
        // const requestUserRolePosition = interaction.member.role.highest.position; //highest role of user running command
        // const botRolePosition = interaction.guild.me.role.highest.position // Highest role of bot
        
        // if (targetUserRolePosition >= requestUserRolePosition){
        //     await interaction.editReply("You can't timeout users that have the same/higher role.", {verbose: true});
        //     return;
        // }

        // if (targetUserRolePosition >= botRolePosition){
        //     await interaction.editReply("I can't timeout users that have the same/higher role than me.", {verbose: true});
        //     return;
        // }

        // if (isNaN(msDuration)){
        //     await interaction.editReply("Please provide a valid timeout duration.", {verbose: true});
        //     return;
        // }

        if (msDuration <5000 || msDuration > 2.419e9){
            await interaction.editReply("Timeout cannot be less than 5 seconds, or more than 28 days.", {verbose: true});
            return;
        }

        //timeout target user
        try{
            const {default: prettyMs} = await import('pretty-ms');
            if (duration == 0){
                duration == null;
            }

            var date = new Date();
            date.setMilliseconds(duration);
            var isoDate = date.toISOString();
           
            
            
            

            // if (targetUser.isCommunicationDisabled()){
            //     console.log("Timing Out User");
            //     await targetUser.timeout(msDuration, reason)
            //     await interaction.editReply(`${targetUser}'s timeout has been updated to ${prettyMs(msDuration, {verbose: true})}\nReason: ${reason}`);
            //     return;
            // }
            console.log(`Timing Out User ${targetUser} for ${isoDate}`);
            await targetUser.timeout(duration, reason);
            if (durationInSeconds < 60){
                await interaction.reply(`${targetUser} was timed out for ${durationInSeconds} seconds\nReason: ${reason}`)
            } else if (durationInMinutes < 2){
                await interaction.reply(`${targetUser} was timed out for ${durationInMinutes} minute\nReason: ${reason}`)
            } else if (durationInMinutes >= 2 && durationInMinutes < 60){
                await interaction.reply(`${targetUser} was timed out for ${durationInMinutes} minutes\nReason: ${reason}`)
            } else if (durationInHours < 2){
                await interaction.reply(`${targetUser} was timed out for ${durationInHours} hour\nReason: ${reason}`)
            } else if (durationInHours > 1 && durationInHours < 24){
                await interaction.reply(`${targetUser} was timed out for ${durationInHours} hours\nReason: ${reason}`)
            } else if (durationInDays >= 1 && durationInDays < 2) {
                await interaction.reply(`${targetUser} was timed out for ${durationInDays} day\nReason: ${reason}`)
            } else {
                await interaction.reply(`${targetUser} was timed out for ${durationInDays} days\nReason: ${reason}`)
            }
        }catch(error){
            console.log(`There was an error when timing out: ${error}`);
        }
    },

    name: 'timeout',
    description: 'times out a member from the server',
    //devOnly: Boolean,
    //testOnly: Boolean,
    options: [
        {
            name: 'target-user',
            description: 'the user you want to timeout',
            required: true,
            type: ApplicationCommandOptionType.Mentionable,
        },
        {
            name: 'duration',
            description: 'Timeout duration in milliseconds',
            required: true,
            type: ApplicationCommandOptionType.Integer,
            choices: [
                {
                    name: '1 minute',
                    value: '60000',
                },
                {
                    name: '5 minutes',
                    value: '300000',
                },
                {
                    name: '10 minutes',
                    value: '600000',
                },
                {
                    name: '30 minutes',
                    value: '1800000',
                },
                {
                    name: '1 hour',
                    value: '3600000',
                },
                {
                    name: '2 hours',
                    value: '7200000',
                }, 
                {
                    name: '8 hours',
                    value: '28800000',
                },                {
                    name: '1 Day',
                    value: '86400000',
                },
                
            ]

        },
        {
            name: 'reason',
            description: 'reason for timeout',
            type: ApplicationCommandOptionType.String,
        }
    ],
    permissionsRequired: [PermissionFlagsBits.MuteMembers],
    botPermissions: [PermissionFlagsBits.MuteMembers],

};