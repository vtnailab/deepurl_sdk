let config = null;

function init(userConfig) {
    if (!userConfig) {
        const fs = require("fs");
        const path = require("path");
        const configPath = path.join(process.cwd(), "deepUrlsConfig.json");
        if (!fs.existsSync(configPath)) {
            throw new Error("DeepUrls: deepUrlsConfig.json not found and no config object provided");
        }
        const raw = fs.readFileSync(configPath, "utf-8");
        userConfig = JSON.parse(raw);
    }
    if (!userConfig.appId) {
        throw new Error("DeepUrls: appId is required");
    }
    if (!userConfig.deepKey) {
        throw new Error("DeepUrls: deepKey is required");
    }
    config = {
        appId: userConfig.appId,
        deepKey: userConfig.deepKey
    };
}

function getConfig() {
    if (!config) {
        throw new Error("DeepUrls: SDK not initialized. Call init() first.");
    }
    return config;
}

module.exports = {
    init,
    getConfig
};