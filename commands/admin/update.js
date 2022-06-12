const { Guild } = require('../../models/index')

module.exports = {
    name : 'update',
    category: 'admin',
    permissions: ['ADMINISTRATOR'],
    ownerOnly: true,
    usage: 'update',
    examples: ['update'],
    description : 'Mettre à jours les nouvelles données !',
    async run(client, message, args) { 
        await Guild.updateMany({}, {"$set" : {"testChannel": "948632873999675413"}, upsert: true});
        message.reply('Nouvelle données ajoutées !')
    },
    async runInteraction (client, interaction) { 
        await Guild.updateMany({}, {"$set" : {"testChannel": "948632873999675413"}, upsert: true});
        interaction.reply('Nouvelle données ajoutées !')
    },
};