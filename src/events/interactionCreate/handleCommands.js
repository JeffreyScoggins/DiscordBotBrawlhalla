const {devs, testServer} = require('../../../config.json');
const getLocalCommands = require('../../utils/getLocalCommands');

module.exports = async(client, interaction) => {
    if (!interaction.isChatInputCommand()){
        return;
    }

    const localCommands = getLocalCommands();

    try{
        
        const commandObject = localCommands.find(
            (cmd) => cmd.name === interaction.commandName
        );

        if(!commandObject) return;

        if(commandObject.devOnly){
            if(!devs.includes(interaction.member.id)){
               await interaction.reply({
                    content: 'Only developers may use this command.',
                    ephemeral: true,
                });
                return;
            }
            
        }

        if(commandObject.testOnly){
            if(!devs.includes(interaction.member.id)){
                await interaction.reply({
                    content: 'Only testers may use this command.',
                    ephemeral: true,
                });
                return;
            }
        }
            
        // if(commandObject.permissionsRequired){
        //     console.log(commandObject.permissionsRequired, " ", interaction.member.permission);
        //     for (const permission of commandObject.permissionsRequired){
        //         if (!interaction.member.permissions.has(permission)){
        //             await interaction.reply({
        //                 content: "You don't have enough permissions",
        //                 ephemeral: true,
        //             });
        //             return;
        //         }   
        //     }
        // }

        // if(commandObject.botPermissions?.length){
        //     for(const permission of commandObject.botPermissions){
        //         const bot = interaction.guild.members.me;

        //         if (!bot.Permissions.has(permission)){
        //            await interaction.reply({
        //                 content: "I don't have enough permissions.",
        //                 ephemeral: true,
        //             });
        //             return;
        //         }
        //     }
        // }
        
        await commandObject.callback(client, interaction);
    }catch(error){
        console.log(`There was and error running this command: ${error}`);
    }

};