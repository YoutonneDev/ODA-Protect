////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////       CREATE BY          ///////////////////////////////////////
///////////////////////////////       YOUTONNE          ////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
const Discord = require("discord.js");
const ms = require("ms");

module.exports = {

    name: "unmute",
    description: "UnMute un membre",
    utilisation: "/unmute",
    permission: Discord.PermissionFlagsBits.ModerateMembers,
    ownerOnly: false,
    dm: false,
    category: "👮🏻‍♂️ Modérations",
    options: [
        {
            type: "user",
            name: "membre",
            description: "Le membre à unmute",
            required: true,
            autocomplete: false
        }, {
            type: "string",
            name: "raison",
            description: "La raison du unmute",
            required: false,
            autocomplete: false
        }
    ],

    async run(bot, message, args) {

        let user = args.getUser("membre");
        if(!user) return message.reply("L'utilisateur n'existe pas!")
        let member = message.guild.members.cache.get(user.id)
        if(!member) return message.reply("L'utilisateur n'existe pas!")

        let reason = args.getString("raison");
        if (!reason) reason = "Aucune raison";

        if(!member.moderatable) return message.reply("Vous ne pouvez pas unmute ce membre!")
        if(message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("Vous ne pouvez pas unmute ce membre!")
        if(!member.isCommunicationDisabled()) return message.reply("Ce membre n'est pas désactivé!")

        try {await user.send(`Tu as été unmute du sevreur par ${message.user.tag} pour la raison : \`${reason}\``)} catch (err) {}

        await message.reply(`${message.user} a unmute le membre ${user.tag} pour la raison : \`${reason}\``)

        await member.timeout(null, reason)
    }
}