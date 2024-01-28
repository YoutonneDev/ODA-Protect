////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////       CREATE BY          ///////////////////////////////////////
///////////////////////////////       YOUTONNE          ////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
const Discord = require("discord.js")
const { ChannelType } = require("discord.js")

module.exports = {

    name: "info",
    description: "Permet de donnée les informations du bot",
    utilisation: "/info",
    permission: "Aucune",
    ownerOnly: false,
    utilisation: "/info",
    dm: false,
    category: "❗Information",
    options: [],

    async run(bot, message, args) {
    
        let membercount = message.guild.memberCount;
        let m = message.guild.members.cache.filter(member => member.user.bot).size
        let totalmember = bot.guilds.cache.map(g => g.memberCount).reduce((a, b) => a + b)

        let rolesCount = 0
        bot.guilds.cache.forEach(guild => {

            return rolesCount = rolesCount +guild.roles.cache.size
        })

        let channelsCount = 0 
        bot.guilds.cache.forEach(guild => {

            return channelsCount = channelsCount +guild.channels.cache.size
        })

        let emojisCount = 0 
        bot.guilds.cache.forEach(guild => {
        
            return emojisCount = emojisCount +guild.emojis.cache.size
        })
     

        
        let Embed = new Discord.EmbedBuilder()
        .setColor(bot.color)
        .setTitle(`Information du bot \`${bot.user.tag}\``)        
        .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
        .setDescription(`
            **__Information du Bot__**

            **Développeur** : \`@youtonne_dev\`
            **Owner** : \`@oxyfloz\`
            **Nom** : \`ODA\`
            **ID** : \`1188986067873964112\`
            **Uptime :** \`${Math.round(bot.uptime / (1000 * 60 * 60)) + "h " + (Math.round(bot.uptime / (1000 * 60)) % 60) + "m " + (Math.round(bot.uptime / 1000) % 60) + "s "}\`
            **Discord Version :** \`${Discord.version}\`
            **Node Version :** \`${process.version}\`

            **__Information Statistiques__**

            **Serveurs** : \`${bot.guilds.cache.size}\`
            **Commandes Dispo** : \`${bot.commands.size}\`
            **Membres** : \`${totalmember}\`
            **Rôles** : \`${rolesCount}\`
            **Salon** : \`${channelsCount}\`
            **Émojis** : \`${emojisCount}\`

        `)
        .setTimestamp()
        .setFooter({text: `${bot.user.tag}`, iconURL: (bot.user.displayAvatarURL({dynamic: true}))})

        await message.reply({embeds: [Embed]})
   } 
}