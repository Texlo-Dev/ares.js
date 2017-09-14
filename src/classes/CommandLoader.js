const { promisify } = require('util');
const path = require('path');
const fs = require('fs');
const readdir = promisify(fs.readdir);
const mkdir = promisify(fs.mkdir);
class CommandLoader {

    async loadCommands(client) {
        try {
            if (!fs.existsSync(`${process.cwd()}/commands`)) {
                await mkdir('./commands');
                console.log('Initializing commands directory.');
            }
            console.log('Initializing commands...');
            let folders = await readdir(`${process.cwd()}/commands`);
            for (const folder of folders) {
                let files = await readdir(`${process.cwd()}/commands/${folder}/`);
                for (const file of files) {
                    let command = require(`${process.cwd()}/commands/${folder}/${file}`);
                    let cmd = new command(client);
                    cmd.category = capitalizeFirstLetter(folder);
                    client.commands.set(cmd.name, cmd);
                    if (cmd.aliases && cmd.aliases.length) {
                        cmd.aliases.forEach(a => {
                            client.aliases.set(a, cmd.name);
                        });
                    }
                }
            }
        } catch (e) {
            throw e; 
        }

    }

    async loadDefaults(client) {
        let dir = `${path.resolve(__dirname, '..')}/commands`;
        let folders = await readdir(dir);
        try {
            for (const folder of folders) {
                let files = await readdir(`${dir}/${folder}`);
                for (const file of files) {
                    let command = require(`${dir}/${folder}/${file}`);
                    let cmd = new command(client);
                    cmd.category = capitalizeFirstLetter(folder);
                    client.commands.set(cmd.name, cmd);
                    if (cmd.aliases && cmd.aliases.length) {
                        cmd.aliases.forEach(a => {
                            client.aliases.set(a, cmd.name);
                        });
                    }
                }
            }
        } catch (e) {
            throw e; 
        }
    }

}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = CommandLoader;


