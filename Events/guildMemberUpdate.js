const Discord = require("discord.js");

module.exports = async (bot, message) => {

    let db = bot.db;


      // Enregistrement des modifications de r�les dans les logs
      bot.on("guildMemberUpdate", async (oldMember, newMember) => {
        const guild = newMember.guild;

        // V�rifier si le membre a obtenu un nouveau r�le
        const addedRoles = newMember.roles.cache.filter(role => !oldMember.roles.cache.has(role.id));

        if (addedRoles.size > 0) {
            db.query(`SELECT * FROM logs WHERE guildID = '${guild.id}'`, async (err, logsReq) => {
                if (logsReq.length > 0) {
                    const roleLogId = logsReq[0].roleID;
                    const roleLogChannel = guild.channels.cache.get(roleLogId);

                    if (roleLogChannel) {
                        // Envoyer un message pour chaque r�le ajout�
                        addedRoles.forEach(addedRole => {
                            roleLogChannel.send(`Membre ${newMember.user.tag} a obtenu le rôle : **${addedRole.name}**`);
                        });
                    }
                }
            });
        }

        // V�rifier si le membre a perdu un r�le
        const removedRoles = oldMember.roles.cache.filter(role => !newMember.roles.cache.has(role.id));

        if (removedRoles.size > 0) {
            db.query(`SELECT * FROM logs WHERE guildID = '${guild.id}'`, async (err, logsReq) => {
                if (logsReq.length > 0) {
                    const roleLogId = logsReq[0].roleID;
                    const roleLogChannel = guild.channels.cache.get(roleLogId);

                    if (roleLogChannel) {
                        // Envoyer un message pour chaque r�le retir�
                        removedRoles.forEach(removedRole => {
                            roleLogChannel.send(`Membre ${newMember.user.tag} a perdu le rôle : **${removedRole.name}**`);
                        });
                    }
                }
            });
        }
    });
}