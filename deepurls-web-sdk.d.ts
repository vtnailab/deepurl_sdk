// deepurls-web-sdk.d.ts

export interface InitConfig {
    appId: string;
    deepKey: string;
}

export interface CreateLinkOptions {
    route: string;
    params?: Record<string, any>;
    useShort?: boolean;
}

export interface LinkResponse {
    shortUrl: string;
    [key: string]: any;
}

/**
 * Initialize the SDK.
 * Can pass config object or fallback to deepUrlsConfig.json in project root.
 */
export function init(config?: InitConfig): void;

/**
 * Create a deep link
 */
export function createLink(options: CreateLinkOptions): Promise<LinkResponse>;