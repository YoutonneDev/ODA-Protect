////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////       CREATE BY          ///////////////////////////////////////
///////////////////////////////       YOUTONNE          ////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
const Discord = require("discord.js");
const { ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, SlashCommandBuilder } = require('discord.js');
module.exports= {

    name: "ticketsupport",
    description: "Envoi l'embed des tickets",
    utilisation: "/ticketsupport",
    permission: Discord.PermissionFlagsBits.ManageGuild,
    ownerOnly: false,
    dm: false,
    category: "🛡️ Administration",
    options: [],    

    async run(bot, message, args, db) {

        let Embed = new Discord.EmbedBuilder()
        .setColor(bot.color)
        .setTitle("SUPPORT")
        .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
        .setDescription("Pour toute demande d'aide, Merci de bien vouloir creer un tickets")
        .setTimestamp()
        .setFooter({text: bot.user.username, iconURL: bot.user.displayAvatarURL({dynamic: true})})


        const btn = new Discord.ActionRowBuilder().addComponents(new Discord.ButtonBuilder()
     .setCustomId("Ticketsupport")
     .setLabel("Ouvrir un ticket")
     .setStyle(Discord.ButtonStyle.Primary)
     .setEmoji("📥"))

        await message.reply({embeds: [Embed], components: [btn]})
        
       
    }
}