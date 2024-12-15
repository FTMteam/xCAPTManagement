const { Client, IntentsBitField , SlashCommandBuilder,EmbedBuilder, InteractionWebhook, PermissionsBitField, ButtonBuilder, ButtonStyle, ActionRowBuilder, ComponentType, ChannelType } = require('discord.js');
const ticket_model = require('../models/TicketCategory.js')
const data = []
async function index(interaction,id) {
    const query = {
        guildID : interaction.guild.id,
        customID : id
    }
    const category = await ticket_model.findOne(query)
    if (category && category.categoryID != undefined && category.categoryID != 'None') {
        //console.log(data.find(function() {return interaction.user.id}),data)
        if (data.find(function() {return interaction.user.id} ) == undefined) {
            ticket = await interaction.guild.channels.create({
                name: `tryout-${Number(category.currentTicketID ) + 1}`,
                type : ChannelType.GuildText,
                parent: category.categoryID,
            })
            category.currentTicketID += 1
            category.save().catch((e) => {
                console.log('Error updating Ticket Automation ID.')
              })
            data.push(interaction.user.id);
            interaction.reply({content: `Your ticket is in <#${ticket.id}>`,ephemeral:true})
        }else {
            interaction.reply({content: 'You can only create one ticket at a time.',ephemeral:true})
        }
       
        
       
    }else {
        interaction.reply('Category for ticket is not set.')
    }
}
module.exports = index