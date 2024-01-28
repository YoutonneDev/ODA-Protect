const Discord = require("discord.js");

module.exports = async (bot, member) => {
    let db = bot.db;

    bot.on ( 'rateLimit' ,  ( rateLimitData )  =>  { 
        db.query(`SELECT * FROM logs WHERE guildID = '${rateLimitData.guild.id}'`, async (err, logsReq) => {
            if (logsReq.length > 0) {
                const botLogId = logsReq[0].botID;
                const botLogChannel = rateLimitData.guild.channels.cache.get(botLogId);

                if (botLogChannel) {
                
                    botLogChannel.send(`le bot ${rateLimitData.tag}** atteint une limite de débit lors d'une demande `);
                }
            }
        }); 
    } ) ;

    bot.on("ready", async (bot) => {
        db.query(`SELECT * FROM logs WHERE guildID = '${bot.guild.id}'`, async (err, logsReq) => {
            if (logsReq.length > 0) {
                const botLogId = logsReq[0].botID;
                const botLogChannel = bot.guild.channels.cache.get(botLogId);

                if (botLogChannel) {
                
                    botLogChannel.send(`le bot **${bot.tag}**est prêt à commencer à travailler`);
                }
            }
        });
    });
}