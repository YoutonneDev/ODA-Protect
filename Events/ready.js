const Discord = require("discord.js");
const DBD = require("discord-dashboard");
const SoftUI = require("dbd-soft-ui");
const loadDatabase = require("../Loaders/loadDatabase");
const loadSlashCommands = require("../Loaders/loadSlashCommands");
const config = require("../config.json");


module.exports = async bot => {

    bot.db = await loadDatabase();
    bot.db.connect(function (err) {
        if (err) console.log(err)
        console.log("Base de données chargé avec sucess !")
    })


    console.log(`${bot.user.tag} est bien en ligne!`);

    /////////////////////////////////////////////////////// Dashboard //////////////////////////////////////////////////

    const Handler = new DBD.Handler();

    (async () => {
        let DBD = require('discord-dashboard');
        await DBD.useLicense(config.dbd.license);
        let { Category, Option } = Handler;
        DBD.Dashboard = DBD.UpdatedClass();
        let ownerIDs = ["1188840714520498257","918168105266606110"];

        const Dashboard = new DBD.Dashboard({
            port: 1033,
            client: config.discord.client,
            redirectUri: `${config.dbd.domain}${config.dbd.redirectUri}`,
            domain: config.dbd.domain,
            ownerIDs: ownerIDs,
            useThemeMaintenance: true,
            useTheme404: true,
            bot: bot,
            disableResolvingGuildCache: true,

            
            theme: SoftUI({
                storage: Handler,
                
                customThemeOptions: {
                    index: async ({ req, res, config }) => {
                        return {
                            values: [],
                            graph: {
                                values: [690, 524, 345, 645, 478, 592, 468, 783, 459, 230, 621, 345],
                                labels: ["1m", "2m", "3m", "4m", "5m", "6m", "7m", "8m", "9m", "10m"]
                            }, // More info at https://dbd-docs.assistantscenter.com/soft-ui/docs/customThemeOptions/
                            cards: [
                                {
                                    title: "user",
                                    icon: "single-02",
                                    getValue: `${bot.guilds.cache.reduce((a, b) => a + b.memberCount, 0)}`,
                                    progressBar: {
                                        enabled: false,
                                        getProgress: 50 // 0 - 100 (get a percentage of the progress)
                                    }
                                },
                                {
                                    title: "user",
                                    icon: `chart-bar-32`,
                                    getValue: `${bot.guilds.cache.size}`,
                                    progressBar: {
                                        enabled: true,
                                        getProgress: 10 // 0 - 100 (get a percentage of the progress)
                                    }
                                },
                                {
                                    title: "user",
                                    icon: "folder-17",
                                    getValue: `${bot.commands.size}`,
                                    progressBar: {
                                        enabled: false,
                                        getProgress: 50 // 0 - 100 (get a percentage of the progress)
                                    }
                                },
                              
                            ],
                        }
                    },
                },
                footer: {
                    replaceDefault: true,
                    text: "DashBoard  créer par Youtonne_dev"
                },

                locales: {
                    frFR: {
                        name: "Français",
                        index: {
                            feeds: ["Nombre d'utilisateur", "Nombre de serveurs", "Nombre de Commandes", "Utilisateurs Blacklists"],
                            card: {
                                image: "https://i.imgur.com/8CBTTju.png",
                                category: "TEAM ODA",
                                title: "ODA Protect",
                                description:
                                    `ODA signifie  Oxyfloz Dephiou et Alice le nom de la bien aimer de notre cher oxy ODA est un groupe de jeune apprenti développeur qui fait de son mieux chaque jour pour vous fournir des bot de meilleur qualité actuellement\n ODA a 2 projet en cours un bot d'auto modération gérer par @๖̶ζ͜͡OXYFLOZ  et développer par @Youtonne_Dev  et un bot de musique gère et développer part @Dephiou.\n\nLe Bot est en cours de développement merci de votre compréhension`,
                                footer: `Pour plus d'info, venez sur le discord\n https://discord.gg/JTtUD4kMat`
                            },
                            feedsTitle: "Nouveautées",
                            graphTitle: "Graphs"
                        },
                        manage: {
                            settings: {
                                memberCount: "Members",
                                info: {
                                    info: "Info",
                                    server: "Server Information",
                                    membre: "TEST"
                                }
                            },
                            title: "Vos Serveurs",
                            description: "Gérer vos serveurs",
                        },
                        admin: {
                            feeds: {
                                feedBuilder: "Annonces",
                                feedIcon: "Icone de l'annonce",
                                feedDescription: "Description de l'annonce",
                                feedColour: "Couleur de l'annonce",
                                colors: {
                                    pink: "Pink",
                                    red: "Red",
                                    orange: "Orange",
                                    green: "Green",
                                    gray: "Gray",
                                    blue: "Blue",
                                    dark: "Dark",
                                },
                                feedSubmit: "Envoyer",
                                feedFeedPreview: "Avant Première de votre annonce",
                                feedPreview: "Avant Première",
                                feedCurrent: "Annonces Actuelles",
                                feedShowIcons: "Montrer les logos",
                            },
                            admin: {
                                title: "Control Admin",
                                adminUpdates: "Verifier les Mis à jours",
                            },
                        },
                        guild: {
                            home: "Accueil",
                            settingsCategory: "Paramètres",
                            updates: {
                                title: "Changement(s) effectué !",
                                reset: "Reinitialiser",
                                save: "Sauvegarder",
                            },
                        },
                        privacyPolicy: {
                            title: "Politique de Confidentialité",
                            description: "Politique de confidentialité et conditions d'utilisation",
                            pp: `Nous sommes déterminés à respecter et à protéger votre vie privée. Cette politique de confidentialité explique comment nous recueillons, utilisons et protégeons les informations que vous nous fournissez lorsque vous utilisez notre bot de modération Discord.<br><br>Collecte d'informations<br>Lors de l'utilisation de notre bot de modération Discord, nous pouvons collecter les informations suivantes:<br>- Données de serveur Discord<br>-Identifiants d'utilisateur Discord<br>-Commandes et actions effectuées par le bot<br><br>Utilisation des informations<br>Nous utilisons les informations collectées pour:<br>-Fournir et améliorer nos services<br>-Personnaliser l'expérience de l'utilisateur<br>-Gérer et améliorer la sécurité du bot<br><br>Nous n'utilisons pas de cookies ni de technologies similaires pour collecter des informations.<br><br>Modification de la politique de confidentialité<br>Nous nous réservons le droit de mettre à jour cette politique de confidentialité à tout moment. Les modifications prendront effet immédiatement après leur publication sur cette page.<br><br>Si vous avez des questions ou des préoccupations concernant notre politique de confidentialité, veuillez nous contacter à ar.waege@icloud.com.`,
                        },
                        partials: {
                            sidebar: {
                                dash: "Panel de Gestion",
                                manage: "Gérer vos Serveurs",
                                commands: "Commandes",
                                events: "Events",
                                pp: "Politique de Confidentialité",
                                admin: "Accès Admin",
                                account: "Accès à votre Compte",
                                login: "Se Connecter",
                                logout: "Se Déconnecter"
                            },
                            navbar: {
                                home: "Accueil",
                                pages: {
                                    test: "TEST",
                                    manage: "Gérer vos Serveurs",
                                    settings: "Gérer vos Serveurs",
                                    commands: "Commandes",
                                    events: "Events",
                                    pp: "Politique de Confidentialité",
                                    admin: "Control Admin",
                                    error: "Error",
                                    credits: "Credits",
                                    debug: "Debug",
                                    leaderboard: "Leaderboard",
                                    profile: "Profile",
                                    maintenance: "Maintenance",
                                    pages: "Pages",
                                    dashboard: "Paramètres",

                                }
                            },
                            title: {
                                pages: {
                                    manage: "Gérer vos Serveurs",
                                    settings: "Gérer vos Serveurs",
                                    commands: "Commandes",
                                    events: "Events",
                                    pp: "Politique de Confidentialité",
                                    admin: "Control Admin",
                                    error: "Error",
                                    credits: "Credits",
                                    debug: "Debug",
                                    leaderboard: "Leaderboard",
                                    profile: "Profile",
                                    maintenance: "Maintenance"
                                }
                            },
                            preloader: {
                                text: "La Page est en cours de chargement..."
                            },
                            premium: {
                                title: "Premium ?",
                                description: "Vous voullez devenir premium pour obtenir plus d'avantage ? cliquez ci dessous pour obtenir plus d'avantage",
                                buttonText: "Devenir Premium"
                            },
                            settings: {
                                title: "Paramètres",
                                description: "Ci dessous choisissez vos paramètres !",
                                theme: {
                                    title: "Thème du site",
                                    description: "Faite en sorte que vous n'ayez pas mal au yeux !",
                                    dark: "Sombre",
                                    light: "Claire",
                                    auto: "Automatique"
                                },
                                language: {
                                    title: "Langue du site !",
                                    description: "Choisissez votre langue préférer"
                                }
                            }
                        }
                    }
                },

                websiteName: "ODA Protect",
                colorScheme: "blue",
                
                supporteMail: "ar.waege@icloud.com",
                icons: {
                    favicon: "https://i.imgur.com/CgaEwDH.jpg",
                    noGuildIcon: "https://i.imgur.com/CgaEwDH.jpg",
                    sidebar: {
                        darkUrl: "https://i.imgur.com/CgaEwDH.jpg",
                        lightUrl: "https://i.imgur.com/CgaEwDH.jpg",
                        hideName: true,
                        borderRadius: true,
                        alignCenter: true,
                    },
                },
                premium: {
                    enabled: true,
                    card: {
                        bgImage: "https://imgur.com/RvHOkvw.png",
                        button: {
                            text: "Devenir Premium",
                            url: "https://discord.gg/WJcTxk525Q"
                        }
                    }
                },
                preloader: {
                    image: "/img/soft-ui.webp",
                    spinner: false,
                    text: "La page est en cours de chargement",
                },
                index: {
                    graph: {
                        enabled: true,
                        lineGraph: false,
                        tag: 'Memory (MB)',
                        max: 100
                    },
                },
                sweetalert: {
                    errors: {
                        requirePremium: "Vous devez être un membre premium pour ce faire."
                    },
                    success: {
                        login: "Connecté avec succès."
                    }
                },
                preloader: {
                    image: "https://media.tenor.com/On7kvXhzml4AAAAi/loading-gif.gif",
                    spinner: false,
                    text: "La page est en cours de chargement",
                },
                admin: {
                    pterodactyl: {
                        enabled: false,
                        apiKey: "",
                        panelLink: "",
                        serverUUIDs: ['']
                    }
                },
                commands: [
//////////////////////////////////////////////////////////////////// exemple ////////////////////////////////////////////////////////////////////                  
                    //{
                    //    category: "category",
                    //    subTitle: "subTitle",
                    //    categoryId: "category-id", // No spaces or special characters
                    //    image: "<img src='link to image'>",
                    //    hideAlias: false, // Facultatif - Par défaut : false - Masque l'alias de toutes les commandes de la catégorie
                    //    hideDescription: false, // Facultatif - Par défaut : false - Masque la description de toutes les commandes de la catégorie
                    //    hideSidebarItem: false, // Facultatif - Par défaut : false - Masque la catégorie de la barre latérale
                    //    list: [
                    //        {
                    //            commandName: "cmdname",
                    //            commandUsage: "usage",
                    //            commandDescription: "Command description",
                    //            commandAlias: "alias"
                    //        }
                    //    ]
                    //},
                    {
                        category: "👮🏻‍♂️ Modérations",
                        subTitle: "Commandes de modération",
                        categoryId: "modo",
                        hideAlias: false,
                        hideDescription: false,
                        hideSidebarItem: false,
                        list: [
                            {
                                commandName: "Ban",
                                commandUsage: "/ban <membre> <raison>",
                                commandDescription: `Permet de bannir un membre du serveur discord`,
                                commandAlias: "/"
                            },
                            {
                                commandName: "Banlist",
                                commandUsage: "/banlist",
                                commandDescription: `Permet de voir les membres ban du serveur discord! est de les débannir via l'embed`,
                                commandAlias: "/"
                            },
                            {
                                commandName: "Kick",
                                commandUsage: "/kick <membre> <raison>",
                                commandDescription: `Permet de kick un membres du serveur discord!`,
                                commandAlias: "/"
                            },
                            {
                                commandName: "Mute",
                                commandUsage: "/mute <membre> <temp (s:m:d)> <raison>",
                                commandDescription: `Permet de Mute un membres du serveur discord!`,
                                commandAlias: "/"
                            },
                            {
                                commandName: "Unute",
                                commandUsage: "/unmute <membre> <raison>",
                                commandDescription: `Permet de Unmute un membres du serveur discord!`,
                                commandAlias: "/"
                            },
                            {
                                commandName: "Warn",
                                commandUsage: "/warn <membre> <raison>",
                                commandDescription: `Permet de warn un membre du serveur discord`,
                                commandAlias: "/"
                            },
                            {
                                commandName: "Warnlist",
                                commandUsage: "/warnlist <membre>",
                                commandDescription: `Permet de voir les warns d'un membre du serveur discord`,
                                commandAlias: "/"
                            },
                        ]
                    },
                    //////////////////////////////////////////////////////////////////// 🛡️ Administration ////////////////////////////////////////////////////////////////////                  
                    
                    {
                        category: "🛡️ Administration",
                        subTitle: "Commandes d'administrations",
                        categoryId: "admin",
                        hideAlias: false,
                        hideDescription: false,
                        hideSidebarItem: false,
                        list: [
                            {
                                commandName: "Clear",
                                commandUsage: "/clear <nombre> <raison>",
                                commandDescription: `Permet de vider les massages d'un salon`,
                                commandAlias: "/"
                            },
                            {
                                commandName: "Embed",
                                commandUsage: "/embedcreate",
                                commandDescription: `Permet de créer un embed envoyer par le bot`,
                                commandAlias: "/"
                            },
                            {
                                commandName: "Giveaway",
                                commandUsage: "/giveaway <temp (s:m:d)> <nombre de gagnant> <prix>",
                                commandDescription: `Permet de créer  un giveaway`,
                                commandAlias: "/"
                            },
                            {
                                commandName: "Lock",
                                commandUsage: "/lock <salon> <role>",
                                commandDescription: `Permet de verouiller un salon pour un role!`,
                                commandAlias: "/"
                            },
                            {
                                commandName: "UnLock",
                                commandUsage: "/unlock <salon> <role>",
                                commandDescription: `Permet de déverouiller un salon pour un role!`,
                                commandAlias: "/"
                            },
                            {
                                commandName: "Maintenace",
                                commandUsage: "/progress <pourcentage> <salon>",
                                commandDescription: `Permet dafficher une progresse bar de maintenance!`,
                                commandAlias: "/"
                            },
              
                            {
                                commandName: "slowmode",
                                commandUsage: "/slowmode <salon> <temp (s:m:d)>",
                                commandDescription: `Permet de metre un mode lent dans un salon!`,
                                commandAlias: "/"
                            },
                            {
                                commandName: "Ticket de recrutement",
                                commandUsage: "/ticketrecrute",
                                commandDescription: `Envoi l'embed des tickets de recrutement!`,
                                commandAlias: "/"
                            },
                            {
                                commandName: "Ticket de support",
                                commandUsage: "/ticketsupport ",
                                commandDescription: `Envoi l'embed des tickets de support!`,
                                commandAlias: "/"
                            },
                        ]
                    },


                ],
            }),
            settings: [
//-----------------------------------------------------------------------------------------------------------------------------  Système d'administration  -----------------------------------------------------------------------------------------------------------------------------

                {
                    categoryId: 'setup',
                    categoryName: "Administration du serveur",
                    categoryImageURL: 'https://imgur.com/H1rOahI.png',
                    categoryDescription: `Faire des paramètre de base de ${bot.user.username}`,
                    refreshOnSave: true,
                    categoryOptionsList: [
//////////////////////////////////////////////////////////////////// ETAT //////////////////////////////////////////////////////////////////

                        {
                            optionId: 'antiraid',
                            optionName: "Anti-Raid",
                            optionDescription: "Activer où supprimer l'AntiRaid !",
                            optionType: DBD.formTypes.switch(false),
                            getActualSet: async ({ guild, user }) => {
                                return new Promise(async (resolve, reject) => {
                                    bot.db.query(`SELECT * FROM server WHERE guild = '${guild.id}'`, async (err, req) => {
                                        if (req.length < 1) {
                                            resolve(false);
                                            return;
                                        }
                                        if (req[0].antiraid === 'true') {
                                            resolve(true);
                                            return;
                                        }
                                        if (req[0].antiraid === 'false') {
                                            resolve(false);
                                            return;
                                        }
                                    })
                                });
                            },
                            setNew: async ({ guild, user, newData }) => {
                                bot.db.query(`SELECT * FROM server WHERE guild = '${guild.id}'`, async (err, req) => {
                                    if (err) reject(err);
                                    if (req.length < 1) {
                                        return
                                    } else {
                                        const newValue = newData ? 'true' : 'false';
                                        bot.db.query(`UPDATE server SET antiraid = '${newValue}' WHERE guild = '${guild.id}'`)
                                    }
                                })
                            },
                        },
                    ]
                },
//-----------------------------------------------------------------------------------------------------------------------------  Système de captcha  -----------------------------------------------------------------------------------------------------------------------------

                {
                    categoryId: 'captcha',
                    categoryName: "Système de captcha",
                    categoryImageURL: 'https://imgur.com/A1TJkQW.png',
                    categoryDescription: `Configurer vos Départ pour ${bot.user.username}`,
                    refreshOnSave: true,
                    categoryOptionsList: [
                        {
                            optionId: 'embedoucanvas',
                            optionName: "Captcha", 
                            optionDescription: "Si vous voulez activé le captcha sur votre serveur il vous faudra activé le bouton ci-dessous, sinon il vous faudra desactiver.",
                            optionType: DBD.formTypes.switch(false),
                            getActualSet: async ({ guild, user }) => {
                                return new Promise(async (resolve, reject) => {
                                    bot.db.query(`SELECT * FROM captcha WHERE guildId  = '${guild.id}'`, async (err, req) => {
                                        if (req.length < 1) {
                                            resolve(false);
                                            return;
                                        }
                                        if (req[0].etat === 'true') {
                                            resolve(true);
                                            return;
                                        }
                                        if (req[0].etat === 'false') {
                                            resolve(false);
                                            return;
                                        }
                                        const SAVED_STATE = null;
                                        resolve(SAVED_STATE);
                                    })    
                                });
                            },
                            setNew: async ({ guild, newData }) => {
                                bot.db.query(`SELECT * FROM captcha WHERE guildId  = '${guild.id}'`, async (err, req) => {
                                    if (req.length < 1) {
                                    } else {
                                        if (newData === true) {
                                            bot.db.query(`UPDATE captcha SET etat = 'true' WHERE guildId = '${guild.id}'`)
                                        }
                                        if (newData === false) {
                                            bot.db.query(`UPDATE captcha SET etat = 'false' WHERE guildId = '${guild.id}'`)
                                        }
                                    }
                                })
                            },
                        },
//////////////////////////////////////////////////////////////////// Captcha channel //////////////////////////////////////////////////////////////////

                        {
                            optionId: 'captcha_channel',
                            optionName: "Captcha channel",
                            optionDescription: "Choisissez le channel pour l'envois du captcha si vous ne souaitez pas avoir de capchat metre le '_'",
                            optionType: DBD.formTypes.channelsSelect(false, [0]),
                            getActualSet: async ({ guild }) => {
                                return new Promise(async (resolve, reject) => {
                                    bot.db.query(`SELECT * FROM captcha WHERE guildId  = '${guild.id}'`, async (err, req) => {
                                        if (err) reject(err);
                                        if (req.length < 1) {
                                            resolve(false);
                                            return;
                                        }
                                        if (req[0].channelId !== 'false') {
                                            resolve(req[0].channelId)
                                            return;
                                        }
                                        const SAVED_STATE = null;
                                        resolve(SAVED_STATE)
                                    })
                                })
                            },
                            setNew: async ({ guild, newData }) => {
                               
                                bot.db.query(`SELECT * FROM captcha WHERE guildId  = '${guild.id}'`, async (err, req) => {
                                    if (req.length < 1) {
                                        bot.db.query(`INSERT INTO captcha (guildId , etat, channelId, roleId) VALUES ('${guild.id}', 'false', '${newData}', 'false')`)
                                    } else {
                                        if (newData === '') {
                                            bot.db.query(`UPDATE captcha SET channelId = 'false' WHERE guildId = '${guild.id}'`)
                                        } else {
                                            bot.db.query(`UPDATE captcha SET channelId = '${newData}' WHERE guildId = '${guild.id}'`)
                                        }
                                    }
                                })
                            }
                        },
//////////////////////////////////////////////////////////////////// Captcha role //////////////////////////////////////////////////////////////////
                        {
                            optionId: 'captcha_role',
                            optionName: "Captcha role",
                            optionDescription: "Selectionnez un role à donner une fois le captcha réussi.",
                            optionType: DBD.formTypes.rolesSelect(false),
                            getActualSet: async ({ guild }) => {
                                return new Promise(async (resolve, reject) => {
                                    bot.db.query(`SELECT * FROM captcha WHERE guildId = '${guild.id}'`, async (err, req) => {
                                        if (err) reject(err);
                                        if (req.length < 1) {
                                            resolve(false);
                                            return;
                                        }
                                        if (req[0].roleId !== 'false') {
                                            resolve(req[0].roleId)
                                            return;
                                        }
                                        const SAVED_STATE = null;
                                        resolve(SAVED_STATE)
                                    })
                                })
                            },
                            setNew: async ({ guild, newData }) => {
                                bot.db.query(`SELECT * FROM captcha WHERE guildId = '${guild.id}'`, async (err, req) => {
                                    if (req.length < 1) {
                                        bot.db.query(`INSERT INTO captcha (guildId , etat, channelId, roleId) VALUES ('${guild.id}', 'false', 'false', '${newData}')`)
                                    } else {
                                        if (newData === '') {
                                            bot.db.query(`UPDATE captcha SET roleId = 'false' WHERE guildId = '${guild.id}'`)
                                        } else {
                                            bot.db.query(`UPDATE captcha SET roleId = '${newData}' WHERE guildId  = '${guild.id}'`)
                                        }
                                    }
                                })
                            }
                        },
                    ]
                },
//-----------------------------------------------------------------------------------------------------------------------------  Système de Bienvenue  -----------------------------------------------------------------------------------------------------------------------------
                
                { 
                    categoryId: 'welcome',
                    categoryName: "Système de Bienvenue",
                    categoryImageURL: 'https://imgur.com/3ymPBqa.png',
                    categoryDescription: `Configurer votre Bienvenue sur ${bot.user.username}`,
                    refreshOnSave: true,
                    categoryOptionsList: [
//////////////////////////////////////////////////////////////////// Salon de bienvenue //////////////////////////////////////////////////////////////////

                        {
                            optionId: 'welcome_channel',
                            optionName: "Salon de bienvenue",
                            optionDescription: "Sélectionnez le canal de message de bienvenue sur cette guilde.",
                            optionType: DBD.formTypes.channelsSelect(false, [0]),
                            getActualSet: async ({ guild }) => {
                                return new Promise(async (resolve, reject) => {
                                    bot.db.query(`SELECT * FROM welcome WHERE guildID = '${guild.id}'`, async (err, req) => {
                                        if (req.length < 1) {
                                            resolve(false);
                                            return;
                                        }
                                        if (req[0].channelId !== 'false') {
                                            resolve(req[0].channelId)
                                            return;
                                        }
                                        const SAVED_STATE = null;
                                        resolve(SAVED_STATE)
                                    })
                                })
                            },
                            setNew: async ({ guild, newData }) => {
                                bot.db.query(`SELECT * FROM welcome WHERE guildID = '${guild.id}'`, async (err, req) => {
                                    if (req.length < 1) {
                                        bot.db.query(`INSERT INTO welcome (guildID, channelId, welcomeMessage, roleId) VALUES ('${guild.id}', 'false', 'false', '${newData}')`)
                                    } else {
                                        if (newData === '') {
                                            bot.db.query(`UPDATE welcome SET channelId = 'false' WHERE guildID = '${guild.id}'`)
                                        } else {
                                            bot.db.query(`UPDATE welcome SET channelId = '${newData}' WHERE guildID = '${guild.id}'`)
                                        }
                                    }
                                })
                            }
                        },
//////////////////////////////////////////////////////////////////// Message de bienvenue //////////////////////////////////////////////////////////////////

                        {
                            optionId: 'longtext',
                            optionName: "Message de bienvenue",
                            optionDescription: `Définir un message lors de l'adhésion d'un membre.<br>- Pour metre le nom du membre = {user}<br> - Pour metre le nom du serveur = {server}<br>- Pour metre le nombre de membre = {count}`,
                            optionType: DBD.formTypes.textarea("Définir un message lors de l'adhésion d'un membre...", null, 2000, false, false), // reqired false (if empty reset to default)
                            getActualSet: async ({ guild }) => {
                                return new Promise(async (resolve, reject) => {
                                    bot.db.query(`SELECT * FROM welcome WHERE guildID = '${guild.id}'`, async (err, req) => {
                                        if (req.length < 1) {
                                            resolve(false);
                                            return;
                                        }
                                        if (req[0].welcomeMessage !== 'false') {
                                            resolve(req[0].welcomeMessage)
                                            return;
                                        }
                                        const SAVED_STATE = null;
                                        resolve(SAVED_STATE)
                                    })
                                })
                            },
                            setNew: async ({ guild, newData }) => {
                                const ABC = newData.replace(/'/g, "\\'")
                                bot.db.query(`SELECT * FROM welcome WHERE guildID = '${guild.id}'`, async (err, req) => {
                                    if (req.length < 1) {
                                        bot.db.query(`INSERT INTO welcome (guildID, channelId, welcomeMessage, 	roleId) VALUES  ('${guild.id}', 'false', '${ABC}', 'false')`)
                                    } else {
                                        if (newData === '') {
                                            bot.db.query(`UPDATE welcome SET welcomeMessage = 'false' WHERE guildID = '${guild.id}'`)
                                        } else {
                                            bot.db.query(`UPDATE welcome SET welcomeMessage = '${ABC}' WHERE guildID = '${guild.id}'`)
                                        }
                                    }
                                })
                            }
                        },
//////////////////////////////////////////////////////////////////// Role d'arrivé //////////////////////////////////////////////////////////////////
                        {
                            optionId: 'welcome_role',
                            optionName: "Role d'arrivé",
                            optionDescription: "Selectionnez un role à donner une fois arrivé sur le serveur.",
                            optionType: DBD.formTypes.rolesSelect(false),
                            getActualSet: async ({ guild }) => {
                                return new Promise(async (resolve, reject) => {
                                    bot.db.query(`SELECT * FROM welcome WHERE guildId = '${guild.id}'`, async (err, req) => {
                                        if (err) reject(err);
                                        if (req.length < 1) {
                                            resolve(false);
                                            return;
                                        }
                                        if (req[0].roleId !== 'false') {
                                            resolve(req[0].roleId)
                                            return;
                                        }
                                        const SAVED_STATE = null;
                                        resolve(SAVED_STATE)
                                    })
                                })
                            },
                            setNew: async ({ guild, newData }) => {
                                bot.db.query(`SELECT * FROM welcome WHERE guildId = '${guild.id}'`, async (err, req) => {
                                    if (req.length < 1) {
                                        bot.db.query(`INSERT INTO welcome (guildID, channelId, welcomeMessage, 	roleId) VALUES  ('${guild.id}', 'false', 'false', '${newData}')`)
                                    } else {
                                        if (newData === '') {
                                            bot.db.query(`UPDATE welcome SET roleId = 'false' WHERE guildId = '${guild.id}'`)
                                        } else {
                                            bot.db.query(`UPDATE welcome SET roleId = '${newData}' WHERE guildId  = '${guild.id}'`)
                                        }
                                    }
                                })
                            }
                        },
                        
                    ]
                },
//-----------------------------------------------------------------------------------------------------------------------------  Système d'Experience  -----------------------------------------------------------------------------------------------------------------------------
                
                {
                    categoryId: 'experiences',
                    categoryName: "Système d'Experience",
                    categoryImageURL: 'https://imgur.com/v4swDCU.png',
                    categoryDescription: `Configurer le sytème d'experience du bot ${bot.user.username}`,
                    refreshOnSave: true,
                    categoryOptionsList: [
//////////////////////////////////////////////////////////////////// ETAT  //////////////////////////////////////////////////////////////////
                        {
                            optionId: 'onouoff',
                            optionName: "Activation du système d'experience",
                            optionDescription: "Si vous voulez activer le système d'experience sur votre serveur il vous faudra activer le bouton ci-dessous, sinon il vous faudra desactiver.",
                            optionType: DBD.formTypes.switch(false),
                            getActualSet: async ({ guild, user }) => {
                                return new Promise(async (resolve, reject) => {
                                    bot.db.query(`SELECT * FROM exp WHERE guildId = '${guild.id}'`,  async (err, req) => {
                                        if (req.length < 1) {
                                            resolve(false);
                                            return;
                                        }
                                        if (req[0].etat === 'true') {
                                            resolve(true);
                                            return;
                                        }
                                        if (req[0].etat === 'false') {
                                            resolve(false);
                                            return;
                                        }
                                        const SAVED_STATE = null;
                                        resolve(SAVED_STATE);
                                    });
                                })
                            },
                            setNew: async ({ guild, newData }) => {
                                bot.db.query(`SELECT * FROM exp WHERE guildId = '${guild.id}'`, async (err, req) => {
                                    if (req.length < 1) {
                                        if(newData === true) {
                                            bot.db.query(`INSERT INTO exp (guildId, etat, channelId, canvas) VALUE ('${guild.id}', 'true', 'false', 'true')`)
                                        } else {
                                            bot.db.query(`INSERT INTO exp (guildId, etat, channelId, canvas) VALUE ('${guild.id}', 'false', 'false', 'true')`)
                                        }
                                    } else {
                                        if (newData === true) {
                                            bot.db.query(`UPDATE exp SET etat = 'true' WHERE guildId = '${guild.id}'`)
                                        }
                                        if (newData === false) {
                                            bot.db.query(`UPDATE exp SET etat = 'false' WHERE guildId = '${guild.id}'`)
                                        }
                                    }
                                })
                            },
                        },
//////////////////////////////////////////////////////////////////// CHANNEL RANK //////////////////////////////////////////////////////////////////
                        {
                            optionId: 'level_channel',
                            optionName: "Salon de niveau",
                            optionDescription: "Choisissez le channel pour l'envois des messages de niveaux.",
                            optionType: DBD.formTypes.channelsSelect(false, [0]),
                            getActualSet: async ({ guild }) => {
                                return new Promise(async (resolve, reject) => {
                                    bot.db.query(`SELECT * FROM exp WHERE guildId = '${guild.id}'`,  async (err, req) => {
                                        if (req.length < 1) {
                                            resolve(false);
                                            return;
                                        }
                                        if (req[0].channelId !== 'false') {
                                            resolve(req[0].channelId)
                                            return;
                                        }
                                        const SAVED_STATE = null;
                                        resolve(SAVED_STATE)
                                    })
                                })
                            },
                            setNew: async ({ guild, newData }) => {
                                bot.db.query(`SELECT * FROM exp WHERE guildId = '${guild.id}'`, async (err, req) => {
                                    if (req.length < 1) {
                                        bot.db.query(`INSERT INTO exp (guildId, etat, channelId, canvas) VALUE ('${guild.id}', 'false', '${newData}', 'true')`)
                                    } else {
                                        if (newData === '') {
                                            //db.update('exp', 'channelId', 'false', 'guildId', guild.id)
                                            bot.db.query(`UPDATE exp SET channelId = 'false' WHERE guildId = '${guild.id}'`)
                                        } else {
                                            //db.update('exp', 'channelId', newData, 'guildId', guild.id)
                                            bot.db.query(`UPDATE exp SET channelId = '${newData}' WHERE guildId = '${guild.id}'`)
                                        }
                                    }
                                })
                            },  
                        },
//////////////////////////////////////////////////////////////////// CHOIX MESSAGE //////////////////////////////////////////////////////////////////
                        {
                            optionId: 'embedoucanvas',
                            optionName: "Choix Du Message",
                            optionDescription: "Si vous voulez le message de niveau en canvas coché ci dessous sinon le message sera en embed.",
                            optionType: DBD.formTypes.switch(false),
                            getActualSet: async ({ guild, user }) => {
                                return new Promise(async (resolve, reject) => {
                                    bot.db.query(`SELECT * FROM exp WHERE guildId = '${guild.id}'`,  async (err, req) => {
                                        if (req.length < 1) {
                                            resolve(false);
                                            return;
                                        }
                                        if (req[0].canvas === 'true') {
                                            resolve(true);
                                            return;
                                        }
                                        if (req[0].canvas === 'false') {
                                            resolve(false);
                                            return;
                                        }
                                        const SAVED_STATE = null;
                                        resolve(SAVED_STATE);
                                    })
                                });
                            },
                            setNew: async ({ guild, newData }) => {
                                bot.db.query(`SELECT * FROM exp WHERE guildId = '${guild.id}'`,  async (err, req) => {
                                    if (req.length < 1) {
                                    } else {
                                        if (newData === true) {
                                            //db.update('exp', 'canvas', 'true', 'guildId', guild.id)
                                            bot.db.query(`UPDATE exp SET canvas = 'true' WHERE guildId = '${guild.id}'`)
                                        }
                                        if (newData === false) {
                                            //db.update('exp', 'canvas', 'false', 'guildId', guild.id)
                                            bot.db.query(`UPDATE exp SET canvas = 'false' WHERE guildId = '${guild.id}'`)
                                        }
                                    }
                                })
                            },
                        },
                    ]
                },
//-----------------------------------------------------------------------------------------------------------------------------  Création de vocal  -----------------------------------------------------------------------------------------------------------------------------

                {
                    categoryId: 'Ccreatevoc',
                    categoryName: "Création de vocal",
                    categoryImageURL: 'https://i.imgur.com/lYdGIDE.png',
                    categoryDescription: `Configurer le sytème de vocal du bot ${bot.user.username}`,
                    refreshOnSave: true,
                    categoryOptionsList: [
//////////////////////////////////////////////////////////////////// VOCAL HUB //////////////////////////////////////////////////////////////////
                        {
                            optionId: 'vocal_channel',
                            optionName: "Vocal de creation",
                            optionDescription: "Choisissez le channel pour la creation du vocal, si vous ne souaitez pas avoir de capchat metre le '_'",
                            optionType: DBD.formTypes.channelsSelect(false, [2]),
                            getActualSet: async ({ guild }) => {
                                return new Promise(async (resolve, reject) => {
                                    bot.db.query(`SELECT * FROM privatevoc WHERE guildID  = '${guild.id}'`, async (err, req) => {
                                        if (err) reject(err);
                                        if (req.length < 1) {
                                            resolve(false);
                                            return;
                                        }
                                        if (req[0].channelID !== 'false') {
                                            resolve(req[0].channelID)
                                            return;
                                        }
                                        const SAVED_STATE = null;
                                        resolve(SAVED_STATE)
                                    })
                                })
                            },
                            setNew: async ({ guild, newData, NewCategory }) => {
                               
                               bot.db.query(`SELECT * FROM privatevoc WHERE guildID = '${guild.id}'`, async (err, req) => {
                                    if (req.length < 1) {
                                         bot.db.query(`INSERT INTO privatevoc (guildID, categoryID, channelID) VALUE ('${guild.id}', 'false', 'false')`)
                                    } else {
                                        if (newData === '') {
                                            bot.db.query(`UPDATE privatevoc SET channelID = 'false' WHERE guildID = '${guild.id}'`)
                                        } else {
                                            bot.db.query(`UPDATE privatevoc SET channelID = '${newData}' WHERE guildID = '${guild.id}'`)
                                        }
                                    }
                                })
                            }
                        },
                    ]   
                },
//-----------------------------------------------------------------------------------------------------------------------------  Système de logs  -----------------------------------------------------------------------------------------------------------------------------


                {
                    categoryId: 'logs',
                    categoryName: "Système de logs",
                    categoryImageURL: '',
                    categoryDescription: `Configurer votre système de log pour sur votre serveur !`,
                    refreshOnSave: true,
                    categoryOptionsList: [
//////////////////////////////////////////////////////////////////// LOGS MESSAGE //////////////////////////////////////////////////////////////////                        
                        {
                            optionId: 'message_logs',
                            optionName: "Logs Messages",
                            optionDescription: "Choisissez le channel pour l'envois des messages logs.",
                            optionType: DBD.formTypes.channelsSelect(false, [0]),
                            getActualSet: async ({ guild }) => {
                                return new Promise(async (resolve, reject) => {
                                    bot.db.query(`SELECT * FROM logs WHERE guildID = '${guild.id}'`,  async (err, req) => {
                                        if (req.length < 1) {
                                            resolve(false);
                                            return;
                                        }
                                        if (req[0].messageID !== 'false') {
                                            resolve(req[0].messageID)
                                            return;
                                        }
                                        const SAVED_STATE = null;
                                        resolve(SAVED_STATE)
                                    })
                                })
                            },
                            setNew: async ({ guild, newData }) => {
                                bot.db.query(`SELECT * FROM logs WHERE guildID = '${guild.id}'`, async (err, req) => {
                                    if (req.length < 1) {
                                        bot.db.query(`INSERT INTO logs (guildID, messageID, roleID, leaveID, joinID, banID, warnID, botID) VALUE ('${guild.id}', '${newData}', 'false', 'false', 'false', 'false', 'false', 'false')`)
                                    } else {
                                        if (newData === '') {
                                            //db.update('exp', 'channelId', 'false', 'guildId', guild.id)
                                            bot.db.query(`UPDATE logs SET messageID = 'false' WHERE guildID = '${guild.id}'`)
                                        } else {
                                            //db.update('exp', 'channelId', newData, 'guildId', guild.id)
                                            bot.db.query(`UPDATE logs SET messageID = '${newData}' WHERE guildID = '${guild.id}'`)
                                        }
                                    }
                                })
                            },  
                        },
//////////////////////////////////////////////////////////////////// LOGS ROLE //////////////////////////////////////////////////////////////////
                        {
                            optionId: 'roles_logs',
                            optionName: "Logs Roles",
                            optionDescription: "Choisissez le channel pour l'envois des roles logs.",
                            optionType: DBD.formTypes.channelsSelect(false, [0]),
                            getActualSet: async ({ guild }) => {
                                return new Promise(async (resolve, reject) => {
                                    bot.db.query(`SELECT * FROM logs WHERE guildID = '${guild.id}'`,  async (err, req) => {
                                        if (req.length < 1) {
                                            resolve(false);
                                            return;
                                        }
                                        if (req[0].roleID !== 'false') {
                                            resolve(req[0].roleID)
                                            return;
                                        }
                                        const SAVED_STATE = null;
                                        resolve(SAVED_STATE)
                                    })
                                })
                            },
                            setNew: async ({ guild, newData }) => {
                                bot.db.query(`SELECT * FROM logs WHERE guildID = '${guild.id}'`, async (err, req) => {
                                    if (req.length < 1) {
                                        bot.db.query(`INSERT INTO logs (guildID, messageID, roleID, leaveID, joinID, banID, warnID, botID) VALUE ('${guild.id}', 'false', '${newData}', 'false', 'false', 'false', 'false', 'false')`)
                                    } else {
                                        if (newData === '') {
                                            //db.update('exp', 'channelId', 'false', 'guildId', guild.id)
                                            bot.db.query(`UPDATE logs SET roleID = 'false' WHERE guildID = '${guild.id}'`)
                                        } else {
                                            //db.update('exp', 'channelId', newData, 'guildId', guild.id)
                                            bot.db.query(`UPDATE logs SET roleID = '${newData}' WHERE guildID = '${guild.id}'`)
                                        }
                                    }
                                })
                            },  
                        },
//////////////////////////////////////////////////////////////////// LOGS JOIN //////////////////////////////////////////////////////////////////
                        {
                            optionId: 'join_logs',
                            optionName: "Logs d'arrivé",
                            optionDescription: "Choisissez le channel pour l'envois des logs d'arrivé.",
                            optionType: DBD.formTypes.channelsSelect(false, [0]),
                            getActualSet: async ({ guild }) => {
                                return new Promise(async (resolve, reject) => {
                                    bot.db.query(`SELECT * FROM logs WHERE guildID = '${guild.id}'`,  async (err, req) => {
                                        if (req.length < 1) {
                                            resolve(false);
                                            return;
                                        }
                                        if (req[0].joinID !== 'false') {
                                            resolve(req[0].joinID)
                                            return;
                                        }
                                        const SAVED_STATE = null;
                                        resolve(SAVED_STATE)
                                    })
                                })
                            },
                            setNew: async ({ guild, newData }) => {
                                bot.db.query(`SELECT * FROM logs WHERE guildID = '${guild.id}'`, async (err, req) => {
                                    if (req.length < 1) {
                                        bot.db.query(`INSERT INTO logs (guildID, messageID, roleID, leaveID, joinID, banID, warnID, botID) VALUE ('${guild.id}', 'false', 'false', 'false', '${newData}', 'false', 'false', 'false')`)
                                    } else {
                                        if (newData === '') {
                                            //db.update('exp', 'channelId', 'false', 'guildId', guild.id)
                                            bot.db.query(`UPDATE logs SET joinID = 'false' WHERE guildID = '${guild.id}'`)
                                        } else {
                                            //db.update('exp', 'channelId', newData, 'guildId', guild.id)
                                            bot.db.query(`UPDATE logs SET joinID = '${newData}' WHERE guildID = '${guild.id}'`)
                                        }
                                    }
                                })
                            },  
                        },
//////////////////////////////////////////////////////////////////// LOGS LEFT //////////////////////////////////////////////////////////////////
                        {
                            optionId: 'left_logs',
                            optionName: "Logs de départ",
                            optionDescription: "Choisissez le channel pour l'envois des logs de départ.",
                            optionType: DBD.formTypes.channelsSelect(false, [0]),
                            getActualSet: async ({ guild }) => {
                                return new Promise(async (resolve, reject) => {
                                    bot.db.query(`SELECT * FROM logs WHERE guildID = '${guild.id}'`,  async (err, req) => {
                                        if (req.length < 1) {
                                            resolve(false);
                                            return;
                                        }
                                        if (req[0].leaveID !== 'false') {
                                            resolve(req[0].leaveID)
                                            return;
                                        }
                                        const SAVED_STATE = null;
                                        resolve(SAVED_STATE)
                                    })
                                })
                            },
                            setNew: async ({ guild, newData }) => {
                                bot.db.query(`SELECT * FROM logs WHERE guildID = '${guild.id}'`, async (err, req) => {
                                    if (req.length < 1) {
                                        bot.db.query(`INSERT INTO logs (guildID, messageID, roleID, leaveID, joinID, banID, warnID, botID) VALUE ('${guild.id}', 'false', 'false', '${newData}', 'false', 'false', 'false', 'false')`)
                                    } else {
                                        if (newData === '') {
                                            //db.update('exp', 'channelId', 'false', 'guildId', guild.id)
                                            bot.db.query(`UPDATE logs SET leaveID = 'false' WHERE guildID = '${guild.id}'`)
                                        } else {
                                            //db.update('exp', 'channelId', newData, 'guildId', guild.id)
                                            bot.db.query(`UPDATE logs SET leaveID = '${newData}' WHERE guildID = '${guild.id}'`)
                                        }
                                    }
                                })
                            },  
                        },
//////////////////////////////////////////////////////////////////// LOGS BAN //////////////////////////////////////////////////////////////////
                        {
                            optionId: 'ban_logs',
                            optionName: "Logs des bans",
                            optionDescription: "Choisissez le channel pour l'envois des logs de ban.",
                            optionType: DBD.formTypes.channelsSelect(false, [0]),
                            getActualSet: async ({ guild }) => {
                                return new Promise(async (resolve, reject) => {
                                    bot.db.query(`SELECT * FROM logs WHERE guildID = '${guild.id}'`,  async (err, req) => {
                                        if (req.length < 1) {
                                            resolve(false);
                                            return;
                                        }
                                        if (req[0].banID !== 'false') {
                                            resolve(req[0].banID)
                                            return;
                                        }
                                        const SAVED_STATE = null;
                                        resolve(SAVED_STATE)
                                    })
                                })
                            },
                            setNew: async ({ guild, newData }) => {
                                bot.db.query(`SELECT * FROM logs WHERE guildID = '${guild.id}'`, async (err, req) => {
                                    if (req.length < 1) {
                                        bot.db.query(`INSERT INTO logs (guildID, messageID, roleID, leaveID, joinID, banID, warnID, botID) VALUE ('${guild.id}', 'false', 'false', 'false', 'false', '${newData}', 'false', 'false')`)
                                    } else {
                                        if (newData === '') {
                                            //db.update('exp', 'channelId', 'false', 'guildId', guild.id)
                                            bot.db.query(`UPDATE logs SET banID = 'false' WHERE guildID = '${guild.id}'`)
                                        } else {
                                            //db.update('exp', 'channelId', newData, 'guildId', guild.id)
                                            bot.db.query(`UPDATE logs SET banID = '${newData}' WHERE guildID = '${guild.id}'`)
                                        }
                                    }
                                })
                            },  
                        },
//////////////////////////////////////////////////////////////////// LOGS WARN //////////////////////////////////////////////////////////////////
                        {
                            optionId: 'warn_logs',
                            optionName: "Logs des warn",
                            optionDescription: "Choisissez le channel pour l'envois des logs de warn.",
                            optionType: DBD.formTypes.channelsSelect(false, [0]),
                            getActualSet: async ({ guild }) => {
                                return new Promise(async (resolve, reject) => {
                                    bot.db.query(`SELECT * FROM logs WHERE guildID = '${guild.id}'`,  async (err, req) => {
                                        if (req.length < 1) {
                                            resolve(false);
                                            return;
                                        }
                                        if (req[0].warnID !== 'false') {
                                            resolve(req[0].warnID)
                                            return;
                                        }
                                        const SAVED_STATE = null;
                                        resolve(SAVED_STATE)
                                    })
                                })
                            },
                            setNew: async ({ guild, newData }) => {
                                bot.db.query(`SELECT * FROM logs WHERE guildID = '${guild.id}'`, async (err, req) => {
                                    if (req.length < 1) {
                                        bot.db.query(`INSERT INTO logs (guildID, messageID, roleID, leaveID, joinID, banID, warnID, botID) VALUE ('${guild.id}', 'false', 'false', 'false', 'false', 'false', '${newData}', 'false')`)
                                    } else {
                                        if (newData === '') {
                                            //db.update('exp', 'channelId', 'false', 'guildId', guild.id)
                                            bot.db.query(`UPDATE logs SET warnID = 'false' WHERE guildID = '${guild.id}'`)
                                        } else {
                                            //db.update('exp', 'channelId', newData, 'guildId', guild.id)
                                            bot.db.query(`UPDATE logs SET warnID = '${newData}' WHERE guildID = '${guild.id}'`)
                                        }
                                    }
                                })
                            },  
                        },
//////////////////////////////////////////////////////////////////// LOGS MUTE //////////////////////////////////////////////////////////////////
                        {
                            optionId: 'bot_logs',
                            optionName: "Logs du bot",
                            optionDescription: "Choisissez le channel pour l'envois des logs des information du bot.",
                            optionType: DBD.formTypes.channelsSelect(false, [0]),
                            getActualSet: async ({ guild }) => {
                                return new Promise(async (resolve, reject) => {
                                    bot.db.query(`SELECT * FROM logs WHERE guildID = '${guild.id}'`,  async (err, req) => {
                                        if (req.length < 1) {
                                            resolve(false);
                                            return;
                                        }
                                        if (req[0].botID !== 'false') {
                                            resolve(req[0].botID)
                                            return;
                                        }
                                        const SAVED_STATE = null;
                                        resolve(SAVED_STATE)
                                    })
                                })
                            },
                            setNew: async ({ guild, newData }) => {
                                bot.db.query(`SELECT * FROM logs WHERE guildID = '${guild.id}'`, async (err, req) => {
                                    if (req.length < 1) {
                                        bot.db.query(`INSERT INTO logs (guildID, messageID, roleID, leaveID, joinID, banID, warnID, botID) VALUE ('${guild.id}', 'false', 'false', 'false', 'false', 'false', 'false', '${newData}')`)
                                    } else {
                                        if (newData === '') {
                                            //db.update('exp', 'channelId', 'false', 'guildId', guild.id)
                                            bot.db.query(`UPDATE logs SET botID = 'false' WHERE guildID = '${guild.id}'`)
                                        } else {
                                            //db.update('exp', 'channelId', newData, 'guildId', guild.id)
                                            bot.db.query(`UPDATE logs SET botID = '${newData}' WHERE guildID = '${guild.id}'`)
                                        }
                                    }
                                })
                            },  
                        },
                    ]
                },


                //{
                //    categoryId: 'goodbye',
                //    categoryName: "Système de Départ",
                //    categoryImageURL: 'https://imgur.com/3ymPBqa.png',
                //    categoryDescription: `Configurer vos Départ pour ${bot.user.username}`,
                //    refreshOnSave: true,
                //    categoryOptionsList: [
                //        {
                //            optionId: 'goodbye_channel',
                //            optionName: "GoodBye channel",
                //            optionDescription: "Select goodbye message channel on this guild.",
                //            optionType: DBD.formTypes.channelsSelect(false, [0]),
                //            getActualSet: async ({ guild }) => {
                //                return new Promise(async (resolve, reject) => {
                //                    const req = await db.select('goodbye', 'guildId', guild.id)
                //                    if (req.length < 1) {
                //                        resolve(false);
                //                        return;
                //                    }
                //                    if (req[0].channelId !== 'false') {
                //                        resolve(req[0].channelId)
                //                        return;
                //                    }
                //                    const SAVED_STATE = null;
                //                    resolve(SAVED_STATE)
                //                })
                //            },
                //            setNew: async ({ guild, newData }) => {
                //                const req = await db.select('goodbye', 'guildId', guild.id)
                //                if (req.length < 1) {
                //                    db.insert('goodbye', ['guildId', 'channelId', 'goodbyeMessage', 'roleId'], [guild.id, newData, 'false', 'false'])
                //                } else {
                //                    if (newData === '') {
                //                        db.update('goodbye', 'channelId', 'false', 'guildId', guild.id)
                //                    } else {
                //                        db.update('goodbye', 'channelId', newData, 'guildId', guild.id)
                //                    }
                //                }
                //            }
                //        },
                //        {
                //            optionId: 'longtext',
                //            optionName: "Message on member leave.",
                //            optionDescription: "Set message on member leave.",
                //            optionType: DBD.formTypes.textarea('Set message on member leave...', null, 2000, false, false), // reqired false (if empty reset to default)
                //            getActualSet: async ({ guild }) => {
                //                return new Promise(async (resolve, reject) => {
                //                    const req = await db.select('goodbye', 'guildId', guild.id)
                //                    if (req.length < 1) {
                //                        resolve(false);
                //                        return;
                //                    }
                //                    if (req[0].goodbyeMessage !== 'false') {
                //                        resolve(req[0].goodbyeMessage)
                //                        return;
                //                    }
                //                    const SAVED_STATE = null;
                //                    resolve(SAVED_STATE)
                //                })
                //            },
                //            setNew: async ({ guild, newData }) => {
                //                const ABC = newData.replace(/'/g, "\\'")
                //                const req = await db.select('goodbye', 'guildId', guild.id)
                //                if (req.length < 1) {
                //                    db.insert('goodbye', ['guildId', 'channelId', 'goodbyeMessage', 'roleId'], [guild.id, 'false', ABC, 'false'])
                //                } else {
                //                    if (newData === '') {
                //                        db.update('goodbye', 'goodbyeMessage', 'false', 'guildId', guild.id)
                //                    } else {
                //                        db.update('goodbye', 'goodbyeMessage', ABC, 'guildId', guild.id)
                //                    }
                //                }
                //            }
                //        },
                //    ],
                //}

            ],
        });
        Dashboard.init();
    })();
}


