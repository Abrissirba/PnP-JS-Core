import { Dictionary } from "../../collections/collections";
import { FetchOptions } from "../../net/httpclient";
import { ODataParser, ODataBatch } from "./odata";
import { ICachingOptions } from "./caching";
export interface QueryableConstructor<T> {
    new (baseUrl: string | Queryable, path?: string): T;
}
/**
 * Queryable Base Class
 *
 */
export declare class Queryable {
    /**
     * Tracks the query parts of the url
     */
    protected _query: Dictionary<string>;
    /**
     * Tracks the batch of which this query may be part
     */
    private _batch;
    /**
     * Tracks the url as it is built
     */
    private _url;
    /**
     * Stores the parent url used to create this instance, for recursing back up the tree if needed
     */
    private _parentUrl;
    /**
     * Explicitly tracks if we are using caching for this request
     */
    private _useCaching;
    /**
     * Any options that were supplied when caching was enabled
     */
    private _cachingOptions;
    /**
     * Directly concatonates the supplied string to the current url, not normalizing "/" chars
     *
     * @param pathPart The string to concatonate to the url
     */
    concat(pathPart: string): void;
    /**
     * Appends the given string and normalizes "/" chars
     *
     * @param pathPart The string to append
     */
    protected append(pathPart: string): void;
    /**
     * Blocks a batch call from occuring, MUST be cleared with clearBatchDependency before a request will execute
     */
    protected addBatchDependency(): void;
    /**
     * Clears a batch request dependency
     */
    protected clearBatchDependency(): void;
    /**
     * Indicates if the current query has a batch associated
     *
     */
    protected hasBatch: boolean;
    /**
     * Gets the parent url used when creating this instance
     *
     */
    protected parentUrl: string;
    /**
     * Provides access to the query builder for this url
     *
     */
    query: Dictionary<string>;
    /**
     * Creates a new instance of the Queryable class
     *
     * @constructor
     * @param baseUrl A string or Queryable that should form the base part of the url
     *
     */
    constructor(baseUrl: string | Queryable, path?: string);
    /**
     * Adds this query to the supplied batch
     *
     * @example
     * ```
     *
     * let b = pnp.sp.createBatch();
     * pnp.sp.web.inBatch(b).get().then(...);
     * ```
     */
    inBatch(batch: ODataBatch): this;
    /**
     * Enables caching for this request
     *
     * @param options Defines the options used when caching this request
     */
    usingCaching(options?: ICachingOptions): this;
    /**
     * Gets the currentl url, made server relative or absolute based on the availability of the _spPageContextInfo object
     *
     */
    toUrl(): string;
    /**
     * Gets the full url with query information
     *
     */
    toUrlAndQuery(): string;
    /**
     * Executes the currently built request
     *
     */
    get(parser?: ODataParser<any, any>, getOptions?: FetchOptions): Promise<any>;
    getAs<T, U>(parser?: ODataParser<T, U>, getOptions?: FetchOptions): Promise<U>;
    protected post(postOptions?: FetchOptions, parser?: ODataParser<any, any>): Promise<any>;
    protected postAs<T, U>(postOptions?: FetchOptions, parser?: ODataParser<T, U>): Promise<U>;
    /**
     * Gets a parent for this isntance as specified
     *
     * @param factory The contructor for the class to create
     */
    protected getParent<T extends Queryable>(factory: {
        new (q: string | Queryable, path?: string): T;
    }, baseUrl?: string | Queryable, path?: string): T;
    private getImpl<U>(getOptions, parser);
    private postImpl<U>(postOptions, parser);
}
/**
 * Represents a REST collection which can be filtered, paged, and selected
 *
 */
export declare class QueryableCollection extends Queryable {
    /**
     * Filters the returned collection (https://msdn.microsoft.com/en-us/library/office/fp142385.aspx#bk_supported)
     *
     * @param filter The string representing the filter query
     */
    filter(filter: string): QueryableCollection;
    /**
     * Choose which fields to return
     *
     * @param selects One or more fields to return
     */
    select(...selects: string[]): QueryableCollection;
    /**
     * Expands fields such as lookups to get additional data
     *
     * @param expands The Fields for which to expand the values
     */
    expand(...expands: string[]): QueryableCollection;
    /**
     * Orders based on the supplied fields ascending
     *
     * @param orderby The name of the field to sort on
     * @param ascending If true ASC is appended, otherwise DESC (default)
     */
    orderBy(orderBy: string, ascending?: boolean): QueryableCollection;
    /**
     * Skips the specified number of items
     *
     * @param skip The number of items to skip
     */
    skip(skip: number): QueryableCollection;
    /**
     * Limits the query to only return the specified number of items
     *
     * @param top The query row limit
     */
    top(top: number): QueryableCollection;
}
/**
 * Represents an instance that can be selected
 *
 */
export declare class QueryableInstance extends Queryable {
    /**
     * Choose which fields to return
     *
     * @param selects One or more fields to return
     */
    select(...selects: string[]): QueryableInstance;
    /**
     * Expands fields such as lookups to get additional data
     *
     * @param expands The Fields for which to expand the values
     */
    expand(...expands: string[]): QueryableInstance;
}
