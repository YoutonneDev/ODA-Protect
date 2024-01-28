const Discord = require("discord.js");

module.exports = async (bot, member) => {
    let db = bot.db;

//////////////////////////////////////////////////////////////// LOGS  leftMember ////////////////////////////////////////////////////////////////

    bot.on("guildMemberRemove", async (leftMember) => {
        db.query(`SELECT * FROM logs WHERE guildID = '${leftMember.guild.id}'`, async (err, logsReq) => {
            if (logsReq.length > 0) {
                const leftLogId = logsReq[0].leaveID;
                const leftLogChannel = leftMember.guild.channels.cache.get(leftLogId);

                if (leftLogChannel) {

// -----------------------  Envoyer le départ d'un membre dans le canal de logs des départ  -------------------------------------

                    leftLogChannel.send(`Membre parti : **${leftMember.user.tag}**`);

                }
            }
        });
    });
};