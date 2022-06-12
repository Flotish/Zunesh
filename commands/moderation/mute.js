const { MessageEmbed, MessageManager} = require('discord.js');
const ms = require('ms');

module.exports = {
    name : 'mute',
    category: 'moderation',
    permissions: ['MODERATE_MEMBERS'],
    ownerOnly: false,
    usage: 'mute [@membre] [duration] [reason]',
    examples: ['mute @Flo 4 minutes raison',],
    description : 'mute un utilisateur du Discord temporairement avec une raison',
    async run(client, message, args) { 
        const fetchGuild = await client.getGuild(member.guild);
        if(!args[0]) return message.reply("Spécifier un \`MEMBRE\` à mute !")
        if(!args[1] || !args[2]) return message.reply("Spécifier une durée pour votre mute")
        if(!args[3]) return message.reply("Spécifier une \`RAISON\` à votre mute !")

        const target = message.mentions.members.find(m => m.id);
        const duration = args.slice(1, 3).join(' ');
        const convertedTime = ms(duration);
        const reason = args.slice(3).join(' ');

        if(!target.moderatable) return message.reply('Ce membre ne peut pas être mute par le bot !')
        if(!convertedTime) return interaction.reply('Spécifier une durer valable !');

        target.timeout(convertedTime, reason);
        message.channel.send(`Le membre ${target} à été mute pendant ${duration}, pour ${reason}`);

        const embed = new MessageEmbed()
        .setAuthor({name : `mute : ${target.user.tag}` , iconURL: target.user.displayAvatarURL()})
        .setColor('#80260F')
        .setDescription(`🔨 Modérateur du mute : ${message.author.tag}
        ⌛️ Durer : ${duration}
        📃 Raison : ${reason}`)
        .setTimestamp()
        .setFooter({text: 'L\'utilisateur à été muter!'})


    const logChannel = client.channels.cache.get(fetchGuild.logChannel);
    logChannel.send({embeds : [embed]});

    },
    options: [
        {
            name: 'target',
            description: "L'utilisateur à muter",
            type: 'USER',
            required: true      
        },
        {
            name: 'duration',
            description: "Durer du mute",
            type: 'STRING',
            required: true     
        },
        {
            name: 'reason',
            description: "La raison du mute",
            type: 'STRING',
            required: true     
        },
    ],
    async runInteraction (client, interaction) {
        const fetchGuild = await client.getGuild(member.guild);
        const target = interaction.options.getMember('target');
        const duration = interaction.options.getString('duration');
        const convertedTime = ms(duration);
        const reason = interaction.options.getString('reason');

        if(!target.moderatable) return interaction.reply('Ce membre ne peut pas être mute par le bot !')
        if(!convertedTime) return interaction.reply('Spécifier une durer valable !');

        target.timeout(convertedTime, reason);
        interaction.reply(`Le membre ${target} à été mute pendant ${duration}, pour ${reason}`);

        const embed = new MessageEmbed()
        .setAuthor({name : `mute : ${target.user.tag}` , iconURL: target.user.displayAvatarURL()})
        .setColor('#80260F')
        .setDescription(`🔨 Modérateur du mute : ${interaction.user.tag}
        ⌛️ Durer : ${duration}
        📃 Raison : ${reason}`)
        .setTimestamp()
        .setFooter({text: 'L\'utilisateur à été muter!'})


        const logChannel = client.channels.cache.get(fetchGuild.logChannel);
        logChannel.send({embeds : [embed]});
    },
};