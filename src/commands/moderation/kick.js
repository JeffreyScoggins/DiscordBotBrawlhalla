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
            await interaction.editReply("You can't kick the server owner.", {verbose: true});
            return;
        }
        
        const targetUserRolePosition = targetUser.roles.highest.position; // Highest role of target user
        const requestUserRolePosition = interaction.member.roles.highest.position; //highest role of user running command
        const botRolePosition = interaction.guild.me.roles.highest.position // Highest role of bot

        if (targetUserRolePosition >= requestUserRolePosition){
            await interaction.editReply("You can't kick users that have the same/higher role.", {verbose: true});
            return;
        }

        if (targetUserRolePosition >= botRolePosition){
            await interaction.editReply("I can't kick users that have the same/higher role than me.", {verbose: true});
            return;
        }

        //kicks target user
        try{
            await targetUser.kick({reason});
            await interaction.editReply( `User ${targetUser} was kicked\nReason: ${reason}`);
        }catch(error){
            console.log(`There was an error when kicking: ${error}`);
        }
    },

    name: 'kick',
    description: 'kicks a member from the server',
    //devOnly: Boolean,
    //testOnly: Boolean,
    options: [
        {
            name: 'target-user',
            description: 'the user you want to kick',
            required: true,
            type: ApplicationCommandOptionType.Mentionable,
        },
        {
            name: 'reason',
            description: 'reason for kicking',
            type: ApplicationCommandOptionType.String,
        }
    ],
    permissionsRequired: [PermissionFlagsBits.BanMembers],
    botPermissions: [PermissionFlagsBits.BanMembers],



};