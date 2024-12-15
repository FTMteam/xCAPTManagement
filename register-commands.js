require('dotenv').config();
const {REST, Routes, Options, ApplicationCommand, ApplicationCommandType, ApplicationCommandOptionBase, ApplicationCommandOptionType} = require('discord.js')
const commands = [
    {
        name:'help',
        description:"Provides information about the bot's commands",
    },
    
    {
        name:'tryout',
        description:'Tryout commands',
        options : [{
            type:ApplicationCommandOptionType.Subcommand,
            name:'log',
            description:'Logs the tryout for xCAPT',
            options : [
                {
                    name:'clients-discord',
                    description:'Discord User of the client.',
                    type:ApplicationCommandOptionType.User,
                    required:true,
    
                },
                {
                    name:'roblox-username',
                    description:'Roblox Username of the client.',
                    type:ApplicationCommandOptionType.String,
                    required:true,
                },
                {
                    name:'wins',
                    description:'Number of wins of the client.',
                    type:ApplicationCommandOptionType.String,
                    required:true,
                },
                
                {
                    name:'rank',
                    description:'The rank of the client.',
                    type:ApplicationCommandOptionType.String,
                    required:true,
                    choices:[
                        {
                            name:'N/A',
                            value:'N/A',
                        },
                        
                        {
                            name:'Gold',
                            value:'Gold',
                        },
                        {
                            name:'Platinum',
                            value:'Platinum',
                        },
                        {
                            name:'Diamond',
                            value:'Diamond',
                        },
                        {
                            name:'Emerald',
                            value:'Emerald',
                        },
                        {
                            name:'Nightmare',
                            value:'Nightmare',
                        },
                    ]
                },
                {
                    name:'lategame',
                    description:'Late Game PVP score of the client.',
                    type:ApplicationCommandOptionType.Number,
                },
                {
                    name:'raw',
                    description:'Raw PVP score of the client.',
                    type:ApplicationCommandOptionType.Number,
                },
                {
                    name:'aim',
                    description:'Aiming score of the client.',
                    type:ApplicationCommandOptionType.Number,
                },
                {
                    name:'chasing',
                    description:'Chasing score of the client.',
                    type:ApplicationCommandOptionType.Number,
                },
                {
                    name:'running',
                    description:'Running score of the client.',
                    type:ApplicationCommandOptionType.Number,
                },
                {
                    name:'bed-break',
                    description:'Bed Break score of the client.',
                    type:ApplicationCommandOptionType.Number,
                },
                {
                    name:'gamesense',
                    description:'Gamesense score of the client.',
                    type:ApplicationCommandOptionType.Number,
                },
            ]
        
        },
        {
            type:ApplicationCommandOptionType.Subcommand,
            name:'find',
            description:'Find the corresponding tryout',
            options : [
                {
                    name:'discord_user',
                    description:'Discord User of the person',
                    type:ApplicationCommandOptionType.User,
                },
                {
                    name:'roblox_username',
                    description:'Roblox Username of the person',
                    type:ApplicationCommandOptionType.String,
                },
            ]
        },
        ]
    },
    
    
    {
        name:'config',
        description:'Configs the tryout system',
        options : [
        
            {
                type:ApplicationCommandOptionType.Subcommand,
                name: "tryout",
                description: "Configs the tryout system",
              },
            {
                type:ApplicationCommandOptionType.Subcommand,
                name:'ticket',
                description:'Configs the ticket system.'
            },
        ]
    },
    {
        name:'robloxinfo',
        description:"Provides information about the roblox player.",
        options : [
            {
                name:'roblox-username',
                description:'Roblox Username of the client.',
                type:ApplicationCommandOptionType.String,
                required:true,
            },
            {
                name:'lategame',
                description:'Late Game PVP score of the client.',
                type:ApplicationCommandOptionType.Number,
            },
        ]
    },
    {
        name:'ticket',
        description:'testing phase 1',
        options : [
            {
                type:ApplicationCommandOptionType.Subcommand,
                name:'delete',
                description:'Deletes the corresponding ticket.',
                options : [
                    {
                        name:'reason',
                        description:'Reason of deleteing ticket',
                        type:ApplicationCommandOptionType.String,
                    },
                ]
            },
            
        ]
    },
    {
        name:'spam',
        description:"Spam a message",
        options : [
            {
                name:'message',
                description:'Message you would like to be sent!',
                type:ApplicationCommandOptionType.String,
                required:true,
            },
            {
                name:'count',
                description:'Amount of messages you would like to be sent!',
                type:ApplicationCommandOptionType.Integer,
                required:true,
            },
            {
                name:'tts',
                description:'Speak out the message?',
                type:ApplicationCommandOptionType.Boolean,
                
            },
        ]
    },
    
]

const rest = new REST({version:'10'}).setToken(process.env.TOKEN);

async function run() {
    try {
        console.log("Regiestering slash commands...");

        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID,process.env.GUILD_ID),
            {body:commands}
        )
        console.log("registered slash commands")
    } catch (error){
        console.log(`There was an error ${error}`)
    };
    {}
}

run()
module.exports = run

