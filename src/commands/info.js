const { EmbedBuilder } = require("@discordjs/builders");
const { SlashCommandBuilder } = require("discord.js");
const { execFileSync } = require('child_process')
const fs = require('fs')
function git(...args) {
     return execFileSync ("git", args).toString();
}
function getRepo() {
    const res = git("remote", "get-url", "origin");
    console.log(res)
    return res.trim()
        .replace(/git@(.+):/, "https://$1/")
        .replace(/\.git$/, "");
}
const hash = fs.readFileSync(process.cwd()+'/.git/refs/heads/main').toString().split('\n')[0]

module.exports = {
    data: new SlashCommandBuilder().setName('info').setDescription(`Info about this bot.`).setDMPermission(true),
    async execute(interaction) {
        const repo = getRepo()
        const embed = new EmbedBuilder()
        embed.setTitle(`Info`)
        embed.setURL(repo)
        embed.setDescription(`
        [\`${hash.slice(0,6)}\`](${repo}/commit/${hash}) - Current Commit
        Made by <@566766267046821888>.
        `)
        embed.setColor([0, 255, 0])
        interaction.reply({ embeds: [embed]  })
    }
}