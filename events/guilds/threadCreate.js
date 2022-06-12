module.exports = {
    name : 'threadCreate',
    once : false,
    async execute(client, thread){
        if(thread.isText()) thread.join();
        const logChannel = client.channels.cache.get('949253797119684608');
        logChannel.send(`Nom du thread: ${thread.name} !`);
    }
};
