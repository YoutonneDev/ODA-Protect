////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////       CREATE BY          ///////////////////////////////////////
///////////////////////////////       YOUTONNE          ////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
const Discord = require("discord.js");
const ms = require("ms");

module.exports = {

    name: "mute",
    description: "Mute un membre",
    utilisation: "/mute",
    permission: Discord.PermissionFlagsBits.ModerateMembers,
    ownerOnly: false,
    dm: false,
    category: "👮🏻‍♂️ Modérations",
    options: [
        {
            type: "user",
            name: "membre",
            description: "Le membre à mute",
            required: true,
            autocomplete: false
        }, {
            type: "string",
            name: "temps",
            description: "Le temps du mute",
            required: true,
            autocomplete: false
        }, {
            type: "string",
            name: "raison",
            description: "La raison du mute",
            required: false,
            autocomplete: false
        }
    ],

    async run(bot, message, args) {

        let user = args.getUser("membre");
        if(!user) return message.reply("L'utilisateur n'existe pas!")
        let member = message.guild.members.cache.get(user.id)
        if(!member) return message.reply("L'utilisateur n'existe pas!")

        let time = args.getString("temps");
        if(!time) return message.reply("Pas de temps!")
        if(isNaN(ms(time))) return message.reply("Pas le bon format de temps!")
        if(ms(time) > 2419200000) return message.reply("Le temps donne est trop long!")

        let reason = args.getString("raison");
        if (!reason) reason = "Aucune raison";

        if(message.user.id === user.id) return message.reply("Vous ne pouvez pas mute ce membre!")
        if((await message.guild.fetchOwner()).id === user.id) return message.reply("Vous ne pouvez pas mute le propriétaire!")
        if(!member.moderatable) return message.reply("Vous ne pouvez pas mute ce membre!")
        if(message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("Vous ne pouvez pas mute ce membre!")
        if(member.isCommunicationDisabled()) return message.reply("Ce membre est désactivé!")

        try {await user.send(`Tu as été mute du sevreur ${message.guild.name} par ${message.user.tag} pendant ${time} pour la raison : \`${reason}\``)} catch(err) {}

        await message.reply(`${message.user} a mute ${user.tag} pendant ${time} pour la raison : \`${reason}\``)

        await member.timeout(ms(time), reason)
    }
}