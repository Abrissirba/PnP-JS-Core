"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var util_1 = require("../../utils/util");
var collections_1 = require("../../collections/collections");
var httpclient_1 = require("../../net/httpclient");
var odata_1 = require("./odata");
var caching_1 = require("./caching");
var pnplibconfig_1 = require("../../configuration/pnplibconfig");
/**
 * Queryable Base Class
 *
 */
var Queryable = (function () {
    /**
     * Creates a new instance of the Queryable class
     *
     * @constructor
     * @param baseUrl A string or Queryable that should form the base part of the url
     *
     */
    function Queryable(baseUrl, path) {
        this._query = new collections_1.Dictionary();
        this._batch = null;
        if (typeof baseUrl === "string") {
            // we need to do some extra parsing to get the parent url correct if we are
            // being created from just a string.
            var urlStr = baseUrl;
            if (urlStr.lastIndexOf("/") < 0) {
                this._parentUrl = urlStr;
                this._url = util_1.Util.combinePaths(urlStr, path);
            }
            else if (urlStr.lastIndexOf("/") > urlStr.lastIndexOf("(")) {
                var index = urlStr.lastIndexOf("/");
                this._parentUrl = urlStr.slice(0, index);
                path = util_1.Util.combinePaths(urlStr.slice(index), path);
                this._url = util_1.Util.combinePaths(this._parentUrl, path);
            }
            else {
                var index = urlStr.lastIndexOf("(");
                this._parentUrl = urlStr.slice(0, index);
                this._url = util_1.Util.combinePaths(urlStr, path);
            }
        }
        else {
            var q = baseUrl;
            this._parentUrl = q._url;
            // only copy batch if we don't already have one
            if (!this.hasBatch && q.hasBatch) {
                this._batch = q._batch;
            }
            var target = q._query.get("@target");
            if (target !== null) {
                this._query.add("@target", target);
            }
            this._url = util_1.Util.combinePaths(this._parentUrl, path);
        }
    }
    /**
     * Directly concatonates the supplied string to the current url, not normalizing "/" chars
     *
     * @param pathPart The string to concatonate to the url
     */
    Queryable.prototype.concat = function (pathPart) {
        this._url += pathPart;
    };
    /**
     * Appends the given string and normalizes "/" chars
     *
     * @param pathPart The string to append
     */
    Queryable.prototype.append = function (pathPart) {
        this._url = util_1.Util.combinePaths(this._url, pathPart);
    };
    /**
     * Blocks a batch call from occuring, MUST be cleared with clearBatchDependency before a request will execute
     */
    Queryable.prototype.addBatchDependency = function () {
        if (this._batch !== null) {
            this._batch.incrementBatchDep();
        }
    };
    /**
     * Clears a batch request dependency
     */
    Queryable.prototype.clearBatchDependency = function () {
        if (this._batch !== null) {
            this._batch.decrementBatchDep();
        }
    };
    Object.defineProperty(Queryable.prototype, "hasBatch", {
        /**
         * Indicates if the current query has a batch associated
         *
         */
        get: function () {
            return this._batch !== null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Queryable.prototype, "parentUrl", {
        /**
         * Gets the parent url used when creating this instance
         *
         */
        get: function () {
            return this._parentUrl;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Queryable.prototype, "query", {
        /**
         * Provides access to the query builder for this url
         *
         */
        get: function () {
            return this._query;
        },
        enumerable: true,
        configurable: true
    });
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
    Queryable.prototype.inBatch = function (batch) {
        if (this._batch !== null) {
            // TODO: what do we want to do?
            throw new Error("This query is already part of a batch.");
        }
        this._batch = batch;
        return this;
    };
    /**
     * Enables caching for this request
     *
     * @param options Defines the options used when caching this request
     */
    Queryable.prototype.usingCaching = function (options) {
        if (!pnplibconfig_1.RuntimeConfig.globalCacheDisable) {
            this._useCaching = true;
            this._cachingOptions = options;
        }
        return this;
    };
    /**
     * Gets the currentl url, made server relative or absolute based on the availability of the _spPageContextInfo object
     *
     */
    Queryable.prototype.toUrl = function () {
        return util_1.Util.makeUrlAbsolute(this._url);
    };
    /**
     * Gets the full url with query information
     *
     */
    Queryable.prototype.toUrlAndQuery = function () {
        var _this = this;
        var url = this.toUrl();
        if (this._query.count() > 0) {
            url += "?";
            var keys = this._query.getKeys();
            url += keys.map(function (key, ix, arr) { return (key + "=" + _this._query.get(key)); }).join("&");
        }
        return url;
    };
    /**
     * Executes the currently built request
     *
     */
    Queryable.prototype.get = function (parser, getOptions) {
        if (parser === void 0) { parser = new odata_1.ODataDefaultParser(); }
        if (getOptions === void 0) { getOptions = {}; }
        return this.getImpl(getOptions, parser);
    };
    Queryable.prototype.getAs = function (parser, getOptions) {
        if (parser === void 0) { parser = new odata_1.ODataDefaultParser(); }
        if (getOptions === void 0) { getOptions = {}; }
        return this.getImpl(getOptions, parser);
    };
    Queryable.prototype.post = function (postOptions, parser) {
        if (postOptions === void 0) { postOptions = {}; }
        if (parser === void 0) { parser = new odata_1.ODataDefaultParser(); }
        return this.postImpl(postOptions, parser);
    };
    Queryable.prototype.postAs = function (postOptions, parser) {
        if (postOptions === void 0) { postOptions = {}; }
        if (parser === void 0) { parser = new odata_1.ODataDefaultParser(); }
        return this.postImpl(postOptions, parser);
    };
    /**
     * Gets a parent for this isntance as specified
     *
     * @param factory The contructor for the class to create
     */
    Queryable.prototype.getParent = function (factory, baseUrl, path) {
        if (baseUrl === void 0) { baseUrl = this.parentUrl; }
        var parent = new factory(baseUrl, path);
        var target = this.query.get("@target");
        if (target !== null) {
            parent.query.add("@target", target);
        }
        return parent;
    };
    Queryable.prototype.getImpl = function (getOptions, parser) {
        if (getOptions === void 0) { getOptions = {}; }
        if (this._useCaching) {
            var options = new caching_1.CachingOptions(this.toUrlAndQuery().toLowerCase());
            if (typeof this._cachingOptions !== "undefined") {
                options = util_1.Util.extend(options, this._cachingOptions);
            }
            // we may not have a valid store, i.e. on node
            if (options.store !== null) {
                // check if we have the data in cache and if so return a resolved promise
                var data_1 = options.store.get(options.key);
                if (data_1 !== null) {
                    return new Promise(function (resolve) { return resolve(data_1); });
                }
            }
            // if we don't then wrap the supplied parser in the caching parser wrapper
            // and send things on their way
            parser = new caching_1.CachingParserWrapper(parser, options);
        }
        if (this._batch === null) {
            // we are not part of a batch, so proceed as normal
            var client = new httpclient_1.HttpClient();
            return client.get(this.toUrlAndQuery(), getOptions).then(function (response) {
                if (!response.ok) {
                    throw "Error making GET request: " + response.statusText;
                }
                return parser.parse(response);
            });
        }
        else {
            return this._batch.add(this.toUrlAndQuery(), "GET", {}, parser);
        }
    };
    Queryable.prototype.postImpl = function (postOptions, parser) {
        if (this._batch === null) {
            // we are not part of a batch, so proceed as normal
            var client = new httpclient_1.HttpClient();
            return client.post(this.toUrlAndQuery(), postOptions).then(function (response) {
                // 200 = OK (delete)
                // 201 = Created (create)
                // 204 = No Content (update)
                if (!response.ok) {
                    throw "Error making POST request: " + response.statusText;
                }
                if ((response.headers.has("Content-Length") && parseFloat(response.headers.get("Content-Length")) === 0)
                    || response.status === 204) {
                    // in these cases the server has returned no content, so we create an empty object
                    // this was done because the fetch browser methods throw exceptions with no content
                    return new Promise(function (resolve, reject) { resolve({}); });
                }
                // pipe our parsed content
                return parser.parse(response);
            });
        }
        else {
            return this._batch.add(this.toUrlAndQuery(), "POST", postOptions, parser);
        }
    };
    return Queryable;
}());
exports.Queryable = Queryable;
/**
 * Represents a REST collection which can be filtered, paged, and selected
 *
 */
var QueryableCollection = (function (_super) {
    __extends(QueryableCollection, _super);
    function QueryableCollection() {
        _super.apply(this, arguments);
    }
    /**
     * Filters the returned collection (https://msdn.microsoft.com/en-us/library/office/fp142385.aspx#bk_supported)
     *
     * @param filter The string representing the filter query
     */
    QueryableCollection.prototype.filter = function (filter) {
        this._query.add("$filter", filter);
        return this;
    };
    /**
     * Choose which fields to return
     *
     * @param selects One or more fields to return
     */
    QueryableCollection.prototype.select = function () {
        var selects = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            selects[_i - 0] = arguments[_i];
        }
        this._query.add("$select", selects.join(","));
        return this;
    };
    /**
     * Expands fields such as lookups to get additional data
     *
     * @param expands The Fields for which to expand the values
     */
    QueryableCollection.prototype.expand = function () {
        var expands = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            expands[_i - 0] = arguments[_i];
        }
        this._query.add("$expand", expands.join(","));
        return this;
    };
    /**
     * Orders based on the supplied fields ascending
     *
     * @param orderby The name of the field to sort on
     * @param ascending If true ASC is appended, otherwise DESC (default)
     */
    QueryableCollection.prototype.orderBy = function (orderBy, ascending) {
        if (ascending === void 0) { ascending = false; }
        var keys = this._query.getKeys();
        var query = [];
        var asc = ascending ? " asc" : "";
        for (var i = 0; i < keys.length; i++) {
            if (keys[i] === "$orderby") {
                query.push(this._query.get("$orderby"));
                break;
            }
        }
        query.push("" + orderBy + asc);
        this._query.add("$orderby", query.join(","));
        return this;
    };
    /**
     * Skips the specified number of items
     *
     * @param skip The number of items to skip
     */
    QueryableCollection.prototype.skip = function (skip) {
        this._query.add("$skip", skip.toString());
        return this;
    };
    /**
     * Limits the query to only return the specified number of items
     *
     * @param top The query row limit
     */
    QueryableCollection.prototype.top = function (top) {
        this._query.add("$top", top.toString());
        return this;
    };
    return QueryableCollection;
}(Queryable));
exports.QueryableCollection = QueryableCollection;
/**
 * Represents an instance that can be selected
 *
 */
var QueryableInstance = (function (_super) {
    __extends(QueryableInstance, _super);
    function QueryableInstance() {
        _super.apply(this, arguments);
    }
    /**
     * Choose which fields to return
     *
     * @param selects One or more fields to return
     */
    QueryableInstance.prototype.select = function () {
        var selects = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            selects[_i - 0] = arguments[_i];
        }
        this._query.add("$select", selects.join(","));
        return this;
    };
    /**
     * Expands fields such as lookups to get additional data
     *
     * @param expands The Fields for which to expand the values
     */
    QueryableInstance.prototype.expand = function () {
        var expands = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            expands[_i - 0] = arguments[_i];
        }
        this._query.add("$expand", expands.join(","));
        return this;
    };
    return QueryableInstance;
}(Queryable));
exports.QueryableInstance = QueryableInstance;
