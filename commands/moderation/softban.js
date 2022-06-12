const { MessageEmbed, MessageManager} = require('discord.js');

module.exports = {
    name : 'softban',
    category: 'moderation',
    permissions: ['BAN_MEMBERS'],
    ownerOnly: false,
    usage: 'softban [@membre] [duration] [reason]',
    examples: ['softban @Flo 4 raison',],
    description : 'bannis un utilisateur du Discord temporairement avec une raison',
    async run(client, message, args, guildSettings) {
        if(!args[0]) return message.reply("Spécifier un \`MEMBRE\` à bannis !")
        if(isNaN(args[1]) || !args[1] || args[1] > 7 || args[1] < 1) return message.reply("Spécifier une durée pour votre ban (entre 1 et 7 jours)")
        if(!args[2]) return message.reply("Spécifier une \`RAISON\` à votre bannissement !")

        const target = message.mentions.members.find(m => m.id);
        const duration = args [1];
        const reason = args.slice(2).join(' ');

        if(!target.bannable) return message.reply('Ce membre ne peut pas être bannis par le bot !')

        target.ban({ days : duration, reason : reason });
        message.channel.send(`Le membre ${target} à été bannis temporairement pendant ${duration} jours, pour ${reason}`);

        const embed = new MessageEmbed()
        .setAuthor({name : `softban : ${target.user.tag}` , iconURL: target.user.displayAvatarURL()})
        .setColor('#80260F')
        .setDescription(`🔨 Modérateur du ban : ${message.author.tag}
        ⌛️ Durer : ${duration} jours
        📃 Raison : ${reason}`)
        .setTimestamp()
        .setFooter({text: 'L\'utilisateur à été bannis temporairement!'})


    const logChannel = guildSettings.logChannel
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
            name: 'duration',
            description: "Durer du bannisement",
            type: 'NUMBER',
            minValue: 1,
            maxValue: 7,
            required: true     
        },
        {
            name: 'reason',
            description: "La raison du bannissement",
            type: 'STRING',
            required: true     
        },
    ],
    async runInteraction (client, interaction, guildSettings) {
        const target = interaction.options.getMember('target');
        const duration = interaction.options.getNumber('duration');
        const reason = interaction.options.getString('reason');

        if(!target.bannable) return interaction.reply('Ce membre ne peut pas être bannis par le bot !')

        target.ban({ reason });
        interaction.reply(`Le membre ${target} à été bannis temporairement pendant ${duration} jours, pour ${reason}`);

        const embed = new MessageEmbed()
         .setAuthor({name : `softban : ${target.user.tag}` , iconURL: target.user.displayAvatarURL()})
            .setColor('#80260F')
            .setDescription(`🔨 Modérateur du ban : ${interaction.user.tag}
            ⌛️ Durer : ${duration} jours
            📃 Raison : ${reason}`)
            .setTimestamp()
            .setFooter({text: 'L\'utilisateur à été bannis temporairement!'})


        const logChannel = guildSettings.logChannel
        logChannel.send({embeds : [embed]});
    },
};