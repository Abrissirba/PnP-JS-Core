"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var queryable_1 = require("./queryable");
var webs_1 = require("./webs");
var usercustomactions_1 = require("./usercustomactions");
/**
 * Describes a site collection
 *
 */
var Site = (function (_super) {
    __extends(Site, _super);
    /**
     * Creates a new instance of the RoleAssignments class
     *
     * @param baseUrl The url or Queryable which forms the parent of this fields collection
     */
    function Site(baseUrl, path) {
        if (path === void 0) { path = "_api/site"; }
        _super.call(this, baseUrl, path);
    }
    Object.defineProperty(Site.prototype, "rootWeb", {
        /**
         * Gets the root web of the site collection
         *
         */
        get: function () {
            return new webs_1.Web(this, "rootweb");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Site.prototype, "userCustomActions", {
        /**
         * Get all custom actions on a site collection
         *
         */
        get: function () {
            return new usercustomactions_1.UserCustomActions(this);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Gets the context information for the site.
     */
    Site.prototype.getContextInfo = function () {
        var q = new Site("", "_api/contextinfo");
        return q.post().then(function (data) {
            if (data.hasOwnProperty("GetContextWebInformation")) {
                var info = data.GetContextWebInformation;
                info.SupportedSchemaVersions = info.SupportedSchemaVersions.results;
                return info;
            }
            else {
                return data;
            }
        });
    };
    /**
     * Gets the document libraries on a site. Static method. (SharePoint Online only)
     *
     * @param absoluteWebUrl The absolute url of the web whose document libraries should be returned
     */
    Site.prototype.getDocumentLibraries = function (absoluteWebUrl) {
        var q = new queryable_1.Queryable("", "_api/sp.web.getdocumentlibraries(@v)");
        q.query.add("@v", "'" + absoluteWebUrl + "'");
        return q.get().then(function (data) {
            if (data.hasOwnProperty("GetDocumentLibraries")) {
                return data.GetDocumentLibraries;
            }
            else {
                return data;
            }
        });
    };
    /**
     * Gets the site URL from a page URL.
     *
     * @param absolutePageUrl The absolute url of the page
     */
    Site.prototype.getWebUrlFromPageUrl = function (absolutePageUrl) {
        var q = new queryable_1.Queryable("", "_api/sp.web.getweburlfrompageurl(@v)");
        q.query.add("@v", "'" + absolutePageUrl + "'");
        return q.get().then(function (data) {
            if (data.hasOwnProperty("GetWebUrlFromPageUrl")) {
                return data.GetWebUrlFromPageUrl;
            }
            else {
                return data;
            }
        });
    };
    return Site;
}(queryable_1.QueryableInstance));
exports.Site = Site;
