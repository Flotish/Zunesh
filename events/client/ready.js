const Logger = require('../../utils/Logger');

module.exports = {
    name : 'ready',
    once : true,
    async execute(client){
        let guildsCount = await client.guilds.fetch();
        let usersCount = client.guilds.cache.reduce((a, g) => a + g.memberCount, 0);

        Logger.client(`- Prêt à être utilisé par ${usersCount} utilisateurs, sur ${guildsCount.size} serveurs discord !`);

        client.user.setPresence({activities: [{ name: 'Flotish', type: 'LISTENING' }], status: 'dnd'})

        const devGuild = await client.guilds.cache.get('808421203572031558');
        devGuild.commands.set(client.commands.map(cmd => cmd));
        // Slash commands sur serveur = instantané
        // Slach commands en globa l= 1h
        client.application.commands.set(client.commands.map(cmd => cmd));
    },
}