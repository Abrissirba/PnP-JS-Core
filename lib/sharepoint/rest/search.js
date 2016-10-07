"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var queryable_1 = require("./queryable");
/**
 * Describes the search API
 *
 */
var Search = (function (_super) {
    __extends(Search, _super);
    /**
     * Creates a new instance of the Search class
     *
     * @param baseUrl The url for the search context
     * @param query The SearchQuery object to execute
     */
    function Search(baseUrl, path) {
        if (path === void 0) { path = "_api/search/postquery"; }
        _super.call(this, baseUrl, path);
    }
    /**
     * .......
     * @returns Promise
     */
    Search.prototype.execute = function (query) {
        var formattedBody;
        formattedBody = query;
        if (formattedBody.SelectProperties) {
            formattedBody.SelectProperties = { results: query.SelectProperties };
        }
        if (formattedBody.RefinementFilters) {
            formattedBody.RefinementFilters = { results: query.RefinementFilters };
        }
        if (formattedBody.Refiners) {
            formattedBody.Refiners = { results: query.Refiners };
        }
        if (formattedBody.SortList) {
            formattedBody.SortList = { results: query.SortList };
        }
        if (formattedBody.HithighlightedProperties) {
            formattedBody.HithighlightedProperties = { results: query.HithighlightedProperties };
        }
        if (formattedBody.ReorderingRules) {
            formattedBody.ReorderingRules = { results: query.ReorderingRules };
        }
        // TODO: Properties & ReorderingRules
        var postBody = JSON.stringify({ request: formattedBody });
        return this.post({ body: postBody }).then(function (data) {
            return new SearchResults(data);
        });
    };
    return Search;
}(queryable_1.QueryableInstance));
exports.Search = Search;
/**
 * Describes the SearchResults class, which returns the formatted and raw version of the query response
 */
var SearchResults = (function () {
    /**
     * Creates a new instance of the SearchResult class
     *
     */
    function SearchResults(rawResponse) {
        var response = rawResponse.postquery ? rawResponse.postquery : rawResponse;
        this.PrimarySearchResults = this.formatSearchResults(response.PrimaryQueryResult.RelevantResults.Table.Rows);
        this.RawSearchResults = response;
        this.ElapsedTime = response.ElapsedTime;
        this.RowCount = response.PrimaryQueryResult.RelevantResults.RowCount;
        this.TotalRows = response.PrimaryQueryResult.RelevantResults.TotalRows;
        this.TotalRowsIncludingDuplicates = response.PrimaryQueryResult.RelevantResults.TotalRowsIncludingDuplicates;
    }
    /**
     * Formats a search results array
     *
     * @param rawResults The array to process
     */
    SearchResults.prototype.formatSearchResults = function (rawResults) {
        var results = new Array(), tempResults = rawResults.results ? rawResults.results : rawResults;
        for (var _i = 0, tempResults_1 = tempResults; _i < tempResults_1.length; _i++) {
            var i = tempResults_1[_i];
            results.push(new SearchResult(i.Cells));
        }
        return results;
    };
    return SearchResults;
}());
exports.SearchResults = SearchResults;
/**
 * Describes the SearchResult class
 */
var SearchResult = (function () {
    /**
     * Creates a new instance of the SearchResult class
     *
     */
    function SearchResult(rawItem) {
        var item = rawItem.results ? rawItem.results : rawItem;
        for (var _i = 0, item_1 = item; _i < item_1.length; _i++) {
            var i = item_1[_i];
            this[i.Key] = i.Value;
        }
    }
    return SearchResult;
}());
exports.SearchResult = SearchResult;
/**
 * defines the SortDirection enum
 */
(function (SortDirection) {
    SortDirection[SortDirection["Ascending"] = 0] = "Ascending";
    SortDirection[SortDirection["Descending"] = 1] = "Descending";
    SortDirection[SortDirection["FQLFormula"] = 2] = "FQLFormula";
})(exports.SortDirection || (exports.SortDirection = {}));
var SortDirection = exports.SortDirection;
/**
 * defines the ReorderingRuleMatchType  enum
 */
(function (ReorderingRuleMatchType) {
    ReorderingRuleMatchType[ReorderingRuleMatchType["ResultContainsKeyword"] = 0] = "ResultContainsKeyword";
    ReorderingRuleMatchType[ReorderingRuleMatchType["TitleContainsKeyword"] = 1] = "TitleContainsKeyword";
    ReorderingRuleMatchType[ReorderingRuleMatchType["TitleMatchesKeyword"] = 2] = "TitleMatchesKeyword";
    ReorderingRuleMatchType[ReorderingRuleMatchType["UrlStartsWith"] = 3] = "UrlStartsWith";
    ReorderingRuleMatchType[ReorderingRuleMatchType["UrlExactlyMatches"] = 4] = "UrlExactlyMatches";
    ReorderingRuleMatchType[ReorderingRuleMatchType["ContentTypeIs"] = 5] = "ContentTypeIs";
    ReorderingRuleMatchType[ReorderingRuleMatchType["FileExtensionMatches"] = 6] = "FileExtensionMatches";
    ReorderingRuleMatchType[ReorderingRuleMatchType["ResultHasTag"] = 7] = "ResultHasTag";
    ReorderingRuleMatchType[ReorderingRuleMatchType["ManualCondition"] = 8] = "ManualCondition";
})(exports.ReorderingRuleMatchType || (exports.ReorderingRuleMatchType = {}));
var ReorderingRuleMatchType = exports.ReorderingRuleMatchType;
/**
 * Specifies the type value for the property
 */
(function (QueryPropertyValueType) {
    QueryPropertyValueType[QueryPropertyValueType["None"] = 0] = "None";
    QueryPropertyValueType[QueryPropertyValueType["StringType"] = 1] = "StringType";
    QueryPropertyValueType[QueryPropertyValueType["Int32TYpe"] = 2] = "Int32TYpe";
    QueryPropertyValueType[QueryPropertyValueType["BooleanType"] = 3] = "BooleanType";
    QueryPropertyValueType[QueryPropertyValueType["StringArrayType"] = 4] = "StringArrayType";
    QueryPropertyValueType[QueryPropertyValueType["UnSupportedType"] = 5] = "UnSupportedType";
})(exports.QueryPropertyValueType || (exports.QueryPropertyValueType = {}));
var QueryPropertyValueType = exports.QueryPropertyValueType;
