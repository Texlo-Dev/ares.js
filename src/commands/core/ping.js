const path = require('path');
const Command = require(`${path.resolve(__dirname, '../..')}/classes/Command`);

module.exports = class PingCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'ping',
            description: 'Checks the API latency to the Discord servers.',
            aliases: []
        });
    }

    async run (message, args) {
        let pingMsg = await message.channel.send('Pinging...');
        pingMsg.edit(`:ping_pong: Pong! Message round trip time was ${pingMsg.createdTimestamp - message.createdTimestamp}ms\nClient ping is ${Math.round(this.client.ping)}ms.`);
    }
};