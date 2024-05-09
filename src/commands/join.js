const { joinVoiceChannel, getVoiceConnection, VoiceConnectionStatus } = require('@discordjs/voice');
const { SlashCommandBuilder, ChannelType, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder().setName('join').setDescription('Join VC').addChannelOption(c => c.setName('channel').setDescription('The channel to join').addChannelTypes(ChannelType.GuildVoice, ChannelType.GuildStageVoice)).setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),
	// high perms since this isnt a music bot
	cooldown: 1,
	async execute(interaction) {
		const channel = interaction.options.getChannel('channel') || interaction.member.voice.channel;
		if (!channel) return interaction.reply({ embeds: [interaction.client.util.errorEmbed('No channel provided.')], ephemeral: true });
		if (getVoiceConnection(interaction.guild.id)) return interaction.reply({ embeds: [interaction.client.util.errorEmbed('Im Already in a vc.')], ephemeral: true });
		const stamp = Date.now();
		interaction.deferReply();
		const connection = joinVoiceChannel({
			channelId: channel.id,
			guildId: channel.guild.id,
			adapterCreator: channel.guild.voiceAdapterCreator,
		});
		connection.on(VoiceConnectionStatus .Ready, () => {
			interaction.editReply(`Joined vc <#${channel.id}>`);
			interaction.client.last_vc = Date.now() - stamp;
		});
	},
};