const fs = require('fs');

const CONFIG = './config/config.json';

function loadConfig() {

    if (!fs.existsSync(CONFIG)) {
        return null;
    }

    return JSON.parse(
        fs.readFileSync(CONFIG, 'utf8')
    );

}

function saveConfig(config) {

    fs.writeFileSync(
        CONFIG,
        JSON.stringify(
            config,
            null,
            4
        )
    );

}

module.exports = {
    loadConfig,
    saveConfig
};