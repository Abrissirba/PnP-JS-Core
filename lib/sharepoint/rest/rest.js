"use strict";
var search_1 = require("./search");
var site_1 = require("./site");
var webs_1 = require("./webs");
var util_1 = require("../../utils/util");
var userprofiles_1 = require("./userprofiles");
var odata_1 = require("./odata");
/**
 * Root of the SharePoint REST module
 */
var Rest = (function () {
    function Rest() {
    }
    /**
     * Executes a search against this web context
     *
     * @param query The SearchQuery definition
     */
    Rest.prototype.search = function (query) {
        var finalQuery;
        if (typeof query === "string") {
            finalQuery = { Querytext: query };
        }
        else {
            finalQuery = query;
        }
        return new search_1.Search("").execute(finalQuery);
    };
    Object.defineProperty(Rest.prototype, "site", {
        /**
         * Begins a site collection scoped REST request
         *
         */
        get: function () {
            return new site_1.Site("");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rest.prototype, "web", {
        /**
         * Begins a web scoped REST request
         *
         */
        get: function () {
            return new webs_1.Web("");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rest.prototype, "profiles", {
        /**
         * Access to user profile methods
         *
         */
        get: function () {
            return new userprofiles_1.UserProfileQuery("");
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Creates a new batch object for use with the Queryable.addToBatch method
     *
     */
    Rest.prototype.createBatch = function () {
        return new odata_1.ODataBatch();
    };
    /**
     * Begins a cross-domain, host site scoped REST request, for use in add-in webs
     *
     * @param addInWebUrl The absolute url of the add-in web
     * @param hostWebUrl The absolute url of the host web
     */
    Rest.prototype.crossDomainSite = function (addInWebUrl, hostWebUrl) {
        return this._cdImpl(site_1.Site, addInWebUrl, hostWebUrl, "site");
    };
    /**
     * Begins a cross-domain, host web scoped REST request, for use in add-in webs
     *
     * @param addInWebUrl The absolute url of the add-in web
     * @param hostWebUrl The absolute url of the host web
     */
    Rest.prototype.crossDomainWeb = function (addInWebUrl, hostWebUrl) {
        return this._cdImpl(webs_1.Web, addInWebUrl, hostWebUrl, "web");
    };
    /**
     * Implements the creation of cross domain REST urls
     *
     * @param factory The constructor of the object to create Site | Web
     * @param addInWebUrl The absolute url of the add-in web
     * @param hostWebUrl The absolute url of the host web
     * @param urlPart String part to append to the url "site" | "web"
     */
    Rest.prototype._cdImpl = function (factory, addInWebUrl, hostWebUrl, urlPart) {
        if (!util_1.Util.isUrlAbsolute(addInWebUrl)) {
            throw "The addInWebUrl parameter must be an absolute url.";
        }
        if (!util_1.Util.isUrlAbsolute(hostWebUrl)) {
            throw "The hostWebUrl parameter must be an absolute url.";
        }
        var url = util_1.Util.combinePaths(addInWebUrl, "_api/SP.AppContextSite(@target)");
        var instance = new factory(url, urlPart);
        instance.query.add("@target", "'" + encodeURIComponent(hostWebUrl) + "'");
        return instance;
    };
    return Rest;
}());
exports.Rest = Rest;
