const { Client, IntentsBitField, SlashCommandBuilder, EmbedBuilder, InteractionWebhook } = require('discord.js');
const mod = require('../../models/TryoutLogs.js')
async function index(c,cmd,interaction) {
    var dc_user = interaction.options.get('discord_user')
    var rblx_user = interaction.options.get('roblox_username')
    var query = {
        guildID : '0',
        userID : '0'
    }
    if (dc_user &&  rblx_user) {
        
        query = {
            guildID : interaction.guild.id,
            userID : dc_user.value,
            RobloxUsername : rblx_user.value
          };
        
    }else if (dc_user) {
        query = {
            guildID : interaction.guild.id,
            userID : dc_user.value,
            
          };
    }else if (rblx_user) {
        query = {
            guildID : interaction.guild.id,
            RobloxUsername : rblx_user.value,
            
          };
    }

    const tryout = await mod.findOne(query)
    if (tryout) {
        const emb = new EmbedBuilder()

        .setColor('Random')
        
        .setTitle(`Tryout Results for ${tryout.RobloxUsername}`)
        
        .setImage("https://images-ext-1.discordapp.net/external/UuFwfFPSK3v1YzgukDO18LWBakHEyf0MSaiNww_93JM/https/share.creavite.co/6693bb8c6bbfe796751481d2.gif?width=550&height=70")

        .addFields(
          tryout.content

        )
        .setFooter({
          text: `Tryout hosted during ${tryout.date}`,
          

        });
        interaction.reply({ embeds: [emb] })
        console.log((tryout.date),query)
    }else {
        interaction.reply('No data options inputed/ there is no record of this user.')
        console.log(query)
    }
}
module.exports = index
