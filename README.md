# ares.js
An easy-to-use, Discord.js bot framework, based on ES6 classes.

# Installation
This depends on Node.js version 8.0.0, and up!
```npm install ares.js```

# Basic Usage
First, require the module.
```js
const Ares = require('ares.js');
```
Then, create the new client.
```js
const Ares = require('ares.js');
const client = new Ares.Client({
   prefix: '>',
   ownerID: '4839247484875758449'
});
```
The object takes a few options.
`prefix`: The command prefix for the bot. This may be changed later in the prefix command.

`selfbot`: Whether to run Ares.js in selfbot mode. If excluded, defaults to false.

`disabledServers` (Only for selfbots): Servers that the selfbot will not be running on.

`ownerID`: The owner of the bot. This can be one or an array of IDs.

Then, if you would like to use the default commands (help, eval, ping, etc...), just add the following:
```client.registerDefaults();```

Then, to start the bot, simply call `login()`, like normal, with your token.
```client.login(token);```


