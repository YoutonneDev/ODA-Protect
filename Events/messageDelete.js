const Discord = require("discord.js");

module.exports = async (bot, message) => {

    let db = bot.db;

   

	// Enregistrement des messages supprim�s dans les logs
    bot.on("messageDelete", async (deletedMessage) => {
        db.query(`SELECT * FROM logs WHERE guildID = '${deletedMessage.guild.id}'`, async (err, logsReq) => {
            if (logsReq.length > 0) {
                const messageLogId = logsReq[0].messageID;
                const messageLogChannel = deletedMessage.guild.channels.cache.get(messageLogId);

                if (messageLogChannel) {
                // Envoyer le message supprim� dans le canal de logs des messages
                messageLogChannel.send(`Message supprimé par **${deletedMessage.author.tag}** dans **${deletedMessage.channel.name}**: ${deletedMessage.content}`);
                }
            }
        });
    });
}