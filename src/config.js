const fs = require("fs");
const path = require("path");

let config = null;

function init() {
    const configPath = path.join(process.cwd(), "deepUrlsConfig.json");
    if (!fs.existsSync(configPath)) {
        throw new Error(
            "DeepUrls: deepUrlsConfig.json not found in project root"
        );
    }
    const raw = fs.readFileSync(configPath, "utf-8");
    const userConfig = JSON.parse(raw);
    if (!userConfig.appId) {
        throw new Error("DeepUrls: appId is required in deepUrlsConfig.json");
    }
    if (!userConfig.deepKey) {
        throw new Error("DeepUrls: deepKey is required in deepUrlsConfig.json");
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