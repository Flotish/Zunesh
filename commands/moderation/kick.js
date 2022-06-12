const { MessageEmbed} = require('discord.js');

module.exports = {
    name : 'kick',
    category: 'moderation',
    permissions: ['KICK_MEMBERS'],
    ownerOnly: false,
    usage: 'kick [@membre]  [reason]',
    examples: ['kick @Flo raison',],
    description : 'Expulser un utilisateur du Discord avec une raison',
    async run(client, message, args, guildSettings) { 
        if(!args[0]) return message.reply("Spécifier un \`MEMBRE\` à expulser !")
        if(!args[1]) return message.reply("Spécifier une \`RAISON\` à votre expulsion !")

        const target = message.mentions.members.find(m => m.id);
        const reason = args.slice(1).join(' ');

        if(!target.kickable) return message.reply('Ce membre ne peut pas être expulser par le bot !')

        target.kick(reason);
        message.channel.send(`Le membre ${target} à été kick pour ${reason}`);
       
        const embed = new MessageEmbed()
        .setAuthor({name : `kick : ${target.user.tag}` , iconURL: target.user.displayAvatarURL()})
        .setColor('#80260F')
        .setDescription(`🔨 Modérateur du kick : ${message.author.tag}
        📃 Raison : ${reason}`)
        .setTimestamp()
        .setFooter({text: 'L\'utilisateur à été kick!'})


    const logChannel = client.channels.cache.get(guildSettings.logChannel);
    logChannel.send({embeds : [embed]});

    },
    options: [
        {
            name: 'target',
            description: "L'utilisateur à expulser",
            type: 'USER',
            required: true      
        },
        {
            name: 'reason',
            description: "La raison de l'expulsion",
            type: 'STRING',
            required: true     
        },
    ],
    async runInteraction (client, interaction, guildSettings) {
        const target = interaction.options.getMember('target');
        const reason = interaction.options.getString('reason');

        if(!target.kickable) return interaction.reply('Ce membre ne peut pas être expulser par le bot !')

        target.kick(reason);
        interaction.reply(`Le membre ${target} à été kick pour ${reason}`);

         const embed = new MessageEmbed()
            .setAuthor({name : `kick : ${target.user.tag}` , iconURL: target.user.displayAvatarURL()})
            .setColor('#80260F')
            .setDescription(`🔨 Modérateur du kick : ${interaction.user.tag}
            📃 Raison : ${reason}`)
            .setTimestamp()
            .setFooter({text: 'L\'utilisateur à été kick!'})


        const logChannel = client.channels.cache.get(guildSettings.logChannel);
        logChannel.send({embeds : [embed]});

    },
}; 