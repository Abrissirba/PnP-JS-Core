"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var queryable_1 = require("./queryable");
var queryablesecurable_1 = require("./queryablesecurable");
var folders_1 = require("./folders");
var contenttypes_1 = require("./contenttypes");
var util_1 = require("../../utils/util");
var odata_1 = require("./odata");
/**
 * Describes a collection of Item objects
 *
 */
var Items = (function (_super) {
    __extends(Items, _super);
    /**
     * Creates a new instance of the Items class
     *
     * @param baseUrl The url or Queryable which forms the parent of this fields collection
     */
    function Items(baseUrl, path) {
        if (path === void 0) { path = "items"; }
        _super.call(this, baseUrl, path);
    }
    /**
     * Gets an Item by id
     *
     * @param id The integer id of the item to retrieve
     */
    Items.prototype.getById = function (id) {
        var i = new Item(this);
        i.concat("(" + id + ")");
        return i;
    };
    /**
     * Skips the specified number of items (https://msdn.microsoft.com/en-us/library/office/fp142385.aspx#sectionSection6)
     *
     * @param skip The starting id where the page should start, use with top to specify pages
     */
    Items.prototype.skip = function (skip) {
        this._query.add("$skiptoken", encodeURIComponent("Paged=TRUE&p_ID=" + skip));
        return this;
    };
    /**
     * Gets a collection designed to aid in paging through data
     *
     */
    Items.prototype.getPaged = function () {
        return this.getAs(new PagedItemCollectionParser());
    };
    /**
     * Adds a new item to the collection
     *
     * @param properties The new items's properties
     */
    Items.prototype.add = function (properties) {
        var _this = this;
        if (properties === void 0) { properties = {}; }
        this.addBatchDependency();
        var parentList = this.getParent(queryable_1.QueryableInstance);
        return parentList.select("ListItemEntityTypeFullName").getAs().then(function (d) {
            var postBody = JSON.stringify(util_1.Util.extend({
                "__metadata": { "type": d.ListItemEntityTypeFullName },
            }, properties));
            var promise = _this.postAs({ body: postBody }).then(function (data) {
                return {
                    data: data,
                    item: _this.getById(data.Id),
                };
            });
            _this.clearBatchDependency();
            return promise;
        });
    };
    return Items;
}(queryable_1.QueryableCollection));
exports.Items = Items;
var PagedItemCollectionParser = (function (_super) {
    __extends(PagedItemCollectionParser, _super);
    function PagedItemCollectionParser() {
        _super.apply(this, arguments);
    }
    PagedItemCollectionParser.prototype.parse = function (r) {
        return PagedItemCollection.fromResponse(r);
    };
    return PagedItemCollectionParser;
}(odata_1.ODataParserBase));
/**
 * Descrines a single Item instance
 *
 */
