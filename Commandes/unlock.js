////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////       CREATE BY          ///////////////////////////////////////
///////////////////////////////       YOUTONNE          ////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
const Discord = require("discord.js");

module.exports= {

    name: "unlock",
    description: "unlock un salon",
    utilisation: "/unlock",
    permission: Discord.PermissionFlagsBits.ManageChannels,
    ownerOnly: false,
    dm: false,
    category: "🛡️ Administration",
    options: [
        {
            type: "channel",
            name: "salon",
            description: "Le salon a unlock",
            required: true,
            autocomplete: false
        }, {

            type: "role",
            name: "role",
            description: "Le role a unlock",
            required: false,
            autocomplete: false
        }
    ],

    async run(bot, message, args) {

        let channel = args.getChannel("salon");
        if(!message.guild.channels.cache.get(channel.id)) return message.reply("Pas de salon !")
        if(channel.type !== Discord.ChannelType.GuildText && channel.type !== Discord.ChannelType.GuildPublicThread && channel.type !== Discord.ChannelType.GuildPrivateThread) return message.reply("Envoyer un salon textuel")

        let role = args.getRole("role")
        if(role && !message.guild.roles.cache.get(role.id)) return message.reply("Pas de roles !")
        if(!role) role = message.guild.roles.everyone;

        if(channel.permissionOverwrites.cache.get(role.id)?.allow.toArray(false).includes("SendMessages")) return message.reply(`le rôle \`${role.name}\` est deja unlock dans se salon: ${channel}`)

        if(channel.permissionOverwrites.cache.get(role.id)) await channel.permissionOverwrites.edit(role.id, {SendMessages: true})
        else await channel.permissionOverwrites.create(role.id, {SendMessage: true})

        await message.reply(`le rôle \`${role.name}\` est bien unlock dans le salon: ${channel}`)
    }
}