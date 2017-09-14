module.exports = client => {
    console.log(`Ares is ready to serve ${client.guilds.size} servers.`);
    if (client.options.selfbot === true) {
        client.user.setStatus('invisible');
        client.user.setAFK(true);
    };
};
