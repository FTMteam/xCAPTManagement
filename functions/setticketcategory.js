const { Client, IntentsBitField , SlashCommandBuilder,EmbedBuilder, InteractionWebhook} = require('discord.js');
const TryoutResult = require('../models/TicketCategory.js');
const cmds = {}
async function check(){}
cmds.category = async function(interaction,message) {
    const query = {
        guildID : interaction.guild.id,
      };
      try {
        const channel = await TryoutResult.findOne(query);

        if (channel) {
          if (message != 'None') {
            channel.categoryID = message
            
            interaction.followUp(`Your Ticket Category has been now overwritten to <#${message}>`)
            await channel.save().catch((e) => {
              console.log('Error updating Ticket Category.')
            })
          }else {
            try {
              channel.categoryID = 'None'
              if (channel.channelID == 'None' || channel.channelID === undefined) {
                const result = await TryoutResult.deleteOne(query)
                if ( result.deletedCount  !== 1 ) {
                  interaction.followUp('An unexpected error has occured ( mongo db error ) ')
                }
              }else {await channel.save().catch((e) => {
                console.log('Error updating Ticket Category.')
              })}
              
              interaction.followUp('Your Ticket Category has been set to None.')
            } catch (error) {
             
                console.log('Error deleting Ticket Category database.')
              
            }
          }
          
        }else {
          if (message != 'None') {
            const newChannel = new TryoutResult({
              guildID : interaction.guild.id,
              currentTicketID: '0',
              categoryID : message,
            });
            await newChannel.save();
            console.log('Saved to db')
            interaction.followUp(`Ticket Category are now set to <#${message}>`)
          }else {
            interaction.followUp(`No previous category saved, cannot be resetted. Please type a category to edit the config.`)
          }
        
        }
      } catch (error) {
        console.log('error:',error)
      } 
}
cmds.channel = async function(interaction,message) {
  const query = {
      guildID : interaction.guild.id,
    };
    try {
      const channel = await TryoutResult.findOne(query);

      if (channel) {
        if (message != 'None') {
          channel.channelID = message
          
          interaction.followUp(`Your Ticket Channel has been now overwritten to <#${message}>`)
          await channel.save().catch((e) => {
            console.log('Error updating Ticket Channel.')
          })
        }else {
          try {
            channel.channelID = 'None'
            if (channel.categoryID == 'None' || channel.categoryID === undefined) {
              const result = await TryoutResult.deleteOne(query)
                if ( result.deletedCount  !== 1 ) {
                  interaction.followUp('An unexpected error has occured ( mongo db error ) ')
                }
              console.log('deleted')
            }else {await channel.save().catch((e) => {
              console.log('Error updating Ticket Channel.')
            })}
            
            interaction.followUp('Your Ticket Channel has been set to None.')
          } catch (error) {
           
              console.log('Error deleting Ticket Channel database.')
            
          }
        }
        
      }else {
        if (message != 'None') {
          const newChannel = new TryoutResult({
            guildID : interaction.guild.id,
            currentTicketID: '0',
            channelID : message,
          });
          await newChannel.save();
          console.log('Saved to db')
          interaction.followUp(`Ticket channels are now set to <#${message}>`)
        }else {
          interaction.followUp(`No previous channel saved, cannot be resetted. Please type a channel to edit the config.`)
        }
      
      }
    } catch (error) {
      console.log('error:',error)
    } 
}

module.exports = cmds
       