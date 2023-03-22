const {ApplicationCommandOptionType, PermissionFlagsBits, Client, Interaction} = require('discord.js');

module.exports = {
    /**
     * 
     * @param {Client} client
     * @param {Interaction} interaction
     */

    callback: async(client, interaction) => {
        const targetUserId = interaction.options.get('target-user').value;
        const reason = interaction.options.get('reason')?.value || "No reason provided";
        
        await interaction.deferReply();

        const targetUser = await interaction.guild.members.fetch(targetUserId);

        if(!targetUser){
            await interaction.editReply("That user does not exist on this server.", {verbose: true});
            return;
        }

        if(targetUserId === interaction.guild.ownerId){
            await interaction.editReply("You can't warn the server owner.", {verbose: true});
            return;
        }
        
        // const targetUserRolePosition = targetUser.roles.highest.position; // Highest role of target user
        // const requestUserRolePosition = interaction.member.roles.highest.position; //highest role of user running command
        // const botRolePosition = interaction.guild.me.roles.highest.position // Highest role of bot

        // if (targetUserRolePosition >= requestUserRolePosition){
        //     await interaction.editReply("You can't warn users that have the same/higher role.");
        //     return;
        // }

        // if (targetUserRolePosition >= botRolePosition){
        //     await interaction.editReply("I can't warn users that have the same/higher role than me.");
        //     return;
        // }

        //warns target user
        try{
            console.log("Warning User");
            await console.warn(`${targetUser}`);
            await interaction.editReply( `User ${targetUser} was warned\nReason: ${reason}`);
        }catch(error){
            console.log(`There was an error when warning: ${error}`);
        }
    },

    name: 'warn',
    description: 'warns a member on the server',
    //devOnly: Boolean,
    //testOnly: Boolean,
    options: [
        {
            name: 'target-user',
            description: 'the user you want to warn',
            required: true,
            type: ApplicationCommandOptionType.Mentionable,
        },
        {
            name: 'reason',
            description: 'reason for warn',
            type: ApplicationCommandOptionType.String,
        }
    ],
    permissionsRequired: [PermissionFlagsBits.MuteMembers],
    botPermissions: [PermissionFlagsBits.MuteMembers],



};