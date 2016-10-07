import { TypedHash } from "../collections/collections";
import { HttpClientImpl } from "../net//httpclient";
export interface NodeClientData {
    clientId: string;
    clientSecret: string;
    siteUrl: string;
}
export interface LibraryConfiguration {
    /**
     * Any headers to apply to all requests
     */
    headers?: TypedHash<string>;
    /**
     * Allows caching to be global disabled, default: false
     */
    globalCacheDisable?: boolean;
    /**
     * Defines the default store used by the usingCaching method, default: session
     */
    defaultCachingStore?: "session" | "local";
    /**
     * Defines the default timeout in seconds used by the usingCaching method, default 30
     */
    defaultCachingTimeoutSeconds?: number;
    /**
     * If true the SP.RequestExecutor will be used to make the requests, you must include the required external libs
     */
    useSPRequestExecutor?: boolean;
    /**
     * If set the library will use node-fetch, typically for use with testing but works with any valid client id/secret pair
     */
    nodeClientOptions?: NodeClientData;
    /**
     * If set the library will use node-fetch, typically for use with testing but works with any valid client id/secret pair
     */
    customHttpClient?: HttpClientImpl;
}
export declare class RuntimeConfigImpl {
    private _headers;
    private _defaultCachingStore;
    private _defaultCachingTimeoutSeconds;
    private _globalCacheDisable;
    private _useSPRequestExecutor;
    private _useNodeClient;
    private _nodeClientData;
    private _customHttpClient;
    constructor();
    set(config: LibraryConfiguration): void;
    headers: TypedHash<string>;
    defaultCachingStore: "session" | "local";
    defaultCachingTimeoutSeconds: number;
    globalCacheDisable: boolean;
    useSPRequestExecutor: boolean;
    useNodeFetchClient: boolean;
    nodeRequestOptions: NodeClientData;
    customHttpClient: HttpClientImpl;
}
export declare let RuntimeConfig: RuntimeConfigImpl;
export declare function setRuntimeConfig(config: LibraryConfiguration): void;
