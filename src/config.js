let config = null;

export function init(userConfig) {
    if (!userConfig) {
        throw new Error("DeepUrls: config required");
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

export function getConfig() {
    if (!config) {
        throw new Error("DeepUrls: SDK not initialized. Call init()");
    }
    return config;
}