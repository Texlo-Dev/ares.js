const path = require('path');
const Command = require(`${path.resolve(__dirname, '../..')}/classes/Command`);

module.exports = class ReloadCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'reload', 
            description: 'Reloads a given command.',
            aliases: ['reloadcommand'],
            usage: '[command]'
        });
    }

    async run (message, args) {
        let command = args.join(' ');
        if (!command && this.client.config.selfbot === true) return message.edit(':x: No command was specified.');
        else if (!command) return message.channel.send(':x: No command was specified.');
        let toReload = this.client.commands.get(command);
        if (!toReload && this.client.config.selfbot === true) return message.edit(':x: Sorry, invalid command.');
        else if (!command) return message.channel.send(':x: Sorry, invalid command.');
        toReload.reload()
            .then(command => {
                if (this.client.config.selfbot === true) return message.edit(`:ok_hand: Successfully reloaded the command **${command.name}**.`);
                else return message.channel.send(`:ok_hand: Successfully reloaded the command ${command.name}.`);
            })
            .catch(e => {
                if (this.client.config.selfbot === true) return message.edit(`Oops, there was an error reloading that command!\n\`\`\`${e.stack.split(',')[0]}\`\`\``);
                else return message.channel.send(`Oops, there was an error reloading that command!\n\`\`\`${e.stack.split(',')[0]}\`\`\``);
                
            });
    }
};