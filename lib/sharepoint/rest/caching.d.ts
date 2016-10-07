import { ODataParser } from "./odata";
import { PnPClientStore, PnPClientStorage } from "../../utils/storage";
export interface ICachingOptions {
    expiration?: Date;
    storeName?: "session" | "local";
    key: string;
}
export declare class CachingOptions implements ICachingOptions {
    key: string;
    protected static storage: PnPClientStorage;
    expiration: Date;
    storeName: "session" | "local";
    constructor(key: string);
    store: PnPClientStore;
}
export declare class CachingParserWrapper<T, U> implements ODataParser<T, U> {
    private _parser;
    private _cacheOptions;
    constructor(_parser: ODataParser<T, U>, _cacheOptions: CachingOptions);
    parse(response: Response): Promise<U>;
}
