////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////       CREATE BY          ///////////////////////////////////////
///////////////////////////////       YOUTONNE          ////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
const Discord = require("discord.js");
const { ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, SlashCommandBuilder } = require('discord.js');


module.exports = async (bot, interaction, message) => {

    
    if(interaction.type === Discord.InteractionType.ApplicationCommandAutocomplete) {
    	
        let entry =  interaction.options.getFocused()
/////////////////////////////////////// AUTOCOMPLET help //////////////////////////////////////////////////////////////////////
        if(interaction.commandName === "help") {

            let choices = bot.commands.filter(cmd => cmd.name.includes(entry))
            await interaction.respond(entry === "" ? bot.commands.map(cmd => ({name: cmd.name, value: cmd.name})) : choices.map(choices => ({name: choice, value:choice})));
        }
/////////////////////////////////////// AUTOCOMPLET CAPTCHA & ANTIRAID //////////////////////////////////////////////////////////////////////
        //if(interaction.commandName === "setcaptcha" || interaction.commandName === "setantiraid") {
//
        //    let choices = ["on", "off"]
        //    let sortie = choices.filter(c => c.includes(entry))
        //    await interaction.respond(entry === "" ? sortie.map(c => ({name: c, value: c})) : sortie.map(c=> ({name: c, value:c})));
        //}
//
/////////////////////////////////////// AUTOCOMPLET STATUS //////////////////////////////////////////////////////////////////////
        if(interaction.commandName === "setstatus") {
        
            let choices = ["Listening", "Watching", "Playing", "Streaming", "Competing"]
            let sortie = choices.filter(c => c.includes(entry))
            await interaction.respond(entry === "" ? sortie.map(c => ({name: c, value: c})) : sortie.map(c=> ({name: c, value:c})));
        }
    }
/////////////////////////////////////// COMMAND //////////////////////////////////////////////////////////////////////

    if(interaction.type === Discord.InteractionType.ApplicationCommand) {
        let command = require(`../Commandes/${interaction.commandName}`);
        command.run(bot, interaction, interaction.options, bot.db);
    }
/////////////////////////////////////// TICKET SUPPORT //////////////////////////////////////////////////////////////////////
    if(interaction.isButton()) {

      if(interaction.customId === "Ticketsupport") {

        let channel = await interaction.guild.channels.create({
          name: `🆘 - ${interaction.user.username}`,
          type: Discord.ChannelType.GuildText
        })
        await channel.setParent(interaction.channel.parent.id)
        await channel.permissionOverwrites.create(interaction.guild.roles.everyone, {
            ViewChannel: false,
        })
        await channel.permissionOverwrites.create(interaction.user, {
          ViewChannel: true,
          SendMessages: true,
          ReadMessageHistory: true,
          ReadMessageHistory: true,
          EmbedLinks: true,
        })
        await channel.permissionOverwrites.create(bot.user, {
          ViewChannel: true,
          SendMessages: true,
          ReadMessageHistory: true,
          ReadMessageHistory: true,
          EmbedLinks: true,
        })
      await channel.setTopic(interaction.user.id)
      await interaction.reply({content: `Le ticket a était créer : ${channel}`, ephemeral: true})
      
     
      let Embed1 = new Discord.EmbedBuilder()
      .setColor(bot.color)
      .setTitle("⚙️ Géstion")
      .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
      .setDescription(`Votre ticket a était créer ✅\nUn Staff vas arrivé le plus vite possible.\nEn attendant, Merci de bien vouloir \nExprimer la raison du ticket.`)
      .setTimestamp()
      .setFooter({text: bot.user.username, iconURL: bot.user.displayAvatarURL({dynamic: true})})
      
        
     const btn = new Discord.ActionRowBuilder().addComponents(new Discord.ButtonBuilder()
     .setCustomId("close")
     .setLabel("Fermer le ticket")
     .setStyle(Discord.ButtonStyle.Danger)
     .setEmoji("✖️"))
     
      await channel.send({embeds: [Embed1], components: [btn]})
          
      }
     
        if(interaction.customId === "close") {
        
          let user = bot.users.cache.get(interaction.channel.topic) 
          try {await user.send("Votre ticket a était fermé")} catch (err) {}

          await interaction.channel.delete()
        
      
    }

    /////////////////////////////////////// TICKET RECRUTEMENT //////////////////////////////////////////////////////////////////////
    if(interaction.isButton()) {

      if(interaction.customId === "Ticketsrecrutement") {

        let channel = await interaction.guild.channels.create({
          name: `💼 - ${interaction.user.username}`,
          type: Discord.ChannelType.GuildText
        })
        await channel.setParent(interaction.channel.parent.id)
        await channel.permissionOverwrites.create(interaction.guild.roles.everyone, {
            ViewChannel: false,
        })
        await channel.permissionOverwrites.create(interaction.user, {
          ViewChannel: true,
          SendMessages: true,
          ReadMessageHistory: true,
          ReadMessageHistory: true,
          EmbedLinks: true,
        })
        await channel.permissionOverwrites.create(bot.user, {
          ViewChannel: true,
          SendMessages: true,
          ReadMessageHistory: true,
          ReadMessageHistory: true,
          EmbedLinks: true,
        })
      await channel.setTopic(interaction.user.id)
      await interaction.reply({content: `Le ticket a était créer : ${channel}`, ephemeral: true})
      
     
      let Embed = new Discord.EmbedBuilder()
      .setColor(bot.color)
      .setTitle("⚙️ Géstion")
      .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
      .setDescription(`Votre ticket a était créer ✅\nUn Staff vas arrivé le plus vite possible.\nEn attendant, Merci de bien vouloir \nvous présenté.`)
      .setTimestamp()
      .setFooter({text: bot.user.username, iconURL: bot.user.displayAvatarURL({dynamic: true})})
      
        
     const btn = new Discord.ActionRowBuilder().addComponents(new Discord.ButtonBuilder()
     .setCustomId("stop")
     .setLabel("Fermer le ticket")
     .setStyle(Discord.ButtonStyle.Danger)
     .setEmoji("✖️"))
     
      await channel.send({embeds: [Embed], components: [btn]})
          
      }
     
        if(interaction.customId === "stop") {
        
          let user = bot.users.cache.get(interaction.channel.topic) 
          try {await user.send("Votre ticket a était fermé")} catch (err) {}

          await interaction.channel.delete()
        }
        
      
    }
        //////////////////////////////////////////////////////////////////////////////////////////////////////////
   

  }
}
