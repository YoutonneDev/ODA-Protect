const Discord = require("discord.js");

module.exports = async (bot, message) => {

    let db = bot.db;


// Enregistrement des r�les cr��s dans les logs
    bot.on("roleCreate", async (createdRole) => {
        db.query(`SELECT * FROM logs WHERE guildID = '${createdRole.guild.id}'`, async (err, logsReq) => {
            if (logsReq.length > 0) {
                const roleLogId = logsReq[0].roleID;
                const roleLogChannel = createdRole.guild.channels.cache.get(roleLogId);

                if (roleLogChannel) {
// Envoyer le r�le cr�� dans le canal de logs des r�les
                    roleLogChannel.send(`Nouveau role cree : **${createdRole.name}**`);
                }
            }
        });
    });
}