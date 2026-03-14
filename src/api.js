import CryptoJS from "crypto-js";
import { getConfig } from "./config.js";

const API_URL = "https://us-central1-v3deeplinks.cloudfunctions.net/postGenerateLink";

export const canonicalize = (value) => {
    if (Array.isArray(value)) {
        return value.map(canonicalize);
    }
    if (value !== null && typeof value === "object") {
        const sortedKeys = Object.keys(value).sort();
        const newObj = {};
        for (const key of sortedKeys) {
            newObj[key] = canonicalize(value[key]);
        }
        return newObj;
    }
    return value;
};

export async function createLink(options = {}) {
    const config = getConfig();
    if (!options.route) {
        throw new Error("DeepUrls: route is required");
    }
    const timestamp = Math.floor(Date.now() / 1000);
    const nonce = crypto.randomUUID();
    const rawPayload = {
        appId: config.appId,
        route: options.route,
        params: options.params ?? {},
        timestamp,
        nonce
    };
    const canonicalPayload = canonicalize(rawPayload);
    const payloadString = JSON.stringify(canonicalPayload);
    const signature = CryptoJS.HmacSHA256(payloadString, config.deepKey).toString(CryptoJS.enc.Hex);
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
            params: options.params ?? {},
            useShort: options.useShort !== false
        })
    });

    if (!response.ok) {
        const text = await response.text();
        throw new Error(text);
    }

    return response.json();
}