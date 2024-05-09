const { getVoiceConnection, VoiceConnectionStatus } = require('@discordjs/voice');
const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder().setName('leave').setDescription('leave VC').setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),
	// high perms since this isnt a music bot
	cooldown: 1,
	async execute(interaction) {
		// const channel = interaction.options.getChannel('channel') || interaction.member.voice.channel
		// if(!channel) return interaction.reply({ embeds: [interaction.client.util.errorEmbed("No channel provided.")], ephemeral: true })
		const connection = getVoiceConnection(interaction.guild.id);
		if (!connection) return interaction.reply({ embeds: [interaction.client.util.errorEmbed('Im Already in a vc.')], ephemeral: true });
		// const stamp = Date.now()
		await interaction.deferReply();
		connection.on(VoiceConnectionStatus.Disconnected, () => {
			interaction.editReply('Left vc.');
			// interaction.client.last_vc = Date.now() - stamp
			// interaction.editRepl
		});
		connection.disconnect();
		connection.destroy();
	},
};