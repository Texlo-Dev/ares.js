class Command {
    constructor(client, info = {}) {
        Object.defineProperty(this, 'client', { value: client });

        this.name = info.name;
        this.description = info.description;
        this.usage = info.usage || info.name;
        this.aliases = info.aliases || [];

    }

    async run () {
        //In other files
    }

    hasPermission(message) {
        return true;
    }

    async reload() {
        return new Promise((resolve, reject) => {
            try {
                let command = this.client.commands.get(this.name);
                
                delete require.cache[require.resolve(`../commands/${command.category.toLowerCase()}/${command.name}.js`)];
                let cmdFile = require(`../commands/${command.category.toLowerCase()}/${command.name}.js`);
                let cmd = new cmdFile(this.client);
                this.client.commands.delete(command.name);
                this.client.aliases.forEach((cmd, alias) => {
                    if (cmd === this.name) this.client.aliases.delete(alias);
                });
                cmd.name = this.name;
                cmd.category = command.category;
                this.client.commands.set(this.name, cmd);
                if (cmd.aliases && cmd.aliases.length) {
                    cmd.aliases.forEach(a => {
                        this.client.aliases.set(a, this.name);
                    });
                }
                resolve(command);
            } catch (e) {
                reject(e);
            }
        });

    }
}

module.exports = Command;
