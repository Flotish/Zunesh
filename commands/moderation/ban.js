const { MessageEmbed} = require('discord.js');

module.exports = {
    name : 'ban',
    category: 'moderation',
    permissions: ['BAN_MEMBERS'],
    ownerOnly: false,
    usage: 'ban [@membre]  [reason]',
    examples: ['ban @Flo raison',],
    description : 'bannis un utilisateur du Discord avec une raison',
    async run(client, message, args) { 
        if(!args[0]) return message.reply("Spécifier un \`MEMBRE\` à bannis !")
        if(!args[1]) return message.reply("Spécifier une \`RAISON\` à votre bannissement !")

        const target = message.mentions.members.find(m => m.id);
        const reason = args.slice(1).join(' ');

        if(!target.bannable) return message.reply('Ce membre ne peut pas être bannis par le bot !')

        target.ban({ reason });
        message.channel.send(`Le membre ${target} à été ban pour ${reason}`);

        const embed = new MessageEmbed()
        .setAuthor({name : `ban : ${target.user.tag}` , iconURL: target.user.displayAvatarURL()})
        .setColor('#80260F')
        .setDescription(`🔨 Modérateur du ban : ${message.author.tag}
        📃 Raison : ${reason}`)
        .setTimestamp()
        .setFooter({text: 'L\'utilisateur à été ban!'})


    const logChannel = client.channels.cache.get('949253797119684608');
    logChannel.send({embeds : [embed]});

    },
    options: [
        {
            name: 'target',
            description: "L'utilisateur à bannire",
            type: 'USER',
            required: true      
        },
        {
            name: 'reason',
            description: "La raison du bannissement",
            type: 'STRING',
            required: true     
        },
    ],
    async runInteraction (client, interaction) {

        const target = interaction.options.getMember('target');
        const reason = interaction.options.getString('reason');

        if(!target.bannable) return interaction.reply('Ce membre ne peut pas être bannis par le bot !')

        target.ban({ reason });
        interaction.reply(`Le membre ${target} à été ban pour ${reason}`);

        const embed = new MessageEmbed()
            .setAuthor({name : `ban : ${target.user.tag}` , iconURL: target.user.displayAvatarURL()})
            .setColor('#80260F')
            .setDescription(`🔨 Modérateur du ban : ${interaction.user.tag}
            📃 Raison : ${reason}`)
            .setTimestamp()
            .setFooter({text: 'L\'utilisateur à été ban!'})


        const logChannel = client.channels.cache.get('949253797119684608');
        logChannel.send({embeds : [embed]});
    },
};