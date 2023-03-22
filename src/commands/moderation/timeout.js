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
        
        // const targetUserRolePosition = targetUser.roles.highest.position; // Highest role of target user
        // const requestUserRolePosition = interaction.member.roles.highest.position; //highest role of user running command
        // const botRolePosition = interaction.guild.me.roles.highest.position // Highest role of bot
        
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
            await targetUser.timeout(isoDate);
            await interaction.editReply(`${targetUser} was timed out for ${prettyMs(msDuration, {verbose: true})}\nReason: ${reason}`)
            await interaction.editReply( `User ${targetUser} was timed out\nReason: ${reason}`);
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