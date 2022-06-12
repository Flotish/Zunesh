const { MessageActionRow, MessageSelectMenu } = require('discord.js');

const selectMenu = new MessageActionRow()
    .addComponents(
        new MessageSelectMenu()
            .setCustomId('roles-menu')
            .setPlaceholder('Choissisez un role dans la liste')
            .setMinValues(1)
            .setMaxValues(1)
            .addOptions([
                {
                    label: 'Vert',
                    description: 'Choisir la couleur Verte',
                    value: '979039971526717530'
                },
                {
                    label: 'Rouge',
                    description: 'Choisir la couleur Rouge',
                    value: '979040049289134130'
                },
                {
                    label: 'Violet',
                    description: 'Choisir la couleur Violet',
                    value: '979040174237433958'
                }
            ])
    )

module.exports = {
    name : 'roles',
    category: 'utils',
    permissions: ['SEND_MESSAGES'],
    ownerOnly: false,
    usage: 'roles',
    examples: ['roles'],
    description : 'roles',
    async run(client, message, args){
        await message.channel.send({content: 'choisir un ou plusieurs rôle(s), parmis la liste disponible', components: [selectMenu] });
    },
    async runInteraction(client, interaction) {
        await interaction.reply({content: 'choisir un ou plusieurs rôle(s), parmis la liste disponible', components: [selectMenu] });
    }
};