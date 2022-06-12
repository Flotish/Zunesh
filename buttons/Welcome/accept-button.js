module.exports = {
    name : 'accept-button',
    async runInteraction(client, interaction) {
        await interaction.member.roles.add('978351609304191056');
        await interaction.reply({ content : "Vous avez accepté les règles ! vous pouvez maintenant accéder au serveur", ephemeral: true });
    }
};