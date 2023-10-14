require('dotenv').config()
const axios = require('axios');
const { Client, GatewayIntentBits } = require('discord.js')
const DISCORD_LOGIN_TOKEN = process.env.DISCORD_LOGIN_TOKEN
const SHORT_URL_GENERATOR_API_URL = process.env.SHORT_URL_GENERATOR_API_URL
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
})
client.on('messageCreate', async (message) => {
    if (message.author.bot) return
    message.reply({
        content: "Use /short command and provide me with URL to Short"
    })
})
client.on('interactionCreate', async (interaction) => {
    const { commandName, options } = interaction
    if (commandName === 'short') {
        if (options) {
            const urlToShorten = options.get('original-url').value
            console.log(urlToShorten)
            try {
                const res = await axios.post(SHORT_URL_GENERATOR_API_URL, { url: urlToShorten })
                const shortenedURL = res.data.id
                if (res.data.error) {
                    interaction.reply(res.data.error)
                }
                if (shortenedURL != undefined || shortenedURL != null) {
                    interaction.reply(`Shortned URL: http://localhost:8000/url/${shortenedURL}`)
                }
            } catch (err) {
                console.log(err)
                interaction.reply('An error occurred while shortening the URL.');
            }
        }
    }
})

client.login(DISCORD_LOGIN_TOKEN)