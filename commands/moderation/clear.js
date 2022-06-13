const { MessageEmbed} = require('discord.js');

module.exports = {
    name : 'clear',
    category: 'moderation',
    permissions: ['MANAGE_MESSAGES'],
    ownerOnly: false,
    usage: 'clear [amount] <@target>',
    examples: ['clear 50','clear 50 @Flo'],
    description : 'Supprimer un nombre de messages spécifier sur un salon ou un utilisateur',
    async run(client, message, args, guildSettings) { 
        
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
                
                const embed = new MessageEmbed()
                .setAuthor({name : `clear : ${amountToDelete} messages de ${target}`})
                .setColor('#0CDACD')
                .setDescription(`🧹 Modérateur du clear : ${message.author.tag}
                📃 Personne clear: ${target}`)
                .setTimestamp()
                .setFooter({text: `${amountToDelete} messages supprimé`})
                const logChannel = client.channels.cache.get(guildSettings.logChannel);
                 logChannel.send({embeds : [embed]});
            })
        } else {
            await message.channel.bulkDelete(amountToDelete, true).then(messages =>{
                message.channel.send(`j'ai supprimé ${messages.size} messages sur ce salon !`);

                const embed = new MessageEmbed()
                .setAuthor({name : `clear : ${amountToDelete} messages`})
                .setColor('#0CDACD')
                .setDescription(`🧹 Modérateur du clear : ${message.author.tag}`)
                .setTimestamp()
                .setFooter({text: `${amountToDelete} messages supprimé`})
                const logChannel = client.channels.cache.get(guildSettings.logChannel);
                 logChannel.send({embeds : [embed]});
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
    async runInteraction (client, interaction, guildSettings) {
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
                
                const embed = new MessageEmbed()
                .setAuthor({name : `clear : ${amountToDelete} messages de ${target}`})
                .setColor('#0CDACD')
                .setDescription(`🧹 Modérateur du clear : ${interaction.user.tag}
                📃 Personne clear: ${target}`)
                .setTimestamp()
                .setFooter({text: `${amountToDelete} messages supprimé`})
                const logChannel = client.channels.cache.get(guildSettings.logChannel);
                 logChannel.send({embeds : [embed]});
         })
        } else {
            await interaction.channel.bulkDelete(amountToDelete, true).then(messages =>{
                interaction.reply(`j'ai supprimé ${messages.size} messages sur ce salon !`);
                
                const embed = new MessageEmbed()
                .setAuthor({name : `clear : ${amountToDelete}}`})
                .setColor('#0CDACD')
                .setDescription(`🧹 Modérateur du clear : ${interaction.user.tag}`)
                .setTimestamp()
                .setFooter({text: `${amountToDelete} messages supprimé`})
                const logChannel = client.channels.cache.get(guildSettings.logChannel);
                 logChannel.send({embeds : [embed]});
            })
        }
    const logChannel = client.channels.cache.get(guildSettings.logChannel);
    logChannel.send({embeds : [embed]});
    },
}; 