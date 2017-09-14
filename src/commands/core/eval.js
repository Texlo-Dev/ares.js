const path = require('path');
const Command = require(`${path.resolve(__dirname, '../..')}/classes/Command`);
module.exports = class EvalCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'eval',
            description: 'Evaluates arbitrary javascript.',
            usage: '[code]',
            aliases: ['ev']
        });
    }

    async run (message, args) {
        let command = args.join(' ');
        const client = message.client;
        if (!command && client.config.selfbot) return message.edit('No command was specified. :x:');
        else if (!command) return message.channel.send('No command was specified. :x:');
        try {
            let res = eval(command);
            if (client.config.selfbot === false) return message.channel.send(`:inbox_tray: **Input:**\`\`\`js\n${command}\`\`\`\n:outbox_tray: **Output:**\`\`\`js\n${await this.client.clean(this.client, message, res)}\`\`\``);
            else return message.edit(`:inbox_tray: **Input:**\`\`\`js\n${command}\`\`\`\n:outbox_tray: **Output:**\`\`\`js\n${await this.client.clean(this.client, message, res)}\`\`\``);
        } catch (e) {
            if (client.config.selfbot === false) message.channel.send(`:inbox_tray: **Input:**\`\`\`js\n${command}\`\`\`\n:x: **Error:**\n\`\`\`${e.stack.split(',')[0]}\`\`\``);
            else message.edit(`:inbox_tray: **Input:**\`\`\`js\n${command}\`\`\`\n:x: **Error:**\n\`\`\`${e.stack.split(',')[0]}\`\`\``);
        }

    }
};