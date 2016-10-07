"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var queryable_1 = require("./queryable");
var queryablesecurable_1 = require("./queryablesecurable");
var lists_1 = require("./lists");
var fields_1 = require("./fields");
var navigation_1 = require("./navigation");
var sitegroups_1 = require("./sitegroups");
var contenttypes_1 = require("./contenttypes");
var folders_1 = require("./folders");
var roles_1 = require("./roles");
var files_1 = require("./files");
var util_1 = require("../../utils/util");
var lists_2 = require("./lists");
var siteusers_1 = require("./siteusers");
var usercustomactions_1 = require("./usercustomactions");
var odata_1 = require("./odata");
var Webs = (function (_super) {
    __extends(Webs, _super);
    function Webs(baseUrl, webPath) {
        if (webPath === void 0) { webPath = "webs"; }
        _super.call(this, baseUrl, webPath);
    }
    /**
     * Adds a new web to the collection
     *
     * @param title The new web's title
     * @param url The new web's relative url
     * @param description The web web's description
     * @param template The web's template
     * @param language The language code to use for this web
     * @param inheritPermissions If true permissions will be inherited from the partent web
     * @param additionalSettings Will be passed as part of the web creation body
     */
    Webs.prototype.add = function (title, url, description, template, language, inheritPermissions, additionalSettings) {
        if (description === void 0) { description = ""; }
        if (template === void 0) { template = "STS"; }
        if (language === void 0) { language = 1033; }
        if (inheritPermissions === void 0) { inheritPermissions = true; }
        if (additionalSettings === void 0) { additionalSettings = {}; }
        var props = util_1.Util.extend({
            Description: description,
            Language: language,
            Title: title,
            Url: url,
            UseSamePermissionsAsParentSite: inheritPermissions,
            WebTemplate: template,
        }, additionalSettings);
        var postBody = JSON.stringify({
            "parameters": util_1.Util.extend({
                "__metadata": { "type": "SP.WebCreationInformation" },
            }, props),
        });
        var q = new Webs(this, "add");
        return q.post({ body: postBody }).then(function (data) {
            return {
                data: data,
                web: new Web(odata_1.extractOdataId(data), ""),
            };
        });
    };
    return Webs;
}(queryable_1.QueryableCollection));
exports.Webs = Webs;
/**
 * Describes a web
 *
 */
