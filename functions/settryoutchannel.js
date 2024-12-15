const { Client, IntentsBitField , SlashCommandBuilder,EmbedBuilder, InteractionWebhook} = require('discord.js');
const TryoutResult = require('../models/TryoutChannel.js');
async function index(interaction,message) {
    const query = {
        guildID : interaction.guild.id,
      };
      try {
        const channel = await TryoutResult.findOne(query);

        if (channel) {
          if (message != 'None') {
            channel.channelID = message
            
            interaction.followUp(`Your Tryout Result log channel has been now overwritten to <#${message}>`)
            await channel.save().catch((e) => {
              console.log('Error updating Tryout Result log.')
            })
          }else {
            try {
              const deleted = await TryoutResult.deleteOne(query)
              if (deleted.deletedCount === 1) {
                console.log('SUCESS')
              }else {
                console.log('Not docu matched?')
              }
              interaction.followUp('Your Tryout Result log channel has been set to None, make sure to set a tryout channel inorder for logging tryout to work.')
            } catch (error) {
             
                console.log('Error deleting Tryout Result log database.')
              
            }
            
              
               
              

            
          }
          
        }else {
          if (message != 'None') {
            const newChannel = new TryoutResult({
              guildID : interaction.guild.id,
              channelID : message,
            });
            await newChannel.save();
            console.log('Saved to db')
            interaction.followUp(`Tryout logs channel are now set to <#${message}>`)
          }else {
            interaction.followUp(`No previous channel saved, cannot be resetted. Please type a channel to edit the config.`)
          }
        
        }
      } catch (error) {
        console.log('error:',error)
      } 
}

module.exports = index
       