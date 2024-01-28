////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////       CREATE BY          ///////////////////////////////////////
///////////////////////////////       YOUTONNE          ////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
const { SlashCommandBuilder, EmbedBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder, PermissionFlagsBits, ComponentType } = require('discord.js');
const Discord = require("discord.js");
const ms = require("ms");

module.exports = {
    name:"banlist",
    description: "Permet de voir les membres ban du serveur!",
    permission: Discord.PermissionFlagsBits.BanMembers,
    ownerOnly: false,
    utilisation: "/banlist",
    dm: false,
    category: "👮🏻‍♂️ Modérations",
    options: [],

    async run(bot, interaction) {

        const fetchBans = await interaction.guild.bans.fetch();
        const ID = fetchBans.map((m) => m.user.id);

        let i = 0;
        const allBans = [];
        const allBans2 = [];
        const IDArray = [];

        for (const member of fetchBans.map((m) => m.user.tag).values()) {
            allBans.push(`${i + 1}. ${member}`);
            allBans2.push(member);
            ++i;
        }

        
        for(const id of ID) {
            IDArray.push(id);
        }

        const BansEmbed = new EmbedBuilder()
            .setTitle("Ban Lists")
            .setDescription(`> **Nombre de Ban :** \`${fetchBans.size}\`\n\`\`\`${allBans.join("\n")}\`\`\``)
            .setColor(bot.color)
            .setTimestamp()
            .setFooter({ text: interaction.client.user.username, iconURL: interaction.client.user.displayAvatarURL() });

        const NotBans = new EmbedBuilder()
            .setTitle("Ban Lists")
            .setDescription("Il n'y a pas de bannissement sur ce serveur!")
            .setColor(bot.color)
            .setTimestamp()
            .setFooter({ text: interaction.client.user.username, iconURL: interaction.client.user.displayAvatarURL() });

        if (allBans2.length <= 0) return interaction.reply({ embeds: [NotBans], ephemeral: true });

        const select = new StringSelectMenuBuilder()
            .setCustomId("unbans")
            .setPlaceholder("Unban le membre");

        for (let i = 0; i < allBans2.length; i++) {
            const id = IDArray[i];
            select.addOptions(
                new StringSelectMenuOptionBuilder()
                    .setLabel(`${allBans2[i]}`)
                    .setDescription(`unban ${allBans2[i]}`)
                    .setValue(`${id}|${allBans2[i]}`)
            )
        }

        const TropDeLengthDansUnSelectMenu = new EmbedBuilder()
            .setTitle("Ban Lists")
            .setDescription("Vous ne pouvez pas annuler le bannissement, car le menu de sélection a dépassé les limites de débit de 25.!")
            .setColor(bot.color)
            .setTimestamp()
            .setFooter({ text: interaction.client.user.username, iconURL: interaction.client.user.displayAvatarURL() });

        if (allBans2.length > 25) return interaction.reply({ embeds: [TropDeLengthDansUnSelectMenu], ephemeral: true });

        const row = new ActionRowBuilder()
            .addComponents(select);

        const msg = await interaction.reply({ embeds: [BansEmbed], components: [row] });

        const time = ms("63 360 000")
        const collector = msg.createMessageComponentCollector({ componentType: ComponentType.StringSelect, time });

        collector.on("collect", async i => {
            if (!i.member.permissions.has(PermissionFlagsBits.BanMembers)) return i.reply({ content: "You do not have permission to perform this action!", ephemeral: true });
            const memberID = await i.values.toString().split("|")[0];


            await interaction.guild.members.unban(memberID).then(async (user) => {
                const Embed = new EmbedBuilder()
                    .setTitle("Unban")
                    .setDescription(`\`${user.tag}\` unban réussi!`)
                    .setColor(bot.color)
                    .setTimestamp()
                    .setFooter({ text: interaction.client.user.username, iconURL: interaction.client.user.displayAvatarURL() });

                await i.reply({ embeds: [Embed], ephemeral: true });
                await msg.delete();
            }).catch((err) => {
                console.log(err);
                return i.reply({ content: `Une erreur s'est produite : ${err.message}\n\n**Contacter le créateur de la command:** \`Youtonne_dev\`` });
            });
        });
    },
};