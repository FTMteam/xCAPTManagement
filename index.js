
//IMPORTING AND SETUP
const { Client, IntentsBitField , SlashCommandBuilder,EmbedBuilder, InteractionWebhook, Guild} = require('discord.js');
const mongoose = require('mongoose');
const commands = require('./handler');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.GuildMessageReactions,
        IntentsBitField.Flags.GuildModeration,
    ],
});
require('dotenv').config();
client.login(process.env.TOKEN);




// COMMANDS SECTION




//FUNCTIONS 

 
 client.on('ready', () => {
    require('./functions/tryoutautomation.js')(client)
    //require('./test.js')()
 });

(async()=> {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to DB.')
        console.log(Guild.Id)
    } catch (error) {
        console.log('error' , error)
    }

})();


client.on("interactionCreate" , (interaction) => {
    commands(client,interaction.commandName,interaction)

});

client.on('messageCreate',(message) => {
    
})