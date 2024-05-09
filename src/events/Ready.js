const { Events } = require("discord.js");

module.exports = {
    name: Events.ClientReady,
    async execute(client) {
console.log(`Ready on ${client.user.tag}`)
if(process.env.GUILD_ID) {
    const guild =  client.guilds.cache.get(process.env.GUILD_ID)
    if(guild) {
    guild.members.fetch()
    console.log(`Loaded Guild (${process.env.GUILD_ID}) members`)
    } else {
        console.log(` Guild (${process.env.GUILD_ID}) dosent exit.`)
    }
} else {
    console.warn(`Running without an assigned guild id`)
}
    }
}