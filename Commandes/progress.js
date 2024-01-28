////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////       CREATE BY          ///////////////////////////////////////
///////////////////////////////       YOUTONNE          ////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
const Discord = require("discord.js");
let lastProgressMessageId;
let messageCreateCallback;
 
function createProgressBar(percent, newPercent) {
  const progressBar = [];
  const numFilled = Math.round(newPercent / 10);
  const numEmpty = 10 - numFilled;
 
  for (let i = 0; i < numFilled; i++) {
    progressBar.push("▓");
  }
 
  for (let i = 0; i < numEmpty; i++) {
    progressBar.push("░");
  }
 
  return progressBar.join("");
}
 
function stopProgressBar(channel) {
}
 
module.exports = {
  name: "progress",
  description: "Mettre à jour la barre de progression",
  utilisation: "/progress",
  permission: Discord.PermissionFlagsBits.Administrator,
  ownerOnly: false,
  dm: false,
  category: "🛡️ Administration",
  options: [
    {
      name: "percent",
      type: "integer",
      description: "Le pourcentage de progression à mettre à jour",
      required: true,
      autocomplete: false
    },
    {
      name: "channel",
      type: "channel",
      description: "Le canal dans lequel envoyer la barre de progression",
      required: true,
      autocomplete: false
    }
  ],
  async run(bot, interaction) {
    const percent = interaction.options.getInteger("percent");
    const channel = interaction.options.getChannel("channel");
    // Supprimer tous les messages précédents du bot dans le canal de progression
    const botMessages = await channel.messages.fetch({ limit: 100 });
    const botProgressMessages = botMessages.filter((m) => m.author.id === bot.user.id);
    await channel.bulkDelete(botProgressMessages);
 
    // Arrêter la barre de progression avant d'envoyer la nouvelle barre de progression
    stopProgressBar(channel);
 
    // Créer la barre de progression
    const progressBar = createProgressBar(percent, percent);
 
    await interaction.reply({ content: `La barre de progression a été envoyée dans le canal ${channel}`, ephemeral: true });
 
    let lastProgressMessage = await channel.send(
      `Le serveur discord  est actuellement en maintenance mais toujours utilisable, l'état d'avancement de la mise à jour est de : \n${progressBar} ${percent}% `
    );
 
    // Stocker l'ID du dernier message de barre de progression envoyé dans une variable locale
    let lastProgressMessageId = lastProgressMessage.id;
 
    // Spprimer le gestionnaire d'événements "messageCreate" précédemment ajouté pour ce canal
    if (messageCreateCallback) {
       bot.removeListener("messageCreate", messageCreateCallback);
    }
 
    // Définir une fonction de rappel pour l'événement "messageCreate"
    messageCreateCallback = async (message) => {
      if (!message.author.bot && message.channel.id === channel.id) {
        if (message.id === lastProgressMessageId) return;
        if (message.content === "/stopprogress") {
          stopProgressBar(channel);
          bot.removeListener("messageCreate", messageCreateCallback);
        } else {
          await lastProgressMessage.delete().catch(console.error);
          const newPercent = interaction.options.getInteger("percent");
          const newProgressBar = createProgressBar(newPercent, newPercent);
          await lastProgressMessage.delete().catch(console.error);
          lastProgressMessage = await channel.send(
            `Le serveur discord  est actuellement en maintenance mais toujours utilisable, l'état d'avancement de la mise à jour est de : \n${progressBar} ${percent}% `
          );
          // Mettre à jour l'ID du dernier message de barre de progression envoyé
          lastProgressMessageId = lastProgressMessage.id;
        }
      }
    };
 
    // Ajouter un gestionnaire d'événements pour l'événement "messageCreate"
    bot.on("messageCreate", messageCreateCallback);
  }
};