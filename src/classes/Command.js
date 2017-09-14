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
                let cmdDir = this.client.commands.get(this.name).name;
                delete require.cache[require.resolve(`../commands/${cmdDir.toLowerCase()}/${cmdDir}.js`)];
                let cmdFile = require(`../commands/${cmdDir.toLowerCase()}/${cmdDir}.js`);
                let cmd = new cmdFile(this.client);
                this.client.commands.delete(cmdDir);
                this.client.aliases.forEach((cmd, alias) => {
                    if (cmd === cmdDir) this.client.aliases.delete(alias);
                });
                cmd.name = cmdDir;
                cmd.category = cmdDir.category;
                this.client.commands.set(cmdDir, cmd);
                if (cmd.aliases && cmd.aliases.length) {
                    cmd.aliases.forEach(a => {
                        this.client.aliases.set(a, cmdDir);
                    });
                }
                resolve(cmdDir);
            } catch (e) {
                reject(e);
            }
        });

    }
}

module.exports = Command;
