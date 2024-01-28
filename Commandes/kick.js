////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////       CREATE BY          ///////////////////////////////////////
///////////////////////////////       YOUTONNE          ////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
const Discord = require("discord.js");

module.exports= {

    name: "kick",
    description: "Kick un membre",
    utilisation: "/kick",
    permission: Discord.PermissionFlagsBits.KickMembers,
    ownerOnly: false,
    dm: false,
    category: "👮🏻‍♂️ Modérations",
    options: [
        {
            type: "user",
            name: "membre",
            description: "Le membre à kick",
            required: true,
            autocomplete: false
        }, {

            type: "string",
            name: "raison",
            description: "La raison du kick",
            required: false,
            autocomplete: false
        }
    ],

    async run(bot, message, args) {

        let user = args.getUser("membre");
        if (!user) return message.reply("L'utilisateur n'existe pas!")
        let member = message.guild.members.cache.get(user.id)
        if (!member) return message.reply("L'utilisateur n'existe pas!")

        let reason = args.getString("raison");
        if (!reason) reason = "Aucune raison";

        if(message.user.id === user.id) return message.reply("Vous ne pouvez pas kick ce membre !")
        if((await message.guild.fetchOwner()).id === user.id) return message.reply("Vous ne pouvez pas kick le propriétaire !")
        if(member && !member.kickable) return message.reply("Vous ne pouvez pas kick ce membre!")
        if(member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("Vous ne pouvez pas kick ce membre !")

        try {await user.send(`Tu as été kick du sevreur [${message.guild.name}] par ${message.user.tag} Pour la raison : \`${reason}\``)} catch (err) {}

        await message.reply(`${message.user} a kick le membre ${user.tag} avec la raison : \`${reason}\``);

        await member.kick(reason)

    }
}