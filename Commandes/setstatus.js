////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////       CREATE BY          ///////////////////////////////////////
///////////////////////////////       YOUTONNE          ////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
const Discord = require("discord.js");

module.exports= {

    name: "setstatus",
    description: "Modifier le status du bot",
    utilisation: "/setstatus",
    permission: Discord.PermissionFlagsBits.Administrator,
    ownerOnly: true,
    dm: false,
    category: "🛡️ Administration",
    options: [
        {
            type: "string",
            name: "activité",
            description: "activité du bot'",
            required: true,
            autocomplete: true
        }, {
            type: "string",
            name: "status",
            description: "Status du bot'",
            required: true,
            autocomplete: false
        }, {
            type: "string",
            name: "lien",
            description: "URL du stream'",
            required: false,
            autocomplete: false
        }
    ],    

    async run(bot, message, args, db) {

        let activity = args.getString("activité");
        if(activity !== "Listening" && activity !== "Playing" && activity !== "Competing" && activity !== "Watching" && activity !== "Streaming")  return message.reply("Il faut suivre l'autocompete proposer parle bot")

        let status = args.getString("status");

        if(activity === "Streaming" && args.getString("lien") === null)return message.reply("Metre un URL")
        if(activity === "Streaming" && !args.getString("lien").match(new RegExp(/^(?:https?:\/\/)?(?:www\.|go\.)?twitch\.tv\/([a-z0-9_]+)($|\?)/))) return message.reply("Metre un URL twitchactivity")
        
        if(activity === "Streaming") await bot.user.setActivity(status, {type: Discord.ActivityType[activity], url: args.getString("lien")})
        else await bot.user.setActivity(status, {type: Discord.ActivityType[activity]})
        await message.reply("Status du bot mise à jour !")
    }
}