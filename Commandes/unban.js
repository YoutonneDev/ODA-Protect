////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////       CREATE BY          ///////////////////////////////////////
///////////////////////////////       YOUTONNE          ////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
const Discord = require("discord.js");

module.exports= {

    name: "unban",
    description: "UnBannir un membre",
    utilisation: "/unban",
    permission: Discord.PermissionFlagsBits.BanMembers,
    ownerOnly: false,
    dm: false,
    category: "👮🏻‍♂️ Modérations",
    options: [
        {
            type: "user",
            name: "utilisateur",
            description: "L'utilisateur à unbannir",
            required: true,
            autocomplete: false
        }, {

            type: "string",
            name: "raison",
            description: "La raison du unbannissement",
            required: false,
            autocomplete: false
        }
    ],

    async run(bot, message, args) {

        
        let user = args.getUser("utilisateur");
        if (!user) return message.reply("L'utilisateur n'existe pas!")

        let reason = args.getString("raison");
        if (!reason) reason = "Aucune raison";

        if(!(await message.guild.bans.fetch()).get(user.id)) return message.reply("Cette utilisateur n'est pas banni!")

        try {await user.send(`Tu as été UNBANNED par ${message.user.tag} pour la raison : \`${reason}\``)} catch (err) {}

        await message.reply(`${message.user} a UNBANNED le membre ${user.tag}, Pour la raison : \`${reason}\``);

        await message.guild.members.unban(user, reason)

    }
}