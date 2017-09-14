module.exports = async message => {
    let client = message.client;
    if (client.config.selfbot === true) {
        if (message.author !== client.user) return;
    }
    let prefix = client.prefix;
    if (!message.content.startsWith(prefix)) return;
    if (client.config.disabledServers.includes(message.guild.id)) return;
    const args = message.content.split(' ').slice(1);
    let cmdName = message.content.slice(prefix.length).split(' ')[0];

    const command = client.commands.get(cmdName) || client.commands.get(client.aliases.get(cmdName));
    if (command) {
        command.run(message, args);
    }
};