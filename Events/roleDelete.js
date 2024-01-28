const Discord = require("discord.js");

module.exports = async (bot, message) => {

    let db = bot.db;


	    // Enregistrement des r�les supprim�s dans les logs
    bot.on("roleDelete", async (deletedRole) => {
        db.query(`SELECT * FROM logs WHERE guildID = '${deletedRole.guild.id}'`, async (err, logsReq) => {
            if (logsReq.length > 0) {
                const roleLogId = logsReq[0].roleID;
                const roleLogChannel = deletedRole.guild.channels.cache.get(roleLogId);

                if (roleLogChannel) {
                    // Envoyer le r�le supprim� dans le canal de logs des r�les
                    roleLogChannel.send(`Role supprimé : **${deletedRole.name}**`);
                }
            }
        });
    });
}