const { Client, IntentsBitField, SlashCommandBuilder, EmbedBuilder, InteractionWebhook } = require('discord.js');
const TryoutResult = require('../../models/TryoutChannel.js')

var TryoutRoles = require('../../models/TryoutRole.js')
var client;
const api = require('../../api.js')
const requirements = [
  [3000, 'No Rank'],
  [1500, 'Gold'],
  [600, 'Platinum'],
  [250, 'Diamond'],
  [0, 'Emerald'],
  [0, 'Nightmare']
]


function AddToClanEmbed(User, Username, URL) {
  console.log("Called")
  var fields = [
    { name: 'Discord ID', value: `${User}` },
    { name: 'Roblox Username', value: `${Username}` },
    { name: ' ', value: `<@${User}>` },
  ]
  const emb = new EmbedBuilder()
    .setTitle('New IGC Member')
    .setURL(`https://www.roblox.com/search/users?keyword=${Username}`)
    .addFields(fields)
    .setThumbnail(URL);
  client.channels.cache.get(`1287008179762368605`).send({ embeds: [emb] })

}
async function logtryout(c, cmd, interaction) {
  client = c;


 
    const query = {
      guildID: interaction.guild.id,
    };
    const channel = await TryoutResult.findOne(query);
    const id = await TryoutRoles.findOne(query);
    if (channel && id && interaction.member.roles.cache.has(id.roleID)) {
      var passwithreq = false
      var wins = interaction.options.get('wins').value
      var rank = interaction.options.get('rank').value
      var rblx_id = null
      var thumburl = null
      var fields
      var status
      api.getINFO(interaction.options.get('roblox-username').value).then(id => {
        try {
        rblx_id = id
        if (wins != 'N/A' && rank != 'N/A') {
          for (let block of requirements) {
            if (wins >= block[0] && rank === block[1]) {
              passwithreq = true
              console.log('Passed Requirements')
            }
          }
        } else {
          passwithreq = false
        }

      } catch (error) {
        console.log('CATCHED')
        if (error) {
          interaction.reply('An error has occured, please try again later.')
          console.log('error',error)
          return
        }
      }

        if (passwithreq) {
          status = 'Passed'


          fields = [
            { name: 'Discord ID', value: `${interaction.options.get('clients-discord').value}` },
            { name: 'Roblox Username', value: `${interaction.options.get('roblox-username').value}`, url: 'https://discord.js.org' },
            { name: 'Wins and Rank', value: `${interaction.options.get('wins').value} wins and ${interaction.options.get('rank').value}` },
            { name: '\u200B', value: '\u200B' },
            { name: 'Status', value: `Passed with requirements.`, inline: true },
            { name: '\u200B', value: '\u200B' },
            { name: " ", value: `**Welcome to xCAPT <@${interaction.options.get('clients-discord').value}> ! **` },

          ]
        } else {
          try{
          var total = interaction.options.get('lategame').value + interaction.options.get('raw').value + interaction.options.get('aim').value + interaction.options.get('chasing').value + interaction.options.get('running').value + interaction.options.get('bed-break').value + interaction.options.get('gamesense').value;


          var txt
          if (total >= 40) {
            status = "Passed"
            txt = "Welcome to xCAPT"


          } else {
            status = "Failed"
            txt = 'Unfortunately, you did not make it into IGC '
          }
          fields = [
            { name: 'Discord ID', value: `${interaction.options.get('clients-discord').value}` },
            { name: 'Roblox Username', value: `${interaction.options.get('roblox-username').value}` },
            { name: 'Wins and Rank', value: `${interaction.options.get('wins').value} wins and ${interaction.options.get('rank').value}` },
            { name: '\u200B', value: '\u200B' },
            { name: 'Lategame PVP', value: `${interaction.options.get('lategame').value}/10`, inline: true },
            { name: 'Raw PVP', value: `${interaction.options.get('raw').value}/10`, inline: true },
            { name: 'Aim', value: `${interaction.options.get('aim').value}/10`, inline: true },
            { name: 'Chasing', value: `${interaction.options.get('chasing').value}/10`, inline: true },
            { name: 'Running ', value: `${interaction.options.get('running').value}/10`, inline: true },
            { name: 'Bed Breaking', value: `${interaction.options.get('bed-break').value}/10`, inline: true },
            { name: 'Gamesense', value: `${interaction.options.get('gamesense').value}/10`, inline: true },
            { name: '\u200B', value: '\u200B' },
            { name: 'Total Score', value: `${total}/70`, inline: true },
            { name: 'Average/Mean Score', value: `${Math.round((total / 7) * 100) / 100}/10`, inline: true },
            { name: 'Status', value: status, inline: true },
            { name: '\u200B', value: '\u200B' },
            { name: " ", value: `**${txt} <@${interaction.options.get('clients-discord').value}> ! **` },

          ]
        } catch (error) {
          console.log('CATCHED')
          if (error) {
            interaction.reply('An error has occured, please try again later.')
            console.log('error',error)
            return
          }
        }
        }


        api.getTHUMBNAIL(rblx_id).then(url => {
          console.log(url)
          thumburl = url
          createEmbed()
        })






      });







      async function createEmbed() {
        const emb = new EmbedBuilder()

          .setColor('Random')
          .setURL(`https://www.roblox.com/users/${rblx_id}/profile`)
          .setTitle(`Tryout Results for ${interaction.options.get('roblox-username').value}`)
          .setThumbnail(thumburl)
          .setImage("https://images-ext-1.discordapp.net/external/UuFwfFPSK3v1YzgukDO18LWBakHEyf0MSaiNww_93JM/https/share.creavite.co/6693bb8c6bbfe796751481d2.gif?width=550&height=70")

          .addFields(
            fields

          )
          .setFooter({
            text: `Tryout hosted by ${interaction.user.username}`,
            iconURL: `https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.png?size=256`,

          })
          .setTimestamp();
        var mod = require('../../models/TryoutLogs.js')
        const tryout_query = new mod({
          guildID : interaction.guild.id,
          userID : interaction.options.get('clients-discord').value,
          RobloxUsername : interaction.options.get('roblox-username').value,
          date : new Date(),
          content : fields
      
      })
        await tryout_query.save().catch((e) => {
          console.log('Error updating Tryout Result log.',e)
          interaction.followUp('An Unexpected error has occured.')
        })
        await interaction.reply({ embeds: [emb] })
        client.channels.cache.get(channel.channelID).send({ embeds: [emb] })
        if (status == 'Passed') {
          var role = interaction.guild.roles.cache.get('1260664715353395200')
          let user = interaction.guild.members.fetch(`${interaction.options.get('clients-discord').value}`);
          user.then(function (user_obj) {
            if (user_obj.roles.cache.has(role.id)) {
              interaction.followUp('The targetted user already has IGC Member role, no roles have been updated.')
            }
            user_obj.roles.add(role)
            AddToClanEmbed(interaction.options.get('clients-discord').value, interaction.options.get('roblox-username').value, `https://www.roblox.com/users/${rblx_id}/profile`)
            interaction.followUp('Logged New IGC Member')
          });

        }
        //client.channels.cache.get(channel).send({embeds:[emb]})

        //commando(client,'addtoclan',interaction,[interaction.options.get('clients-discord').value,interaction.options.get('roblox-username').value])
      }

    } else if (channel == null) {
      interaction.reply('Tryout Result Log channel has not been set, run /settryoutschannel to set a channel.')
    } else if (id == null) {
      interaction.reply('Tryout Hoster role has not been set, run /settryoutchannel to set a role.')
    } else {
      interaction.reply('You are not a tryout hoster. You do not have the permissions to run this command.')
      console.log(interaction.member.roles.cache.has(id.roleID), id.roleID)
    }
  


}

module.exports = logtryout;