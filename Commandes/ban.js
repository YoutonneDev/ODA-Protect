////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////       CREATE BY          ///////////////////////////////////////
///////////////////////////////       YOUTONNE          ////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
const Discord = require("discord.js");

module.exports= {

    name: "ban",
    description: "Bannir un membre",
    utilisation: "/ban",
    permission: Discord.PermissionFlagsBits.BanMembers,
    ownerOnly: false,
    dm: false,
    category: "👮🏻‍♂️ Modérations",
    options: [
        {
            type: "user",
            name: "membre",
            description: "Le membre à bannir",
            required: true,
            autocomplete: false
        }, {

            type: "string",
            name: "raison",
            description: "La raison du bannissement",
            required: false,
            autocomplete: false
        }
    ],

    async run(bot, message, args, db) {

        let user = await bot.users.fetch(args._hoistedOptions[0].value)
        if (!user) return message.reply("L'utilisateur n'existe pas!")
        let member = message.guild.members.cache.get(user.id)

        let reason = args.getString("raison");
        if (!reason) reason = "Aucune raison";

        if(message.user.id === user.id) return message.reply("Vous ne pouvez pas bannir ce membre !")
        if((await message.guild.fetchOwner()).id === user.id) return message.reply("Vous ne pouvez pas bannir le propriétaire !")
        if(member && !member.bannable) return message.reply("Vous ne pouvez pas bannir ce membre!")
        if(member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("Vous ne pouvez pas bannir ce membre !")
        if((await message.guild.bans.fetch()).get(user.id)) return message.reply("Ce membre a déjà été banni !")

        try {await user.send(`Tu as été banni du sevreur [${message.guild.name}] par ${message.user.tag} Pour la raison : \`${reason}\``)} catch (err) {}

        await message.reply(`${message.user} a banni le membre ${user.tag} avec la raison : \`${reason}\``);

        await message.guild.bans.create(user.id, {reason: reason})

        let ID = await bot.function.createId("BAN")

        db.query(`INSERT INTO bans (guild, user, author, ban, reason, date) VALUES ('${message.guild.id}', '${user.id}', '${message.user.id}', '${ID}', '${reason.replace(/'/g, "\\'")}', '${Date.now()}')`)
    }
}