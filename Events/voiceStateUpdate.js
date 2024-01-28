const Discord = require('discord.js');

module.exports = async (bot, oldState, newState) => {
    const db = bot.db;
    
    db.query(`SELECT * FROM privatevoc WHERE guildID = '${newState.guild.id}'`, async (err, req) => {
        if (req.length < 1) {
            return;
        } else {
            db.query(`SELECT * FROM privatevoc WHERE guildID = '${newState.guild.id}'`, async (err, req) => {

                const guild = newState.guild;
                const channelcreate = req[0].channelID
                const parent = newState.channel?.parent.id
                const memberName = newState.member.displayName;
                const channelName = `${memberName}'s vocal`;
                const newChannel = newState.channel;

                //try {
                if (newState.channelId === channelcreate) {
                    await guild.channels.create({
                        type: 2,
                        name: `${channelName}`,
                        parent: parent,
                        permissionOverwrites: [
                            {
                                id: newState.member.id,
                                allow: [Discord.PermissionFlagsBits.Connect,
                                Discord.PermissionFlagsBits.Speak,
                                Discord.PermissionFlagsBits.ViewChannel]
                            },
                            {
                                id: guild.roles.everyone,
                                allow: [Discord.PermissionFlagsBits.ViewChannel],
                                
                            },
                        ],
                    }).then(newChannel => {
                        newState.setChannel(newChannel);
                        newChannel.botCreated = true
                    })
                } else if (oldState.channelId && oldState.channelId !== channelcreate) {
                    const oldChannel = guild.channels.cache.get(oldState.channelId)
                    if (oldChannel.members.size === 0 && oldChannel.botCreated) {
                        oldChannel.delete()
                    }
                }
            })
        }
    })
}