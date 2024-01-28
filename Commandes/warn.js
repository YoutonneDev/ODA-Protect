////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////       CREATE BY          ///////////////////////////////////////
///////////////////////////////       YOUTONNE          ////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
const Discord = require("discord.js");

module.exports= {

    name: "warn",
    description: "Warn un membre",
    utilisation: "/warn",
    permission: Discord.PermissionFlagsBits.ManageMessages,
    ownerOnly: false,
    dm: false,
    category: "👮🏻‍♂️ Modérations",
    options: [
        {
            type: "user",
            name: "membre",
            description: "Le membre à warn",
            required: true,
            autocomplete: false
        }, {

            type: "string",
            name: "raison",
            description: "La raison du warn",
            required: false,
            autocomplete: false
        }
    ],

    async run(bot, message, args, db) {
        
        let user = args.getUser("membre");
        if(!user) return message.reply("Pas de membre ❌")
        let member = message.guild.members.cache.get(user.id)
        if(!member) return message.reply("Pas de membre ❌")

        let reason = args.getString("raison")
        if(!reason) reason = "Pas de raison fournie."

        if(message.user.id === user.id) return message.reply("Tu ne peut pas te warn ⚠️")
        if((await message.guild.fetchOwner()).id === user.id) return message.reply("Tu ne peut pas warn le Fondateur ⚠️")
        if(message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("Tu ne peut pas bannir ce membre ⚠️")
        if((await message.guild.members.fetchMe()).roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("Le bot ne peut pas warn ce membre ❌")

        try {await user.send(`Tu as été warn du sevreur [${message.guild.name}] par ${message.user.tag} Pour la raison : \`${reason}\``)} catch (err) {}

        await message.reply(`${message.user} a warn le membre ${user.tag} avec la raison : \`${reason}\``);

        let ID = await bot.function.createId("WARN")

        db.query(`INSERT INTO warns (guild, user, author, warn, reason, date) VALUES ('${message.guild.id}', '${user.id}', '${message.user.id}', '${ID}', '${reason.replace(/'/g, "\\'")}', '${Date.now()}')`)

    } 
}