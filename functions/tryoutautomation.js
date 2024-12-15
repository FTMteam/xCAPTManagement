const { Client, IntentsBitField, SlashCommandBuilder, EmbedBuilder, InteractionWebhook, PermissionsBitField, ButtonBuilder, ButtonStyle, ActionRowBuilder, ComponentType, MessageCollector,AttachmentBuilder } = require('discord.js');

async function index(client) {
    client.on('channelCreate', async (channel) => {
        if (!channel.guild) return;
        console.log('New ticket')
        // Check if the channel's name contains the word 'ticket'
        if (channel.name.toLowerCase().includes('ticket')&& channel.parent == client.channels.cache.get('1261724259340779520')) {
            // Send a message to the newly created channel
            setTimeout(async () => {
                await channel.send('Welcome to xCAPT Tryouts, this is an automated message sent to run through your tryout process!.');
                await channel.send(`One quick question, do you meet the following requirement? :  

**Requirements for an instant accept:

3k wins 👑 Any rank
1.5k wins 👑 Gold <:gold:1261737602818773013>
600 wins 👑 Plat <:PlatniumRank:1261737657516691478>
250 wins 👑 Diamond <:Diamond:1261737691377045565>
0 wins 👑 Emerald <:EMERALD:1261737728777785427>
0 wins 👑 Nightmare <:NightMare:1261737759996117012>**`);
const ConfigTryoutChannel = new ButtonBuilder()
.setLabel('I meet the requirements')
.setStyle(ButtonStyle.Primary)
.setCustomId('met-req');

const ConfigTryoutRole = new ButtonBuilder()
.setLabel("I don't meet the requirements")
.setStyle(ButtonStyle.Danger)
.setCustomId('dont-meet-req');

 buttonRow = new ActionRowBuilder().addComponents(ConfigTryoutChannel, ConfigTryoutRole);

const reply = await channel.send({ content: 'Select which option applies to you.', components: [buttonRow] });
            

          

            const collector =  reply.createMessageComponentCollector({
                componentType: ComponentType.Button,
                time: 600_000,
            });
        
       
            collector.on('collect', async (interaction) => {
                if (interaction.customId === 'met-req') {
                    // Disable the buttons after interaction
                    ConfigTryoutChannel.setDisabled(true);
                    ConfigTryoutRole.setDisabled(true);
                    console.log(interaction)
                    await interaction.update({
                        components: [buttonRow],
                    });

                    // Send message to ask for image upload
                    const att = new AttachmentBuilder('./tryout.png')
                    const askForImage = await channel.send({content : 'Please upload an image of your game stats as proof. It must include your rank, your wins and your username with it saying xCAPT. As shown below',files: [att] });

                    // Create a message collector to listen for the image
                    const imageCollector = new MessageCollector(channel, {
                        filter: (msg) => msg.author.id === interaction.user.id,
                        
                    });

                    imageCollector.on('collect', async (msg) => {
                        if (msg.attachments.size > 0) {
                            const attachment = msg.attachments.first();
                            if (attachment.contentType.startsWith('image/')) {
                                await channel.send('Image received, thank you! Now a tryout hoster will invite you to the IGC! <@&1261710013173600366>');
                                imageCollector.stop();
                            } else {
                                await channel.send('Please upload a valid image file.');
                            }
                        } else {
                            await channel.send('No image was attached. Please try again.');
                        }
                    });

                    
                    
                }
                if (interaction.customId === 'dont-meet-req') {
                    // Disable the buttons after interaction
                    ConfigTryoutChannel.setDisabled(true);
                    ConfigTryoutRole.setDisabled(true);

                    await interaction.update({
                        components: [buttonRow],
                    });
                    await channel.send('Alright you would need to do a tryout then. Please be patient and wait for one of our tryout hosters to respond! <@&1261710013173600366>')
                }
            }, 2500);
            });
        }
    });
}

module.exports = index;
