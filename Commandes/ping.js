////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////       CREATE BY          ///////////////////////////////////////
///////////////////////////////       YOUTONNE          ////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
const Discord = require("discord.js");
const { ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {

    name: "ping",
    description: "Vérifie la latence du bot",
    utilisation: "/ping",
    permission: "Aucune",
    ownerOnly: false,
    dm: false,
    category: "❗Information",
    options: [],

    async run(bot, message, args) {
        let Embed = new Discord.EmbedBuilder()
            .setTitle("Latence du bot")
            .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
            .setDescription(`Le ping actuel du bot est de:\n \`${bot.ws.ping}\``)
            .setColor(bot.color)
            .setTimestamp()
            
        
        await message.reply({embeds: [Embed]})
    }
}