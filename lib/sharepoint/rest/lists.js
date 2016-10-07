"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var items_1 = require("./items");
var views_1 = require("./views");
var contenttypes_1 = require("./contenttypes");
var fields_1 = require("./fields");
var forms_1 = require("./forms");
var queryable_1 = require("./queryable");
var queryablesecurable_1 = require("./queryablesecurable");
var util_1 = require("../../utils/util");
var usercustomactions_1 = require("./usercustomactions");
var odata_1 = require("./odata");
/**
 * Describes a collection of List objects
 *
 */
var Lists = (function (_super) {
    __extends(Lists, _super);
    /**
     * Creates a new instance of the Lists class
     *
     * @param baseUrl The url or Queryable which forms the parent of this fields collection
     */
    function Lists(baseUrl, path) {
        if (path === void 0) { path = "lists"; }
        _super.call(this, baseUrl, path);
    }
    /**
     * Gets a list from the collection by title
     *
     * @param title The title of the list
     */
    Lists.prototype.getByTitle = function (title) {
        return new List(this, "getByTitle('" + title + "')");
    };
    /**
     * Gets a list from the collection by guid id
     *
     * @param title The Id of the list
     */
    Lists.prototype.getById = function (id) {
        var list = new List(this);
        list.concat("('" + id + "')");
        return list;
    };
    /**
     * Adds a new list to the collection
     *
     * @param title The new list's title
     * @param description The new list's description
     * @param template The list template value
     * @param enableContentTypes If true content types will be allowed and enabled, otherwise they will be disallowed and not enabled
     * @param additionalSettings Will be passed as part of the list creation body
     */
    /*tslint:disable max-line-length */
    Lists.prototype.add = function (title, description, template, enableContentTypes, additionalSettings) {
        var _this = this;
        if (description === void 0) { description = ""; }
        if (template === void 0) { template = 100; }
        if (enableContentTypes === void 0) { enableContentTypes = false; }
        if (additionalSettings === void 0) { additionalSettings = {}; }
        var postBody = JSON.stringify(util_1.Util.extend({
            "__metadata": { "type": "SP.List" },
            "AllowContentTypes": enableContentTypes,
            "BaseTemplate": template,
            "ContentTypesEnabled": enableContentTypes,
            "Description": description,
            "Title": title,
        }, additionalSettings));
        return this.post({ body: postBody }).then(function (data) {
            return { data: data, list: _this.getByTitle(title) };
        });
    };
    /*tslint:enable */
    /**
     * Ensures that the specified list exists in the collection (note: settings are not updated if the list exists,
     * not supported for batching)
     *
     * @param title The new list's title
     * @param description The new list's description
     * @param template The list template value
     * @param enableContentTypes If true content types will be allowed and enabled, otherwise they will be disallowed and not enabled
     * @param additionalSettings Will be passed as part of the list creation body
     */
    /*tslint:disable max-line-length */
    Lists.prototype.ensure = function (title, description, template, enableContentTypes, additionalSettings) {
        var _this = this;
        if (description === void 0) { description = ""; }
        if (template === void 0) { template = 100; }
        if (enableContentTypes === void 0) { enableContentTypes = false; }
        if (additionalSettings === void 0) { additionalSettings = {}; }
        if (this.hasBatch) {
            throw new Error("The ensure method is not supported as part of a batch.");
        }
        return new Promise(function (resolve, reject) {
            var list = _this.getByTitle(title);
            list.get().then(function (d) { return resolve({ created: false, data: d, list: list }); }).catch(function () {
                _this.add(title, description, template, enableContentTypes, additionalSettings).then(function (r) {
                    resolve({ created: true, data: r.data, list: _this.getByTitle(title) });
                });
            }).catch(function (e) { return reject(e); });
        });
    };
    /*tslint:enable */
    /**
     * Gets a list that is the default asset location for images or other files, which the users upload to their wiki pages.
     */
    /*tslint:disable member-access */
    Lists.prototype.ensureSiteAssetsLibrary = function () {
        var q = new Lists(this, "ensuresiteassetslibrary");
        return q.post().then(function (json) {
            return new List(odata_1.extractOdataId(json));
        });
    };
    /*tslint:enable */
    /**
     * Gets a list that is the default location for wiki pages.
     */
    /*tslint:disable member-access */
    Lists.prototype.ensureSitePagesLibrary = function () {
        var q = new Lists(this, "ensuresitepageslibrary");
        return q.post().then(function (json) {
            return new List(odata_1.extractOdataId(json));
        });
    };
    return Lists;
}(queryable_1.QueryableCollection));
exports.Lists = Lists;
/**
 * Describes a single List instance
 *
 */
