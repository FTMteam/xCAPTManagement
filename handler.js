// PROCESS COMMANDS
const { Client, IntentsBitField, SlashCommandBuilder, EmbedBuilder, InteractionWebhook, AttachmentBuilder, InteractionType } = require('discord.js');


var client;








async function commando(c, cmd, interaction, param) {
  client = c;
  if (interaction.type === InteractionType.ApplicationCommand)
  try {
    var mod = require(`./commands/${cmd}/handler.js`)
      mod(c,cmd,interaction)
    
    
   
   
  } catch (erro) {
    await interaction.reply("An error has occured try to rerun the command.")
    console.log('Error', erro)
  }

}

module.exports = commando
//module.exports = require('./commands/logtryout.js');