module.exports = {
    name : 'refuse-button',
    async runInteraction(client, interaction) {
        try{
            await interaction.member.send(`Tu n'as pas accepté les règles, tu as donc été kick`);
        }catch(e){
            await interaction.reply(`Le membre ${interaction.member.displayname} n'a pas accepté les règles, je l'ai kick`);
        }


        await interaction.member.kick('Il n\'a pas accepté les règles !');
    }
};