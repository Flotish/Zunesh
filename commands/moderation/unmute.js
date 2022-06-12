const { MessageEmbed, MessageManager} = require('discord.js');

module.exports = {
    name : 'unmute',
    category: 'moderation',
    permissions: ['MODERATE_MEMBERS'],
    ownerOnly: false,
    usage: 'unmute [@membre]',
    examples: ['unmute @Flo',],
    description : 'unmute un utilisateur du Discord',
    async run(client, message, args) { 
        const fetchGuild = await client.getGuild(member.guild);
        if(!args[0]) return message.reply("Spécifier un \`MEMBRE\` à unmute !");

        const target = message.mentions.members.find(m => m.id);

        if(!target.isCommunicationDisabled()) return message.reply('Ce membre ne peut pas être unmute par le bot car il n\'est pas mute!')

        target.timeout(null);
        message.channel.send(`Le membre ${target} à été unmute`);

        const embed = new MessageEmbed()
        .setAuthor({name : `unmute : ${target.user.tag}` , iconURL: target.user.displayAvatarURL()})
        .setColor('#80260F')
        .setDescription(`🔨 Modérateur de l'unmute : ${message.author.tag}`)
        .setTimestamp()
        .setFooter({text: 'L\'utilisateur peut de nouveau parler!'})


    const logChannel = client.channels.cache.get(fetchGuild.logChannel);
    logChannel.send({embeds : [embed]});

    },
    options: [
        {
            name: 'target',
            description: "L'utilisateur à muter",
            type: 'USER',
            required: true      
        }
    ],
    async runInteraction (client, interaction) {
        const fetchGuild = await client.getGuild(member.guild);
        const target = interaction.options.getMember('target');

        if(!target.isCommunicationDisabled()) return interaction.reply('Ce membre ne peut pas être unmute par le bot car il n\'est pas mute!')

        target.timeout(null);
        interaction.reply(`Le membre ${target} à été unmute`);

        const embed = new MessageEmbed()
        .setAuthor({name : `unmute : ${target.user.tag}` , iconURL: target.user.displayAvatarURL()})
        .setColor('#80260F')
        .setDescription(`🔨 Modérateur de l'unmute : ${interaction.user.tag}`)
        .setTimestamp()
        .setFooter({text: 'L\'utilisateur peut de nouveau parler!'})


        const logChannel = client.channels.cache.get(fetchGuild.logChannel);
        logChannel.send({embeds : [embed]});
    },
};