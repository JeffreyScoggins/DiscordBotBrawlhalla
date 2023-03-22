const {ApplicationCommandOptionType} = require('discord.js');

module.exports = {

    callback: async(client, interaction) => {

        const question = interaction.options.get('question').value;
        const choice1 = interaction.options.get('choice-1').value;
        const choice2 = interaction.options.get('choice-2').value;
        const choice3 = interaction.options.get('choice-3')?.value;
        const choice4 = interaction.options.get('choice-4')?.value;

        try{

            if(choice3 === undefined && choice4 === undefined){
                await interaction.reply(`Poll Created!\n
                ${question}:\n
                1. ${choice1} 1️⃣\n
                2. ${choice2} 2️⃣\n`)
                return;
            }
           
            
            if(choice4 === undefined){
                await interaction.reply(`Poll Created!\n
                ${question}:\n
                1. ${choice1} 1️⃣\n
                2. ${choice2} 2️⃣\n
                3. ${choice3} 3️⃣\n`)
                return;
            }

            if(choice3 === undefined){
                await interaction.reply(`Poll Created!\n
                ${question}:\n
                1. ${choice1} 1️⃣\n
                2. ${choice2} 2️⃣\n
                3. ${choice4} 3️⃣\n`)
                return;
            }

            
            else{
                await interaction.reply(`Poll Created!\n
                ${question}:\n
                1. ${choice1} 1️⃣\n
                2. ${choice2} 2️⃣\n
                3. ${choice3} 3️⃣\n
                4. ${choice4} 4️⃣`)
                return;

            }


            return;
        }catch(error){
    
            console.log(`Error returning player ranking: ${error}`);
    
        }
    
    },




    name: 'poll',
    description: 'Creates a poll.',
    //devOnly: Boolean,
    //testOnly: Boolean,
    options: [
        {
            name: 'question',
            description: 'poll question',
            required: true,
            type: ApplicationCommandOptionType.String,
        },
        {
            name: 'choice-1',
            description: 'Choice 1',
            required: true,
            type: ApplicationCommandOptionType.String,
        },
        {
            name: 'choice-2',
            description: 'Choice 2',
            required: true,
            type: ApplicationCommandOptionType.String,
        },
        {
            name: 'choice-3',
            description: 'Choice 3',
            type: ApplicationCommandOptionType.String,
        },
        {
            name: 'choice-4',
            description: 'Choice 4',
            type: ApplicationCommandOptionType.String,
        }
    ],
}