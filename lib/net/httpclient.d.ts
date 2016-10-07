export interface FetchOptions {
    method?: string;
    headers?: HeaderInit | {
        [index: string]: string;
    };
    body?: BodyInit;
    mode?: string | RequestMode;
    credentials?: string | RequestCredentials;
    cache?: string | RequestCache;
}
export declare class HttpClient {
    private _digestCache;
    private _impl;
    constructor();
    fetch(url: string, options?: FetchOptions): Promise<Response>;
    fetchRaw(url: string, options?: FetchOptions): Promise<Response>;
    get(url: string, options?: FetchOptions): Promise<Response>;
    post(url: string, options?: FetchOptions): Promise<Response>;
    protected getFetchImpl(): HttpClientImpl;
    private mergeHeaders(target, source);
}
export interface HttpClientImpl {
    fetch(url: string, options: any): Promise<Response>;
}
