export declare class Util {
    /**
     * Make URL relative to host
     *
     * @param url The URL to make relative
     */
    static getRelativeUrl(url: string): string;
    /**
     * Replaces URL tokens in a string
     */
    static replaceUrlTokens(url: string): string;
    static encodePropertyKey(propKey: any): string;
}
