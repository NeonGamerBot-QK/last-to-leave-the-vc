const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder().setName('ping').setDescription(`get ping for this bot`).setDMPermission(true),
    async execute(interaction) {
        const { client } = interaction
        const message = await interaction.deferReply({
            fetchReply: true
        });

        const newMessage = `API Latency: ${client.ws.ping}\nClient Ping: ${message.createdTimestamp - interaction.createdTimestamp}`
        await interaction.editReply({
            content: newMessage
        });
    }
}