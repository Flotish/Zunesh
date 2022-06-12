const { MessageEmbed } = require('discord.js');

module.exports = {
    name : 'ping',
    category: 'utils',
    permissions: ['SEND_MESSAGES'],
    ownerOnly: false,
    usage: 'ping',
    examples: ['ping'],
    description : 'Commande de ping renvoie la latence du bot et de L\'API',
    async run(client, message, args){
        const tryPong = await message.channel.send("On essaye de Pong ... un instant svp !");

        const embed = new MessageEmbed()
            .setTitle(':ping_pong: pong!')
            .setThumbnail(client.user.displayAvatarURL())
            .addFields(
                {name : 'Latence API', value: `\`\`\`${client.ws.ping}ms\`\`\``, inline: true},
                {name : 'latence BOT', value: `\`\`\`${tryPong.createdTimestamp - message.createdTimestamp}ms\`\`\``, inline: true }
            )
            .setTimestamp()
            .setFooter({text: message.author.username, iconURL: message.author.displayAvatarURL() });

        tryPong.edit({content: ' ', embeds: [embed] });
    },
    async runInteraction(client, interaction) {
        const tryPong = await interaction.reply({content: "On essaye de Pong ... un instant svp !", fetchReply: true});

        const embed = new MessageEmbed()
            .setTitle('pong! 🏓')
            .setThumbnail(client.user.displayAvatarURL())
            .addFields(
                {name : 'Latence API', value: `\`\`\`${client.ws.ping}ms\`\`\``, inline: true},
                {name : 'latence BOT', value: `\`\`\`${tryPong.createdTimestamp - interaction.createdTimestamp}ms\`\`\``, inline: true }
            )
            .setTimestamp()
            .setFooter({text: interaction.user.username, iconURL: interaction.user.displayAvatarURL() });
    
        interaction.editReply({ content: ' ', embeds: [embed] });
    }
};