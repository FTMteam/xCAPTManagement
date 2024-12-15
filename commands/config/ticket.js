const { Client, IntentsBitField , SlashCommandBuilder,EmbedBuilder, InteractionWebhook, PermissionsBitField, ButtonBuilder, ButtonStyle, ActionRowBuilder, ComponentType, ChannelType } = require('discord.js');
const config = require('../../functions/setticketcategory.js');
const TicketModel = require('../../models/TicketCategory.js');
const { model } = require('mongoose');
async function index(c, cmd, interaction) {
    const ConfigTicketCatagory = new ButtonBuilder()
        .setLabel('Ticket Category')
        .setStyle(ButtonStyle.Primary)
        .setCustomId('ticket-category')

    const ConfigTicketChannel = new ButtonBuilder()
        .setLabel('Ticket Channel')
        .setStyle(ButtonStyle.Danger)
        .setCustomId('ticket-channel')
    
    const ConfigTicketSend = new ButtonBuilder()
        .setLabel('Send')
        .setStyle(ButtonStyle.Success)
        .setCustomId('send')

    const buttonRow = new ActionRowBuilder().addComponents(ConfigTicketCatagory, ConfigTicketChannel, ConfigTicketSend);
    
    const reply = await interaction.reply({ content: 'Select which configuration you would like to change', components: [buttonRow] });
    
    const filter = (i) => i.user.id === interaction.user.id;
    const collector = reply.createMessageComponentCollector({
        componentType: ComponentType.Button,
        filter,
        time: 10_000,
    });

    collector.on('collect', async (buttonInteraction) => {
        if (buttonInteraction.customId === 'ticket-category') {
            

            // Ask the user to input a category ID
            await buttonInteraction.reply({
                content: 'Please provide the category ID where tickets should be created.',
               
            });

            const messageFilter = (msg) => msg.author.id === interaction.user.id;
            const messageCollector = buttonInteraction.channel.createMessageCollector({
                filter: messageFilter,
                time: 15_000,
                max: 1
            });

            messageCollector.on('collect', async (message) => {
                const categoryId = message.content;
                const categoryChannel = buttonInteraction.guild.channels.cache.get(categoryId);

                // Check if the provided ID is a valid category
                if (categoryChannel && categoryChannel.type == ChannelType.GuildCategory || categoryId == 'None') {
                    await config.category(interaction,categoryId);
                    messageCollector.stop() 
                    
                }else {
                   

                    await message.reply({ 
                        content: 'Invalid category ID. Please make sure the ID corresponds to a valid category.', 
                       
                    });
                }

                
            });

            messageCollector.on('end', async (collected) => {
                if (collected.size === 0) {
                    await buttonInteraction.followUp({
                        content: 'You did not provide a category ID in time.',
                       
                    });
                }
            });
        }
        if (buttonInteraction.customId === 'ticket-channel') {
            

            // Ask the user to input a category ID
            await buttonInteraction.reply({
                content: 'Please provide the channel where users should be interact for the ticket to be created.',
               
            });

            const messageFilter = (msg) => msg.author.id === interaction.user.id;
            const messageCollector = interaction.channel.createMessageCollector({ filter: messageFilter,time: 10000});

            messageCollector.on('collect', async (message) => {
                if (message.mentions.channels.first() ) {
                   
                    await config.channel(interaction,message.mentions.channels.first().id);
                    messageCollector.stop()
                }else if (message.content == 'None') {
                    await config.channel(interaction,'None');
                    messageCollector.stop()
                }
                else {
                   interaction.followUp(`The message you mentioned is not a channel, please type a channel.`);
                }
                
            });

            messageCollector.on('end', (collected) => {
                if (collected.size === 0) {
                    interaction.followUp('No messages were received within the time limit. Please retype the command if you would like to restart.');
                } 
            });

                
            

          
        }
        if (buttonInteraction.customId === 'send') {
            
            
            embed = new EmbedBuilder()
                .setTitle('Tryouts')
                .setDescription('To create a ticket react with 🎫')
            
            customID = Math.random().toString(16).slice(2)

            const createTicketButton = new ButtonBuilder()
                .setLabel('🎫 Create Ticket')
                .setCustomId(customID)
                .setStyle(ButtonStyle.Secondary)
            const buttonRow = new ActionRowBuilder().addComponents(createTicketButton);
            const query = {
                guildID : buttonInteraction.guild.id,
              };
            var channel = 'None'
              try {
                channel = await TicketModel.findOne(query);
                var id = channel.channelID
               
                if (channel && id != undefined && id != 'None') {
                    console.log(id)
                    const ticket_host = await c.channels.cache.get(id).send({embeds:[embed], components : [buttonRow]})
                    channel.customID = customID
                    await channel.save().catch((e) => {
                        console.log('Error updating Ticket Category.')
                      })
                    const collector = ticket_host.createMessageComponentCollector({
                        componentType: ComponentType.Button,
                    });
                    collector.on('collect', async (create_ticket_interaciton)=> {
                        
                        if (create_ticket_interaciton.customId === customID) {
                            console.log('worked')
                            var module = require('../../functions/ticketautomation.js')
                            module(create_ticket_interaciton,customID)
                        }
                    }) 
                
                }else {
                  buttonInteraction.reply('The coresponding channel has not been set, please run /config ticket and select the Ticket Channel to set a channel.')
                  
                }
              }catch(error) {
               
                buttonInteraction.reply('An unexpected error has occured please try again later.')
                console.log(error)
                
              }
            
            
            
            
        }

    });
}

module.exports = index;