var List = (function (_super) {
    __extends(List, _super);
    /**
     * Creates a new instance of the Lists class
     *
     * @param baseUrl The url or Queryable which forms the parent of this fields collection
     * @param path Optional, if supplied will be appended to the supplied baseUrl
     */
    function List(baseUrl, path) {
        _super.call(this, baseUrl, path);
    }
    Object.defineProperty(List.prototype, "contentTypes", {
        /**
         * Gets the content types in this list
         *
         */
        get: function () {
            return new contenttypes_1.ContentTypes(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(List.prototype, "items", {
        /**
         * Gets the items in this list
         *
         */
        get: function () {
            return new items_1.Items(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(List.prototype, "views", {
        /**
         * Gets the views in this list
         *
         */
        get: function () {
            return new views_1.Views(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(List.prototype, "fields", {
        /**
         * Gets the fields in this list
         *
         */
        get: function () {
            return new fields_1.Fields(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(List.prototype, "forms", {
        /**
         * Gets the forms in this list
         *
         */
        get: function () {
            return new forms_1.Forms(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(List.prototype, "defaultView", {
        /**
         * Gets the default view of this list
         *
         */
        get: function () {
            return new queryable_1.QueryableInstance(this, "DefaultView");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(List.prototype, "userCustomActions", {
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
    Object.defineProperty(List.prototype, "effectiveBasePermissions", {
        /**
         * Gets the effective base permissions of this list
         *
         */
        get: function () {
            return new queryable_1.Queryable(this, "EffectiveBasePermissions");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(List.prototype, "eventReceivers", {
        /**
         * Gets the event receivers attached to this list
         *
         */
        get: function () {
            return new queryable_1.QueryableCollection(this, "EventReceivers");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(List.prototype, "relatedFields", {
        /**
         * Gets the related fields of this list
         *
         */
        get: function () {
            return new queryable_1.Queryable(this, "getRelatedFields");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(List.prototype, "informationRightsManagementSettings", {
        /**
         * Gets the IRM settings for this list
         *
         */
        get: function () {
            return new queryable_1.Queryable(this, "InformationRightsManagementSettings");
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Gets a view by view guid id
     *
     */
    List.prototype.getView = function (viewId) {
        return new views_1.View(this, "getView('" + viewId + "')");
    };
    /**
     * Updates this list intance with the supplied properties
     *
     * @param properties A plain object hash of values to update for the list
     * @param eTag Value used in the IF-Match header, by default "*"
     */
    /* tslint:disable no-string-literal */
    List.prototype.update = function (properties, eTag) {
        var _this = this;
        if (eTag === void 0) { eTag = "*"; }
        var postBody = JSON.stringify(util_1.Util.extend({
            "__metadata": { "type": "SP.List" },
        }, properties));
        return this.post({
            body: postBody,
            headers: {
                "IF-Match": eTag,
                "X-HTTP-Method": "MERGE",
            },
        }).then(function (data) {
            var retList = _this;
            if (properties.hasOwnProperty("Title")) {
                retList = _this.getParent(List, _this.parentUrl, "getByTitle('" + properties["Title"] + "')");
            }
            return {
                data: data,
                list: retList,
            };
        });
    };
    /* tslint:enable */
    /**
     * Delete this list
     *
     * @param eTag Value used in the IF-Match header, by default "*"
     */
    List.prototype.delete = function (eTag) {
        if (eTag === void 0) { eTag = "*"; }
        return this.post({
            headers: {
                "IF-Match": eTag,
                "X-HTTP-Method": "DELETE",
            },
        });
    };
    /**
     * Returns the collection of changes from the change log that have occurred within the list, based on the specified query.
     */
    List.prototype.getChanges = function (query) {
        var postBody = JSON.stringify({ "query": util_1.Util.extend({ "__metadata": { "type": "SP.ChangeQuery" } }, query) });
        // don't change "this" instance of the List, make a new one
        var q = new List(this, "getchanges");
        return q.post({ body: postBody });
    };
    /**
     * Returns a collection of items from the list based on the specified query.
     *
     * @param CamlQuery The Query schema of Collaborative Application Markup
     * Language (CAML) is used in various ways within the context of Microsoft SharePoint Foundation
     * to define queries against list data.
     * see:
     *
     * https://msdn.microsoft.com/en-us/library/office/ms467521.aspx
     *
     * @param expands A URI with a $expand System Query Option indicates that Entries associated with
     * the Entry or Collection of Entries identified by the Resource Path
     * section of the URI must be represented inline (i.e. eagerly loaded).
     * see:
     *
     * https://msdn.microsoft.com/en-us/library/office/fp142385.aspx
     *
     * http://www.odata.org/documentation/odata-version-2-0/uri-conventions/#ExpandSystemQueryOption
     */
    List.prototype.getItemsByCAMLQuery = function (query) {
        var expands = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            expands[_i - 1] = arguments[_i];
        }
        var postBody = JSON.stringify({ "query": util_1.Util.extend({ "__metadata": { "type": "SP.CamlQuery" } }, query) });
        // don't change "this" instance of the List, make a new one
        var q = new List(this, "getitems");
        q = q.expand.apply(q, expands);
        return q.post({ body: postBody });
    };
    /**
     * See: https://msdn.microsoft.com/en-us/library/office/dn292554.aspx
     */
    List.prototype.getListItemChangesSinceToken = function (query) {
        var postBody = JSON.stringify({ "query": util_1.Util.extend({ "__metadata": { "type": "SP.ChangeLogItemQuery" } }, query) });
        // don't change "this" instance of the List, make a new one
        var q = new List(this, "getlistitemchangessincetoken");
        // note we are using a custom parser to return text as the response is an xml doc
        return q.post({ body: postBody }, { parse: function (r) { return r.text(); } });
    };
    /**
     * Moves the list to the Recycle Bin and returns the identifier of the new Recycle Bin item.
     */
    List.prototype.recycle = function () {
        this.append("recycle");
        return this.post().then(function (data) {
            if (data.hasOwnProperty("Recycle")) {
                return data.Recycle;
            }
            else {
                return data;
            }
        });
    };
    /**
     * Renders list data based on the view xml provided
     */
    List.prototype.renderListData = function (viewXml) {
        // don't change "this" instance of the List, make a new one
        var q = new List(this, "renderlistdata(@viewXml)");
        q.query.add("@viewXml", "'" + viewXml + "'");
        return q.post().then(function (data) {
            // data will be a string, so we parse it again
            data = JSON.parse(data);
            if (data.hasOwnProperty("RenderListData")) {
                return data.RenderListData;
            }
            else {
                return data;
            }
        });
    };
    /**
     * Gets the field values and field schema attributes for a list item.
     */
    List.prototype.renderListFormData = function (itemId, formId, mode) {
        // don't change "this" instance of the List, make a new one
        var q = new List(this, "renderlistformdata(itemid=" + itemId + ", formid='" + formId + "', mode=" + mode + ")");
        return q.post().then(function (data) {
            // data will be a string, so we parse it again
            data = JSON.parse(data);
            if (data.hasOwnProperty("ListData")) {
                return data.ListData;
            }
            else {
                return data;
            }
        });
    };
    /**
     * Reserves a list item ID for idempotent list item creation.
     */
    List.prototype.reserveListItemId = function () {
        // don't change "this" instance of the List, make a new one
        var q = new List(this, "reservelistitemid");
        return q.post().then(function (data) {
            if (data.hasOwnProperty("ReserveListItemId")) {
                return data.ReserveListItemId;
            }
            else {
                return data;
            }
        });
    };
    return List;
}(queryablesecurable_1.QueryableSecurable));
exports.List = List;
