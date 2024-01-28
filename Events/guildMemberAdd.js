const Discord = require("discord.js");

module.exports = async (bot, member) => {
    let db = bot.db;

    /////////////////////////////////////////////////////////////////// AntiRaid ///////////////////////////////////////////////////////////////////////////////////////////

    db.query(`SELECT * FROM server WHERE guild = '${member.guild.id}'`, async (err, req) => {

        if (req.length < 1 ) return;

        if(req[0].antiraid === "true") {

            try { await member.user.send("Vous ne pouvez pas rejoindre car il est en mode antiraid")} catch(err) {}
            return member.kick("AntiRaid actif")
        }
    });

/////////////////////////////////////////////////////////////////// Captcha ///////////////////////////////////////////////////////////////////////////////////////////

    db.query(`SELECT * FROM captcha WHERE guildId = '${member.guild.id}'`, async (err, req) => {
        if(req[0].captcha === "false") return;

        let channel = member.guild.channels.cache.get(req[0].captcha);
        if (!channel) return;

        let captcha = await bot.function.generateCaptcha();

        let msg = await channel.send({content: `${member}, Vous avez 2 minutes pour faire la vérification, si vous n'y arrivez pas, vous avez juste à rejoindre une nouvelle fois !`, files: [new Discord.AttachmentBuilder((await captcha.canvas).toBuffer(), {name: "captcha.png"})] });

        try {
            let filter = m => m.author.id === member.user.id;
            let response = (await channel.awaitMessages({ filter, max: 1, time: 120000, errors: ["time"] })).first();

            if (response.content === captcha.text) {

                await msg.delete();
                await response.delete();
                try { await member.user.send("Captcha Validé !"); } catch (err) {}
            //    await channel.permissionOverwrites.delete(member.user.id);
            const role = member.guild.roles.cache.get(req[0].roleId);
            if(role) await member.roles.add(role);
               
            } else {

                await msg.delete();
                await response.delete();
                try { await member.user.send("Vous avez échoué le captcha !"); } catch (err) {}
            //    await channel.permissionOverwrites.delete(member.user.id);
                await member.kick("Captcha non valide !");

            }
        } catch (err) {

            msg.delete();
            try { await member.user.send("Vous avez mis trop de temps pour valider le captcha !"); } catch (err) {}
            //await channel.permissionOverwrites.delete(member.user.id);
            await member.kick("Captcha non valide !");

        }
    });
/////////////////////////////////////////////////////////////////// Welcome ///////////////////////////////////////////////////////////////////////////////////////////
    try {
        db.query(`SELECT * FROM welcome WHERE guildID = '${member.guild.id}'`, async (err, req) => {
            if (req.length < 1) {
                return;
            } else {
                const title = req[0].titre;
                let description = req[0].welcomeMessage;
                if(description.includes("{user}")) description = description.replace("{user}", `${member}`)
                if(description.includes("{server}")) description = description.replace("{server}", `**${member.guild.name}**`)
                if(description.includes("{count}")) description = description.replace("{count}", `**${member.guild.memberCount}**`)
                
                const footer = req[0].footer;
                const timestamp = req[0].timestamp;
                
                
//
                const embed = new Discord.EmbedBuilder()
                    .setTitle(`Nouvelle arrivant 🛬`)
                    .setDescription(`${description}`)
                    .setColor(bot.color)
                    .setFooter({ iconURL: bot.user.displayAvatarURL({ dynamic: true }), text: `${footer}` })
                    .setThumbnail(member.displayAvatarURL({ dynamic: true }));

                if (timestamp === 'oui') embed.setTimestamp();
                if (!timestamp === 'oui') return;
                const role = member.guild.roles.cache.get(req[0].roleId);
            	if(role) await member.roles.add(role);


                db.query(`SELECT * FROM welcome WHERE guildID = '${member.guild.id}'`, async (err, del) => {
                    let welcome = del[0].channelId;
                    const welcomechannel = bot.channels.cache.get(welcome);
                    if (!bot.channels.cache.get(welcomechannel)) return welcomechannel.send({embeds: [embed] });
                    
                });
            };
        });
    } catch (err) {
        console.log(err);
    };
/////////////////////////////////////////////////////////////////// Logs d'arrivé ///////////////////////////////////////////////////////////////////////////////////////////
    bot.on("guildMemberAdd", async (joinedMember) => {
        db.query(`SELECT * FROM logs WHERE guildID = '${joinedMember.guild.id}'`, async (err, logsReq) => {
            if (logsReq.length > 0) {
                const joinLogId = logsReq[0].joinID;
                const joinLogChannel = joinedMember.guild.channels.cache.get(joinLogId);

                if (joinLogChannel) {
                    // Envoyer l'arrivée d'un membre dans le canal de logs des join
                    joinLogChannel.send(`Nouveau membre : **${joinedMember.user.tag}**`);
                }
            }
        });
    });
};
