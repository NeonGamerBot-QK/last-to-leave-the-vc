require('dotenv').config()

const discord = require('discord.js')
const express = require('express')
const app = express()
const http = require('http')
const { QuickDB } = require('quick.db')
const client = new discord.Client({
    intents: [discord.IntentsBitField.Flags.Guilds, discord.IntentsBitField.Flags.GuildVoiceStates, discord.IntentsBitField.Flags.GuildMembers],
    partials: [discord.Partials.GuildMember, discord.Partials.Channel]
})
client.commands = new discord.Collection ();
client.cooldowns = new discord.Collection ();
client.db = new QuickDB({ filePath: 'data/data.db'})
client.server = require('./modules/Server')(app)
client.util = require('./modules/Util')

require('./modules/Commands')(client)
require('./modules/Events')(client)

client.login();