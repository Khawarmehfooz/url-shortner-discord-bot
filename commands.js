require('dotenv').config()
const { REST, Routes, ApplicationCommandOptionType } = require('discord.js')
const DISCORD_LOGIN_TOKEN = process.env.DISCORD_LOGIN_TOKEN
const CLIENT_ID = process.env.CLIENT_ID
const commands = [
    {
        name: 'short',
        description: 'Shorts the provided URLs',
        options: [
            {
                name: "original-url",
                description: "The URL Where short URL is redirected",
                type: ApplicationCommandOptionType.String,
                required: true
            }
        ]
    }
]

const rest = new REST({
    version: '10'
}).setToken(DISCORD_LOGIN_TOKEN);
(
    async () => {
        try {
            console.log("Started refreshing application (/) commands.")
            await rest.put(Routes.applicationCommands(CLIENT_ID), {
                body: commands
            })
            console.log('"Successfully reloaded application (/) commands')
        } catch (err) {
            console.log(err)
        }
    }
)();