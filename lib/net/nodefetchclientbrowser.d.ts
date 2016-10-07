import { HttpClientImpl } from "./httpclient";
/**
 * This module is substituted for the NodeFetchClient.ts during the packaging process. This helps to reduce the pnp.js file size by
 * not including all of the node dependencies
 */
export declare class NodeFetchClient implements HttpClientImpl {
    siteUrl: string;
    private _clientId;
    private _clientSecret;
    private _realm;
    constructor(siteUrl: string, _clientId: string, _clientSecret: string, _realm?: string);
    /**
     * Always throws an error that NodeFetchClient is not supported for use in the browser
     */
    fetch(url: string, options: any): Promise<Response>;
}
