////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////       CREATE BY          ///////////////////////////////////////
///////////////////////////////       YOUTONNE          ////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
const Discord = require("discord.js");

module.exports = {

    name: "help",
    description: "Montre la liste des commandes",
    utilisation: "/help",
    permission: "Aucune",
    ownerOnly: false,
    dm: true,
    category: "❗Information",
    option: [
        {
            type: "string",
            name: "commande",
            description: "Le nom de la commande",
            required: false,
            autocomplete: true
        }
    ],

    async run(bot, message, args) {

        let command;
        if(args.getString("commande")) {
            command = bot.commands.get(args.getString("commande"));
            if(!command) return message.reply("La commande n'existe pas!");
        }
        if(!command){

            let categories = [];
            bot.commands.forEach(command => {
                if(!categories.includes(command.category)) categories.push(command.category)
            })

            let Embed = new Discord.EmbedBuilder()
            .setColor(bot.color)
            .setTitle(`Commandes du serveur ${message.guild.name}`)
            .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
            .setDescription(`Commandes disponibles : \`${bot.commands.size}\`\nCatégories disponibles : \`${categories.length}\``)
            .setTimestamp()
            .setFooter({text: "Command du serveur : " + message.guild.name, iconURL: bot.user.displayAvatar})

            await categories.sort().forEach(async cat => {

                let commands = bot.commands.filter(cmd => cmd.category === cat)
                Embed.addFields({name: `${cat}`, value: `${commands.map(cmd => `\`${cmd.name}\` : ${cmd.description}`).join("\n")}`})
            })

            await message.reply({embeds: [Embed]})

        } else {

            let Embed = new Discord.EmbedBuilder()
            .setColor(bot.color)
            .setTitle(`Commandes ${command.name}`)
            .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
            .setDescription(`Nom : \`${command.name}\`\nDescription : \`${command.description}\`\nPermission requise : \`${typeof command.permission !== "bignt" ? command.permission : new Discord.PermissionsBitField(command.permission).toArray(false)}\`\nCatégorie : \`${command.category}\``)
            .setTimestamp()
            .setFooter({text: "Command du serveur : " + message.guild.name, iconURL: bot.user.displayAvatar}) 

            await message.reply({embeds: [Embed]})
        }
    }
}