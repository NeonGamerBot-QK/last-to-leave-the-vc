const { EmbedBuilder } = require('discord.js');

module.exports = {
	errorEmbed: (desc) => {
		const embed = new EmbedBuilder();
		embed.setTitle('Error');
		embed.setDescription(desc);
		embed.setColor('Red');
		embed.setTimestamp();
		return embed;
	},
};