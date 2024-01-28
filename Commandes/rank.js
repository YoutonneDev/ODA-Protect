////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////       CREATE BY          ///////////////////////////////////////
///////////////////////////////       YOUTONNE          ////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
const Discord = require("discord.js");
const Canvas = require("discord-canvas-easy");

module.exports= {

    name: "rank",
    description: "Donne l'xp d'un memrbre",
    utilisation: "/rank",
    permission: "Aucune",
    ownerOnly: false,
    dm: false,
    category: "🆙Expérience",
    options: [
        {
            type: "user",
            name: "utilisateur",
            description: "L' xp du membre",
            required: false,
            autocomplete: false
        }
    ],

    async run(bot, message, args, db) {

        let user;
        if(args.getUser("utilisateur")) {

            user = args.getUser("utilisateur");
            if(!user || !message.guild.members.cache.get(user?.id)) return message.reply("L'utilisateur n'existe pas!")

        } else user = message.user;

        db.query(`SELECT * FROM xp WHERE guildId = '${message.guildId}' AND userId = '${user.id}'`, async (err, req) => {

            db.query(`SELECT * FROM xp WHERE guildId = '${message.guildId}'`, async (err, all) => {
          
                if(req.length < 1) return message.reply("Ce membre n'a pas d'xp!")

                await message.deferReply()

                all = await all.sort(async (a, b) => (await bot.function.calculXp(parseInt(b.xp), parseInt(b.level))) - (await bot.function.calculXp(parseInt(a.xp), parseInt(a.level))))
                let xp = parseInt(req[0].xp)
                let level = parseInt(req[0].level)
                let rank = all.findIndex(r => r.user === message.user.id) + 1;
                let need = (level + 1) * 1000;

                let Card = await new Canvas.Card()
                .setBackground("https://i.imgur.com/O0ZahwF.jpg")
                .setBot(bot)
                .setColorFont("#ffffff")
                .setRank(rank)
                .setUser(user)
                .setColorProgressBar("#77B5FE")
                .setGuild(message.guild)
                .setXp(xp)
                .setLevel(level)
                .setXpNeed(need)
                .toCard()

                await message.followUp({files: [new Discord.AttachmentBuilder(Card.toBuffer(), {name: "rank.png"})]})
            }) 
        })

    }
}