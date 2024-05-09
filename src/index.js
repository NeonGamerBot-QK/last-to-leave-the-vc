require('dotenv').config()

const discord = require('discord.js')
const express = require('express')
const app = express()
const http = require('http')
const { QuickDB } = require('quick.db')
const client = new discord.Client({
    intents: [discord.IntentsBitField.Flags.Guilds, discord.IntentsBitField.Flags.GuildVoiceStates, discord.IntentsBitField.Members],
    partials: [discord.Partials.GuildMember, discord.Partials.Channel]
})
client.server = require('./Modules/Server')(app)
client.commands = new Collection();
client.db = new QuickDB({ filePath: 'data/data.db'})
require('./modules/Commands')(client)
require('./modules/Events')(client)

client.login();