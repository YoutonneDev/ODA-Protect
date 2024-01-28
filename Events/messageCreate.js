const Discord = require("discord.js");

module.exports = async (bot, message) => {

    let db = bot.db;

    if(message.author.bot || message.channel.type === Discord.ChannelType.DM) return;

///////////////////////////////////////////////////// antiraid ////////////////////////////////////////////////////////

    db.query(`SELECT * FROM server WHERE guild = '${message.guild.id}'`, async (err, req) => {

        if(req.length < 1) {

            db.query(`INSERT INTO server (guild, antiraid, ) VALUES ('${message.guild.id}', 'false')`)
        }  
    })  
///////////////////////////////////////////////////// XP ////////////////////////////////////////////////////////
    db.query(`SELECT * FROM xp WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`, async (err, req) => {

        if(req.length < 1) {

           
            db.query(`INSERT INTO xp (userId, guildId, xp, level) VALUES ('${message.author.id}', '${message.guild.id}', '0', '0')`)
            
        } else {

           
            let level = parseInt(req[0].level)
            let xp = parseInt(req[0].xp)

            if((level + 1) * 1000 < xp) {

                db.query(`UPDATE xp SET xp = '${xp - ((level + 1) * 1000)}' WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)
                db.query(`UPDATE xp SET level = '${level + 1}' WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)
                db.query(`SELECT * FROM exp WHERE guildId = '${message.guild.id}'`, async (err, del) => {
                    let exp = del[0].channelId;
                    const rankchannel = bot.channels.cache.get(exp);
                    if (!bot.channels.cache.get(rankchannel)) return rankchannel.send(`${message.author} est passé niveau ${level + 1}!`);
                });
                

            } else {

                let xptogive = Math.floor(Math.random() * 120) + 1;

                db.query(`UPDATE xp SET xp = '${xp + xptogive}' WHERE guildId = '${message.guild.id}' AND userId = '${message.author.id}'`)

            }
        }
    })
    

}

    