var Web = (function (_super) {
    __extends(Web, _super);
    function Web(baseUrl, path) {
        if (path === void 0) { path = "_api/web"; }
        _super.call(this, baseUrl, path);
    }
    Object.defineProperty(Web.prototype, "webs", {
        get: function () {
            return new Webs(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Web.prototype, "contentTypes", {
        /**
         * Get the content types available in this web
         *
         */
        get: function () {
            return new contenttypes_1.ContentTypes(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Web.prototype, "lists", {
        /**
         * Get the lists in this web
         *
         */
        get: function () {
            return new lists_1.Lists(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Web.prototype, "fields", {
        /**
         * Gets the fields in this web
         *
         */
        get: function () {
            return new fields_1.Fields(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Web.prototype, "availablefields", {
        /**
         * Gets the available fields in this web
         *
         */
        get: function () {
            return new fields_1.Fields(this, "availablefields");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Web.prototype, "navigation", {
        /**
         * Get the navigation options in this web
         *
         */
        get: function () {
            return new navigation_1.Navigation(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Web.prototype, "siteUsers", {
        /**
         * Gets the site users
         *
         */
        get: function () {
            return new siteusers_1.SiteUsers(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Web.prototype, "siteGroups", {
        /**
         * Gets the site groups
         *
         */
        get: function () {
            return new sitegroups_1.SiteGroups(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Web.prototype, "folders", {
        /**
         * Get the folders in this web
         *
         */
        get: function () {
            return new folders_1.Folders(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Web.prototype, "userCustomActions", {
        /**
         * Get all custom actions on a site
         *
         */
        get: function () {
            return new usercustomactions_1.UserCustomActions(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Web.prototype, "roleDefinitions", {
        /**
         * Gets the collection of RoleDefinition resources.
         *
         */
        get: function () {
            return new roles_1.RoleDefinitions(this);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Get a folder by server relative url
     *
     * @param folderRelativeUrl the server relative path to the folder (including /sites/ if applicable)
     */
    Web.prototype.getFolderByServerRelativeUrl = function (folderRelativeUrl) {
        return new folders_1.Folder(this, "getFolderByServerRelativeUrl('" + folderRelativeUrl + "')");
    };
    /**
     * Get a file by server relative url
     *
     * @param fileRelativeUrl the server relative path to the file (including /sites/ if applicable)
     */
    Web.prototype.getFileByServerRelativeUrl = function (fileRelativeUrl) {
        return new files_1.File(this, "getFileByServerRelativeUrl('" + fileRelativeUrl + "')");
    };
    /**
     * Updates this web intance with the supplied properties
     *
     * @param properties A plain object hash of values to update for the web
     */
    Web.prototype.update = function (properties) {
        var _this = this;
        var postBody = JSON.stringify(util_1.Util.extend({
            "__metadata": { "type": "SP.Web" },
        }, properties));
        return this.post({
            body: postBody,
            headers: {
                "X-HTTP-Method": "MERGE",
            },
        }).then(function (data) {
            return {
                data: data,
                web: _this,
            };
        });
    };
    /**
     * Delete this web
     *
     */
    Web.prototype.delete = function () {
        return this.post({
            headers: {
                "X-HTTP-Method": "DELETE",
            },
        });
    };
    /**
     * Applies the theme specified by the contents of each of the files specified in the arguments to the site.
     *
     * @param colorPaletteUrl Server-relative URL of the color palette file.
     * @param fontSchemeUrl Server-relative URL of the font scheme.
     * @param backgroundImageUrl Server-relative URL of the background image.
     * @param shareGenerated true to store the generated theme files in the root site, or false to store them in this site.
     */
    Web.prototype.applyTheme = function (colorPaletteUrl, fontSchemeUrl, backgroundImageUrl, shareGenerated) {
        var postBody = JSON.stringify({
            backgroundImageUrl: backgroundImageUrl,
            colorPaletteUrl: colorPaletteUrl,
            fontSchemeUrl: fontSchemeUrl,
            shareGenerated: shareGenerated,
        });
        var q = new Web(this, "applytheme");
        return q.post({ body: postBody });
    };
    /**
     * Applies the specified site definition or site template to the Web site that has no template applied to it.
     *
     * @param template Name of the site definition or the name of the site template
     */
    Web.prototype.applyWebTemplate = function (template) {
        var q = new Web(this, "applywebtemplate");
        q.concat("(@t)");
        q.query.add("@t", template);
        return q.post();
    };
    /**
     * Returns whether the current user has the given set of permissions.
     *
     * @param perms The high and low permission range.
     */
    Web.prototype.doesUserHavePermissions = function (perms) {
        var q = new Web(this, "doesuserhavepermissions");
        q.concat("(@p)");
        q.query.add("@p", JSON.stringify(perms));
        return q.get();
    };
    /**
     * Checks whether the specified login name belongs to a valid user in the site. If the user doesn't exist, adds the user to the site.
     *
     * @param loginName The login name of the user (ex: i:0#.f|membership|user@domain.onmicrosoft.com)
     */
    Web.prototype.ensureUser = function (loginName) {
        // TODO:: this should resolve to a User
        var postBody = JSON.stringify({
            logonName: loginName,
        });
        var q = new Web(this, "ensureuser");
        return q.post({ body: postBody });
    };
    /**
     * Returns a collection of site templates available for the site.
     *
     * @param language The LCID of the site templates to get.
     * @param true to include language-neutral site templates; otherwise false
     */
    Web.prototype.availableWebTemplates = function (language, includeCrossLanugage) {
        if (language === void 0) { language = 1033; }
        if (includeCrossLanugage === void 0) { includeCrossLanugage = true; }
        return new queryable_1.QueryableCollection(this, "getavailablewebtemplates(lcid=" + language + ", doincludecrosslanguage=" + includeCrossLanugage + ")");
    };
    /**
     * Returns the list gallery on the site.
     *
     * @param type The gallery type - WebTemplateCatalog = 111, WebPartCatalog = 113 ListTemplateCatalog = 114,
     * MasterPageCatalog = 116, SolutionCatalog = 121, ThemeCatalog = 123, DesignCatalog = 124, AppDataCatalog = 125
     */
    /* tslint:disable member-access */
    Web.prototype.getCatalog = function (type) {
        var q = new Web(this, "getcatalog(" + type + ")");
        q.select("Id");
        return q.get().then(function (data) {
            return new lists_2.List(odata_1.extractOdataId(data));
        });
    };
    /* tslint:enable */
    /**
     * Returns the collection of changes from the change log that have occurred within the list, based on the specified query.
     */
    Web.prototype.getChanges = function (query) {
        var postBody = JSON.stringify({ "query": util_1.Util.extend({ "__metadata": { "type": "SP.ChangeQuery" } }, query) });
        // don't change "this" instance, make a new one
        var q = new Web(this, "getchanges");
        return q.post({ body: postBody });
    };
    Object.defineProperty(Web.prototype, "customListTemplate", {
        /**
         * Gets the custom list templates for the site.
         *
         */
        get: function () {
            return new queryable_1.QueryableCollection(this, "getcustomlisttemplates");
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Returns the user corresponding to the specified member identifier for the current site.
     *
     * @param id The ID of the user.
     */
    Web.prototype.getUserById = function (id) {
        return new siteusers_1.SiteUser(this, "getUserById(" + id + ")");
    };
    /**
     * Returns the name of the image file for the icon that is used to represent the specified file.
     *
     * @param filename The file name. If this parameter is empty, the server returns an empty string.
     * @param size The size of the icon: 16x16 pixels = 0, 32x32 pixels = 1.
     * @param progId The ProgID of the application that was used to create the file, in the form OLEServerName.ObjectName
     */
    Web.prototype.mapToIcon = function (filename, size, progId) {
        if (size === void 0) { size = 0; }
        if (progId === void 0) { progId = ""; }
        var q = new Web(this, "maptoicon(filename='" + filename + "', progid='" + progId + "', size=" + size + ")");
        return q.get();
    };
    return Web;
}(queryablesecurable_1.QueryableSecurable));
exports.Web = Web;
