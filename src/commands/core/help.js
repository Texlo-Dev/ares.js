const path = require('path');
const Command = require(`${path.resolve(__dirname, '../..')}/classes/Command`);

module.exports = class HelpCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'help',
            description: 'Shows the available commands.',
            usage: '[command]'
        });
    }

    async run (message, args) { 
        let cmdName = args[0];
        if (!cmdName) {
            const myCommands = this.client.commands.filter(c => c.hasPermission(message) === true);
            let output = `\`\`\`Available commands in this server for ${message.author.username}:\n`;
            let currentCategory = "";
            const sorted = myCommands.sort((p, c) => p.category > c.category ? 1 : -1);
            sorted.forEach(c => {
                const cat = c.category;
                if(currentCategory !== cat) {
                    output += `\n${cat}:\n`;
                    currentCategory = cat;
                }
                output += `${c.name}: ${c.description}\n`;
            });
            output += '```';
            const embed = new (require('discord.js')).MessageEmbed()
                .setAuthor(`${this.client.config.selfbot ? 'Selfbot' : this.client.user.username} Commands`, this.client.user.displayAvatarURL())
                .setDescription(output)
                .setTimestamp()
                .setColor(0x24af7d)
                .setFooter('Powered by Ares.js');
            if (this.client.options.selfbot === true) message.edit({embed});
            else message.reply('Just sent you a DM!').then(() => message.author.send({embed}));

        }

    }
};