var Item = (function (_super) {
    __extends(Item, _super);
    /**
     * Creates a new instance of the Items class
     *
     * @param baseUrl The url or Queryable which forms the parent of this fields collection
     */
    function Item(baseUrl, path) {
        _super.call(this, baseUrl, path);
    }
    Object.defineProperty(Item.prototype, "attachmentFiles", {
        /**
         * Gets the set of attachments for this item
         *
         */
        get: function () {
            return new queryable_1.QueryableCollection(this, "AttachmentFiles");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Item.prototype, "contentType", {
        /**
         * Gets the content type for this item
         *
         */
        get: function () {
            return new contenttypes_1.ContentType(this, "ContentType");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Item.prototype, "effectiveBasePermissions", {
        /**
         * Gets the effective base permissions for the item
         *
         */
        get: function () {
            return new queryable_1.Queryable(this, "EffectiveBasePermissions");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Item.prototype, "effectiveBasePermissionsForUI", {
        /**
         * Gets the effective base permissions for the item in a UI context
         *
         */
        get: function () {
            return new queryable_1.Queryable(this, "EffectiveBasePermissionsForUI");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Item.prototype, "fieldValuesAsHTML", {
        /**
         * Gets the field values for this list item in their HTML representation
         *
         */
        get: function () {
            return new queryable_1.QueryableInstance(this, "FieldValuesAsHTML");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Item.prototype, "fieldValuesAsText", {
        /**
         * Gets the field values for this list item in their text representation
         *
         */
        get: function () {
            return new queryable_1.QueryableInstance(this, "FieldValuesAsText");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Item.prototype, "fieldValuesForEdit", {
        /**
         * Gets the field values for this list item for use in editing controls
         *
         */
        get: function () {
            return new queryable_1.QueryableInstance(this, "FieldValuesForEdit");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Item.prototype, "folder", {
        /**
         * Gets the folder associated with this list item (if this item represents a folder)
         *
         */
        get: function () {
            return new folders_1.Folder(this, "Folder");
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Updates this list intance with the supplied properties
     *
     * @param properties A plain object hash of values to update for the list
     * @param eTag Value used in the IF-Match header, by default "*"
     */
    Item.prototype.update = function (properties, eTag) {
        var _this = this;
        if (eTag === void 0) { eTag = "*"; }
        this.addBatchDependency();
        var parentList = this.getParent(queryable_1.QueryableInstance, this.parentUrl.substr(0, this.parentUrl.lastIndexOf("/")));
        return parentList.select("ListItemEntityTypeFullName").getAs().then(function (d) {
            var postBody = JSON.stringify(util_1.Util.extend({
                "__metadata": { "type": d.ListItemEntityTypeFullName },
            }, properties));
            var promise = _this.post({
                body: postBody,
                headers: {
                    "IF-Match": eTag,
                    "X-HTTP-Method": "MERGE",
                },
            }).then(function (data) {
                return {
                    data: data,
                    item: _this,
                };
            });
            _this.clearBatchDependency();
            return promise;
        });
    };
    /**
     * Delete this item
     *
     * @param eTag Value used in the IF-Match header, by default "*"
     */
    Item.prototype.delete = function (eTag) {
        if (eTag === void 0) { eTag = "*"; }
        return this.post({
            headers: {
                "IF-Match": eTag,
                "X-HTTP-Method": "DELETE",
            },
        });
    };
    /**
     * Moves the list item to the Recycle Bin and returns the identifier of the new Recycle Bin item.
     */
    Item.prototype.recycle = function () {
        var i = new Item(this, "recycle");
        return i.post();
    };
    /**
     * Gets a string representation of the full URL to the WOPI frame.
     * If there is no associated WOPI application, or no associated action, an empty string is returned.
     *
     * @param action Display mode: 0: view, 1: edit, 2: mobileView, 3: interactivePreview
     */
    Item.prototype.getWopiFrameUrl = function (action) {
        if (action === void 0) { action = 0; }
        var i = new Item(this, "getWOPIFrameUrl(@action)");
        i._query.add("@action", action);
        return i.post().then(function (data) {
            return data.GetWOPIFrameUrl;
        });
    };
    /**
     * Validates and sets the values of the specified collection of fields for the list item.
     *
     * @param formValues The fields to change and their new values.
     * @param newDocumentUpdate true if the list item is a document being updated after upload; otherwise false.
     */
    /* tslint:disable max-line-length */
    Item.prototype.validateUpdateListItem = function (formValues, newDocumentUpdate) {
        if (newDocumentUpdate === void 0) { newDocumentUpdate = false; }
        var postBody = JSON.stringify({ "formValues": formValues, bNewDocumentUpdate: newDocumentUpdate });
        var item = new Item(this, "validateupdatelistitem");
        return item.post({ body: postBody });
    };
    return Item;
}(queryablesecurable_1.QueryableSecurable));
exports.Item = Item;
/**
 * Provides paging functionality for list items
 */
var PagedItemCollection = (function () {
    function PagedItemCollection() {
    }
    Object.defineProperty(PagedItemCollection.prototype, "hasNext", {
        /**
         * If true there are more results available in the set, otherwise there are not
         */
        get: function () {
            return typeof this.nextUrl === "string" && this.nextUrl.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Creats a new instance of the PagedItemCollection class from the response
     *
     * @param r Response instance from which this collection will be created
     *
     */
    PagedItemCollection.fromResponse = function (r) {
        return r.json().then(function (d) {
            var col = new PagedItemCollection();
            col.nextUrl = d["odata.nextLink"];
            col.results = d.value;
            return col;
        });
    };
    /**
     * Gets the next set of results, or resolves to null if no results are available
     */
    PagedItemCollection.prototype.getNext = function () {
        if (this.hasNext) {
            var items = new Items(this.nextUrl, null);
            return items.getPaged();
        }
        return new Promise(function (r) { return r(null); });
    };
    return PagedItemCollection;
}());
exports.PagedItemCollection = PagedItemCollection;
