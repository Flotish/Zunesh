module.exports = {
    name : 'clear',
    category: 'moderation',
    permissions: ['MANAGE_MESSAGES'],
    ownerOnly: false,
    usage: 'clear [amount] <@target>',
    examples: ['clear 50','clear 50 @Flo'],
    description : 'Supprimer un nombre de messages spécifier sur un salon ou un utilisateur',
    async run(client, message, args) { 
        
        const amountToDelete = args[0];
        if(!args[0] || isNaN(amountToDelete) || amountToDelete > 100 || amountToDelete <= 1) return message.reply('le \`NOMBRE\` doit être inférieur à 100 et supérieur à 1');

        const target = message.mentions.users.find(u => u.id);
        await message.delete();
        
        const messagesToDelete = await message.channel.messages.fetch();

        if(target){
            let i = 0;
            const filteredTargetMessages = [];
            (await messagesToDelete).filter(msg => {
                if(msg.author.id == target.id && amountToDelete > i) {
                    filteredTargetMessages.push(msg); i++
                }
            });

            await message.channel.bulkDelete(filteredTargetMessages, true).then(messages =>{
                message.channel.send(`j'ai supprimé ${messages.size} messages sur l'utilisateur ${target} !`);
            })
        } else {
            await message.channel.bulkDelete(amountToDelete, true).then(messages =>{
                message.channel.send(`j'ai supprimé ${messages.size} messages sur ce salon !`);
            })
        }

    },
    options: [
        {
            name: 'message',
            description: 'Le nombre de message a supprimer',
            type: 'NUMBER',
            required: true      
        },
        {
            name: 'target',
            description: "Séléctionner l'utilisateur pour la suppression de message",
            type: 'USER',
            required: false     
        },
    ],
    async runInteraction (client, interaction) {
        const amountToDelete = interaction.options.getNumber('message');
        if(amountToDelete > 100 || amountToDelete < 0) return interaction.reply('le \`NOMBRE\` doit être inférieur à 100 et supérieur à 0');

        const target = interaction.options.getMember('target');
        
        const messagesToDelete = await interaction.channel.messages.fetch();

        if(target){
            let i = 0;
            const filteredTargetMessages = [];
            (await messagesToDelete).filter(msg => {
                if(msg.author.id == target.id && amountToDelete > i) {
                    filteredTargetMessages.push(msg); i++
                }
            });

            await interaction.channel.bulkDelete(filteredTargetMessages, true).then(messages =>{
                interaction.reply(`j'ai supprimé ${messages.size} messages sur l'utilisateur ${target} !`);
            })
        } else {
            await interaction.channel.bulkDelete(amountToDelete, true).then(messages =>{
                interaction.reply(`j'ai supprimé ${messages.size} messages sur ce salon !`);
            })
        }
    },
}; 