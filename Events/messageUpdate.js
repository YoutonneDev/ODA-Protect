const Discord = require("discord.js");

module.exports = async (bot, message) => {

    let db = bot.db;


    // Enregistrement des messages modifié dans les logs
    bot.on("messageUpdate", async (updatedMessage) => {
        db.query(`SELECT * FROM logs WHERE guildID = '${updatedMessage.guild.id}'`, async (err, logsReq) => {
            if (logsReq.length > 0) {
                const messageLogId = logsReq[0].messageID;
                const messageLogChannel = updatedMessage.guild.channels.cache.get(messageLogId);

                if (messageLogChannel) {
                // Envoyer le message modifi� dans le canal de logs des messages
                messageLogChannel.send(`Message modifié par **${updatedMessage.author.tag}** dans **${updatedMessage.channel.name}**:${updatedMessage.content}`);
                }
            }
        });
    });
}