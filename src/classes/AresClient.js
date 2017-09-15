const Discord = require('discord.js');
const { Collection } = require('discord.js');
const CommandLoader = require('./CommandLoader');
let loader = new CommandLoader();

class AresClient extends Discord.Client {
    /**
     * Ares Client options
     * @property {boolean} [selfbot=false] - Whether selfbot mode should be activated.
     * @property {string} [prefix=>] - Prefix for the bot.
     * @property {string|string[]} [ownerID] - The owner (or owners) of the bot
     * @property {string[]} [disabledServers=[]] - (Selfbot Only) Disabled servers for the bot.
     */
    
    /**
     * @param {AresOptions} [options] - Options to run the client with
     */
    constructor(options = {}) {
        super(options);
        this.config = options;
        if (typeof options.prefix !== 'string') throw new Error('Please provide a valid prefix.');
        if (typeof options.selfbot === 'undefined') options.selfbot = false;
        if (typeof options.disabledServers !== 'object') options.disabledServers = [];
        this._prefix = null;
        console.log(`Logging in to Discord...`);
        //Message handling + other events
        this.on('message', require('../events/message'));
        this.on('ready', () => require('../events/ready')(this));
        process.on('unhandledRejection', console.error);
        //collections
        this.commands = new Collection();
        this.aliases = new Collection();
        //Load Built-in commands
        loader.loadDefaults(this);
    }

    get prefix() {
        if (typeof this._prefix === 'undefined' || this._prefix === null) return this.options.prefix;
        return this._prefix;

    }

    async registerCommands() {
        let loader = new CommandLoader();
        loader.loadCommands(this);
    }

    async clean (client, message, text) {
        if (text && text.constructor.name == "Promise")
            text = await text;
        if (typeof evaled !== "string")
            text = require("util").inspect(text, {depth: 0});

        if (message.guild) text = text
            .replace(/`/g, "`" + String.fromCharCode(8203))
            .replace(/@/g, "@" + String.fromCharCode(8203))
            .replace(client.token, "MZoVkO_2G4Qv3TNOlWetWtjNDHBSVQFTm6YGtzq9P4UtG0");
        else text = text
            .replace(/`/g, "`" + String.fromCharCode(8203))
            .replace(/@/g, "@" + String.fromCharCode(8203))
            .replace(client.token, "MZoVkO_2G4Qv3TNOlWetWtjNDHBSVQFTm6YGtzq9P4UtG0");
        return text;

    }
 

}


module.exports = AresClient;
