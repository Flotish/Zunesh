const { Guild } = require('../../models/index')

module.exports = {
    name : 'reload',
    category: 'admin',
    permissions: ['MANAGE_MESSAGES'],
    ownerOnly: true,
    usage: 'reload',
    examples: ['reload'],
    description : 'Relancer le bot !',
    async run(client, message, args) {
       // const devGuild = await client.guilds.cache.get('949253797119684608')
        // devGuild.commands.set([]);
        await interaction.reply('Bot relancer avec succès');
        return proces.exit();
    },
    async runInteraction (client, interaction) {
       // const devGuild = await client.guilds.cache.get('949253797119684608')
        // devGuild.commands.set([]);
        await interaction.reply('Bot relancer avec succès');
        return process.exit();
    },
};