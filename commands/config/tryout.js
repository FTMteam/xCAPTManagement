const { Client, IntentsBitField , SlashCommandBuilder,EmbedBuilder, InteractionWebhook, PermissionsBitField, ButtonBuilder, ButtonStyle, ActionRowBuilder, ComponentType, MessageCollector } = require('discord.js');

async function index(c, cmd, interaction) {
    const ConfigTryoutChannel = new ButtonBuilder()
        .setLabel('Tryout Channel')
        .setStyle(ButtonStyle.Primary)
        .setCustomId('tryout-channel')

    const ConfigTryoutRole = new ButtonBuilder()
        .setLabel('Tryout Hoster Role')
        .setStyle(ButtonStyle.Danger)
        .setCustomId('tryout-role')

    const buttonRow = new ActionRowBuilder().addComponents(ConfigTryoutChannel, ConfigTryoutRole);
    const reply = await interaction.reply({ content: 'Select which configuration you would like to change', components: [buttonRow] });
    
    const filter = (i) => i.user.id === interaction.user.id;
    const collector = reply.createMessageComponentCollector({
        componentType: ComponentType.Button,
        filter,
        time: 10_000,
    });

    collector.on('collect', async (interaction) => {
        if (interaction.customId === 'tryout-channel') {
            ConfigTryoutChannel.setDisabled(true);
            ConfigTryoutRole.setDisabled(true);
            reply.edit({
                components: [buttonRow]
            });
            await interaction.reply('Tryout Channel Config Initiated : Please type the channel you would like to be the new Tryout Results lot channel. If you would like it to be resetted back to nil, please type "None".');

            // Set up a message collector to listen to messages from the same user
            const messageFilter = (msg) => msg.author.id === interaction.user.id;
            const messageCollector = interaction.channel.createMessageCollector({ filter: messageFilter,time: 10000});

            messageCollector.on('collect', async (message) => {
                if (message.mentions.channels.first()) {
                    var tryoutfunc = require('../../functions/settryoutchannel.js')
                    await tryoutfunc(interaction,message.mentions.channels.first().id);
                    messageCollector.stop()
                }else if(message.content === 'None'){
                    var tryoutfunc = require('../../functions/settryoutchannel.js')
                    await tryoutfunc(interaction,'None')
                }else {
                    await interaction.followUp(`The message you mentioned is not a channel, please type a channel.`);
                }
                
            });

            messageCollector.on('end', (collected) => {
                if (collected.size === 0) {
                    interaction.followUp('No messages were received within the time limit. Please retype the command if you would like to restart.');
                } 
            });
        }

        if (interaction.customId === 'tryout-role') {
            ConfigTryoutChannel.setDisabled(true);
            ConfigTryoutRole.setDisabled(true);
            reply.edit({
                components: [buttonRow]
            });
           
            await interaction.reply('Tryout Role Config Initiated : Please mention the role you would like to be set as the tryout hoster role. If you would like it to be resetted back to nil, please type "None".');

            // Set up a message collector to listen to messages from the same user
            const messageFilter = (msg) => msg.author.id === interaction.user.id;
            const messageCollector = interaction.channel.createMessageCollector({ filter: messageFilter,time: 10000});

            messageCollector.on('collect', async (message) => {
                if (message.mentions.roles.first()) {
                    var rolefunc = require('../../functions/settryoutrole.js')
                    await rolefunc(interaction,message.mentions.roles.first().id);
                    messageCollector.stop()
                }else if(message.content === 'None'){
                    var rolefunc = require('../../functions/settryoutrole.js')
                    await rolefunc(interaction,'None')
                }else {
                    await interaction.followUp(`The message you mentioned is not a role mention, please mention a role.`);
                }
                
            });

            messageCollector.on('end', (collected) => {
                if (collected.size === 0) {
                    interaction.followUp('No messages were received within the time limit. Please retype the command if you would like to restart.');
                } 
            });
        }
    });

    collector.on('end', () => {
        ConfigTryoutChannel.setDisabled(true);
        ConfigTryoutRole.setDisabled(true);
        reply.edit({
            components: [buttonRow]
        });
    });
}


module.exports = index