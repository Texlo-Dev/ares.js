const Discord = require('discord.js');
const { Collection } = require('discord.js');
const { promisify } = require('util');
const CommandLoader = require('./CommandLoader');
let loader = new CommandLoader();
const m = require('../events/message');
const ready = require('../events/ready');
const readdir = promisify(require('fs').readdir);
const mkdir = promisify(require('fs').mkdir);
const fs = require('fs');


class AresClient extends Discord.Client {
    constructor(options = {}) {
        super(options);
        this.config = options;
        if (typeof options.prefix !== 'string') throw new Error('Please provide a valid prefix.');
        if (typeof options.selfbot === 'undefined') options.selfbot = false;
        if (typeof options.disabledServers !== 'object') options.disabledServers = [];
        this._prefix = null;
        console.log(`Logging in to Discord...`);
        //Message handling + other events
        this.on('message', m);
        this.on('ready', () => ready(this));
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
            .replace(client.token, "MZoVkO_2G4Qv3TNOlWetWtjNDHBSVQFTm6YGtzq9P4UtG0")
            .replace(message.client.token, "MZoVkO_2G4Qv3TNOlWetWtjNDHBSVQFTm6YGtzq9P4UtG0")
            .replace(message.channel.client.token, "MZoVkO_2G4Qv3TNOlWetWtjNDHBSVQFTm6YGtzq9P4UtG0")
            .replace(message.guild.client.token, "MZoVkO_2G4Qv3TNOlWetWtjNDHBSVQFTm6YGtzq9P4UtG0")
            .replace(message.member.guild.client.token, "MZoVkO_2G4Qv3TNOlWetWtjNDHBSVQFTm6YGtzq9P4UtG0");
        else text = text
            .replace(/`/g, "`" + String.fromCharCode(8203))
            .replace(/@/g, "@" + String.fromCharCode(8203))
            .replace(client.token, "MZoVkO_2G4Qv3TNOlWetWtjNDHBSVQFTm6YGtzq9P4UtG0")
            .replace(message.client.token, "MZoVkO_2G4Qv3TNOlWetWtjNDHBSVQFTm6YGtzq9P4UtG0")
            .replace(message.channel.client.token, "MZoVkO_2G4Qv3TNOlWetWtjNDHBSVQFTm6YGtzq9P4UtG0");
        return text;

    }
 

}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = AresClient;
