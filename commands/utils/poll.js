const { MessageEmbed } = require('discord.js');

module.exports = {
    name : 'poll',
    category: 'utils',
    permissions: ['SEND_MESSAGES'],
    ownerOnly: false,
    usage: 'poll [Question]',
    examples: ['poll êtes vous heureux ?', 'poll Flotish est-il le plus fort ?'],
    description : 'Poster votre propre sondage!',
    async run(client, message, args) {
        if (!args[0]) return message.reply("Merci d'entrer une question pour votre sondage !");

        const embed = new MessageEmbed()
        .setTitle('Sondage')
        .setColor('#00a3b5')
        .setDescription(args.slice(0).join(' '))
        .setTimestamp()
        .setFooter({ text: `Sondage par ${message.author.tag}!`});

        const poll = await message.reply({embeds: [embed] });
        poll.react('<:check:949298208104935444>');
        poll.react('<:cross:949298388694888448>');
        poll.react('<:Neutral:949298409112752159>');
    },

    options: [
        {
            name: 'title',
            description: 'Taper le titre de votre sondage',
            type: 'STRING',
            required: true,
        },
        {
            name: 'content',
            description: 'Taper le question de votre sondage',
            type: 'STRING',
            required: true,
        },
    ],
    async runInteraction(client, interaction) {
        const pollTitle = interaction.options.getString('title');
        const pollContent = interaction.options.getString('content');

        const embed = new MessageEmbed()
        .setTitle(pollTitle)
        .setColor('#00a3b5')
        .setDescription(pollContent)
        .setTimestamp()
        .setFooter({ text: `Sondage par ${interaction.user.tag}!`});
        

        const poll = await interaction.reply({embeds: [embed], fetchReply: true});
        poll.react('<:check:949298208104935444>');
        poll.react('<:cross:949298388694888448>');
        poll.react('<:Neutral:949298409112752159>');
    }
}