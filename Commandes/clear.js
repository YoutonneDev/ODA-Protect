////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////       CREATE BY          ///////////////////////////////////////
///////////////////////////////       YOUTONNE          ////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
const Discord = require("discord.js");
const ms = require("ms");

module.exports = {

    name: "clear",
    description: "clear un salon",
    utilisation: "/clear",
    permission: Discord.PermissionFlagsBits.ManageMessages,
    ownerOnly: false,
    dm: false,
    category: "🛡️ Administration",
    options: [
        {
            type: "number",
            name: "nombre",
            description: "nombre de messages à supprimer",
            required: true,
            autocomplete: false
        }, {
            type: "channel",
            name: "salon",
            description: "Le salon a clear",
            required: false,
            autocomplete: true
        },
    ],

    async run(bot, message, args) {

        let channel = args.getChannel("salon");
        if(!channel) channel = message.channel;
        if(channel.id !== message.channel.id && !message.guild.channels.cache.get(channel.id)) return message.reply("Pas de salon valide!")
    
        let number = args.getNumber("nombre");
        if(parseInt(number) <= 0 || parseInt(number) > 100) return message.reply("Il faut avoir un nombre entre 1 et 100!")

        await message.deferReply({ephemeral: true})

        try {

            let messages = await channel.bulkDelete(parseInt(number));

            await message.followUp({content: `J'ai supprimé \`${messages.size}\` messages dans le salon ${channel} !`, ephemeral: true})

        } catch (err) {

            let messages = [...(await channel.messages.fetch()).filter(msg => !msg.interaction && (Date.now() - msg.createdAt) <= 1209600000).values()]
            if(messages.length <= 0) return message.followUp("Aucun messages à supprimé car les autres dataient de plus de 14 jours!")
            await channel.bulkDelete(messages)

            await message.followUp({content: `J'ai supprimé \`${messages.length}\` messages dans le salon ${channel} car les autres dataient de plus de 14 jours !`, ephemeral: true})
        }
    }
}