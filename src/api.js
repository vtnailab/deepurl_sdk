const crypto = require("crypto");
const { getConfig } = require("./config");

const API_URL = "https://us-central1-v3deeplinks.cloudfunctions.net/postGenerateLink";

async function createLink(options = {}) {
    const config = getConfig();
    if (!options.route) {
        throw new Error("DeepUrls: route is required");
    }
    const timestamp = Math.floor(Date.now() / 1000);
    const nonce = crypto.randomUUID();
    const payload = JSON.stringify({
        appId: config.appId,
        nonce,
        params: options.params || {},
        route: options.route,
        timestamp,

    });
    const signature = crypto.createHmac("sha256", config.deepKey).update(payload).digest("hex");
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-timestamp": timestamp.toString(),
            "x-nonce": nonce,
            "x-signature": signature
        },
        body: JSON.stringify({
            appId: config.appId,
            route: options.route,
            params: options.params || {},
            useShort: options.useShort !== false
        })
    });
    if (!response.ok) {
        const text = await response.text();
        throw new Error(text);
    }
    return response.json();
}

module.exports = {
    createLink
};