////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////       CREATE BY          ////////////////////////////////////////
///////////////////////////////       YOUTONNE          ////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////

// Importations
const Discord = require("discord.js")
const intents = new Discord.IntentsBitField(3276799);
const bot = new Discord.Client({intents});
const loadCommands = require("./Loaders/loadCommands");
const loadEvents = require("./Loaders/loadEvents");
const config = require("./config.json");


bot.commands = new Discord.Collection();
bot.color = "#d473d4";
bot.function = {
    createId: require("./Fonctions/createId"),
    calculXp: require("./Fonctions/calculXp"),
    generateCaptcha: require("./Fonctions/generateCaptcha"),
}    


bot.login(config.discord.token);
loadCommands(bot);
loadEvents(bot);


bot.on('messageCreate', message => {

    // Vérifier si le message contient une salutations
    if(message.content.match(/(salut|slt|selem|slm|bonjour|bjr|hi|holla)/i)) {
        message.react('👋')
    };
});
