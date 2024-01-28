const Discord = require("discord.js");


module.exports = async (bot, message) => {
    let db = bot.db;
    
    // Enregistrement des bans dans les logs
    bot.on("guildBanAdd", async (ban) => {
        db.query(`SELECT * FROM logs WHERE guildID = '${ban.guild.id}'`, async (err, logsReq) => {
            if (logsReq.length > 0) {
                const banLogId = logsReq[0].banID;
                const banLogChannel = ban.guild.channels.cache.get(banLogId);
                if (banLogChannel) {
                    // -----------------------  Envoyer un message dans le canal de logs des bans -------------------------------------
                    banLogChannel.send(`**${ban.user.tag}** a été banni du serveur.`);
                }
            }
        });
    });
    
};

