const Discord = require("discord.js");

module.exports = async (bot, member) => {
    let db = bot.db;

    bot.on("warn", async (message) => {
        db.query(`SELECT * FROM logs WHERE guildID = '${message.guild.id}'`, async (err, logsReq) => {
            if (logsReq.length > 0) {
                const warnLogId = logsReq[0].warnID;
                const warnLogChannel = message.guild.channels.cache.get(warnLogId);

                if (warnLogChannel) {

                    // Envoyer l'avertissement dans le canal de logs des warns
                    warnLogChannel.send(`Avertissement pour **${message.user.tag}`);
                }
            }
        });
    });
}