const Discord = require("discord.js");

module.exports = async (bot, member) => {
    let db = bot.db;

    bot.on("warn", async (info) => {
        db.query(`SELECT * FROM logs WHERE guildID = '${info.guild.id}'`, async (err, logsReq) => {
            if (logsReq.length > 0) {
                const warnLogId = logsReq[0].warnID;
                const warnLogChannel = info.guild.channels.cache.get(warnLogId);

                if (warnLogChannel) {

                    // Envoyer l'avertissement dans le canal de logs des warns
                    warnLogChannel.send(`Avertissement pour **${info.user.tag}`);
                }
            }
        });
    });
}