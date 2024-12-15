const { Client, IntentsBitField , SlashCommandBuilder,EmbedBuilder, InteractionWebhook} = require('discord.js');
const TryoutResult = require('../models/TryoutRole.js');
async function index(interaction,roleid) {
    const query = {
        guildID : interaction.guild.id,
      };
      try {
        const channel = await TryoutResult.findOne(query);

        if (channel) {
          if (roleid != 'None') {
            channel.roleID = roleid
            
            interaction.followUp(`Your Tryout Result log channel has been now overwritten to <@&${roleid}>`)
            await channel.save().catch((e) => {
              console.log('Error updating Tryout Result log.')
            })
          }else {
            try {
              TryoutResult.deleteOne(query)
              interaction.followUp('Your Tryout Result log channel has been set to None, make sure to set a tryout channel inorder for logging tryout to work.')
            } catch (error) {
             
                console.log('Error deleting Tryout Result log database.')
              
            }
            
              
               
              

            
          }
          
        }else {
          if (roleid != 'None') {
            const newChannel = new TryoutResult({
              guildID : interaction.guild.id,
              roleID : roleid,
            });
            await newChannel.save();
            console.log('Saved to db')
            interaction.followUp(`Tryout role is now set to <@&${roleid}>`)
          }else {
            interaction.followUp(`There is not an existing tryout hoster role, meaning it cannnot be resetted.`)
          }
        
        }
      } catch (error) {
        console.log('error:',error)
      } 
}

module.exports = index
       