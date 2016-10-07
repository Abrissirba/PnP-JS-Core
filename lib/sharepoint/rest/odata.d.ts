import { QueryableConstructor } from "./queryable";
export declare function extractOdataId(candidate: any): string;
export interface ODataParser<T, U> {
    parse(r: Response): Promise<U>;
}
export declare abstract class ODataParserBase<T, U> implements ODataParser<T, U> {
    parse(r: Response): Promise<U>;
}
export declare class ODataDefaultParser extends ODataParserBase<any, any> {
}
export declare class ODataRawParserImpl implements ODataParser<any, any> {
    parse(r: Response): Promise<any>;
}
export declare let ODataRaw: ODataRawParserImpl;
export declare function ODataValue<T>(): ODataParser<any, T>;
export declare function ODataEntity<T>(factory: QueryableConstructor<T>): ODataParser<T, T>;
export declare function ODataEntityArray<T>(factory: QueryableConstructor<T>): ODataParser<T, T[]>;
/**
 * Manages a batch of OData operations
 */
export declare class ODataBatch {
    private _batchId;
    private _batchDepCount;
    private _requests;
    constructor(_batchId?: string);
    /**
     * Adds a request to a batch (not designed for public use)
     *
     * @param url The full url of the request
     * @param method The http method GET, POST, etc
     * @param options Any options to include in the request
     * @param parser The parser that will hadle the results of the request
     */
    add<U>(url: string, method: string, options: any, parser: ODataParser<any, U>): Promise<U>;
    incrementBatchDep(): void;
    decrementBatchDep(): void;
    /**
     * Execute the current batch and resolve the associated promises
     *
     * @returns A promise which will be resolved once all of the batch's child promises have resolved
     */
    execute(): Promise<void>;
    private executeImpl();
    /**
     * Parses the response from a batch request into an array of Response instances
     *
     * @param body Text body of the response from the batch request
     */
    private _parseResponse(body);
}
