module.exports = {
    name : 'roles-menu',
    async runInteraction(client, interaction) {
        await interaction.member.roles.add(interaction.values[0]);
        await interaction.reply({ content : "Félicitation, le bot vous a rajouté votre rôle !", ephemeral: true });
    }
};