module.exports = {
    name : 'threadCreate',
    once : false,
    async execute(client, thread){
        const fetchGuild = await client.getGuild(member.guild);
        if(thread.isText()) thread.join();
        const logChannel = client.channels.cache.get(fetchGuild.logChannel);
        logChannel.send(`Nom du thread: ${thread.name} !`);
    }
};
