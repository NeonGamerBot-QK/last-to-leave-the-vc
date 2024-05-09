const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder().setName('ping').setDescription(`get ping for this bot`).setDMPermission(true),
    async execute(interaction) {
        const { client } = interaction
        const message = await interaction.deferReply({
            fetchReply: true
        });
const lastVc = interaction.client.last_vc || "(not taken yet)"
        const newMessage = `> API Latency: \`${client.ws.ping}ms\`\n> Client Ping: \`${message.createdTimestamp - interaction.createdTimestamp}ms\`\n> Last Recorded VC ping: \`${lastVc}ms\``
        await interaction.editReply({
           embeds: [{
            description: newMessage,
            color: 0x00ff00,
            title: "Pong"
           }]
        });
    }
}