const { Client, IntentsBitField , SlashCommandBuilder,EmbedBuilder, InteractionWebhook, PermissionsBitField} = require('discord.js');
async function index(c,cmd,interaction) {
    var message = interaction.options.get('message').value
    var times = interaction.options.get('count').value
    console.log('hi');
    if (interaction.member.permissions.has(PermissionsBitField.Flags.Administrator) || interaction.channel.id === '1290761027260252190') {
       const reply =  await interaction.reply('Spam Incoming, to stop please type .stop');
       var loop = true
        const messageCollector = interaction.channel.createMessageCollector();
        var msg_GLOBAL
        messageCollector.on('collect', async function(msg){
            
            if (msg.content === `.stop`) {
                msg_GLOBAL = msg
                console.log('Called')
                loop = false
                
            }
        })
        for (let i = 0; i < times; i++) {
            if (loop == true) {await interaction.followUp(message);} else { 
                interaction.followUp(`The spam has been stopped by <@${msg_GLOBAL.author.id}>`,{
                    tts: true
                   })
                break}
            
         }
    }else {
        interaction.reply("You don't have permission to use this command!")
    }
    
}

module.exports = index