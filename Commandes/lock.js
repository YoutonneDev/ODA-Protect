////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////       CREATE BY          ///////////////////////////////////////
///////////////////////////////       YOUTONNE          ////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
const Discord = require("discord.js");

module.exports= {

    name: "lock",
    description: "lock un salon",
    utilisation: "/lock",
    permission: Discord.PermissionFlagsBits.ManageChannels,
    ownerOnly: false,
    dm: false,
    category: "🛡️ Administration",
    options: [
        {
            type: "channel",
            name: "salon",
            description: "Le salon a lock",
            required: true,
            autocomplete: false
        }, {

            type: "role",
            name: "role",
            description: "Le role a lock",
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

        if(channel.permissionOverwrites.cache.get(role.id)?.deny.toArray(false).includes("SendMessages")) return message.reply(`le rôle \`${role.name}\` est deja lock dans se salon: ${channel}`)

        if(channel.permissionOverwrites.cache.get(role.id)) await channel.permissionOverwrites.edit(role.id, {SendMessages: false})
        else await channel.permissionOverwrites.create(role.id, {SendMessage: false})

        await message.reply(`le rôle \`${role.name}\` est bien lock dans le salon: ${channel}`)
    }
}