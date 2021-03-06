"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var queryable_1 = require("./queryable");
var util_1 = require("../../utils/util");
/**
 * Describes the views available in the current context
 *
 */
var Views = (function (_super) {
    __extends(Views, _super);
    /**
     * Creates a new instance of the Views class
     *
     * @param baseUrl The url or Queryable which forms the parent of this fields collection
     */
    function Views(baseUrl) {
        _super.call(this, baseUrl, "views");
    }
    /**
     * Gets a view by guid id
     *
     * @param id The GUID id of the view
     */
    Views.prototype.getById = function (id) {
        var v = new View(this);
        v.concat("('" + id + "')");
        return v;
    };
    /**
     * Gets a view by title (case-sensitive)
     *
     * @param title The case-sensitive title of the view
     */
    Views.prototype.getByTitle = function (title) {
        return new View(this, "getByTitle('" + title + "')");
    };
    /**
     * Adds a new view to the collection
     *
     * @param title The new views's title
     * @param personalView True if this is a personal view, otherwise false, default = false
     * @param additionalSettings Will be passed as part of the view creation body
     */
    /*tslint:disable max-line-length */
    Views.prototype.add = function (title, personalView, additionalSettings) {
        var _this = this;
        if (personalView === void 0) { personalView = false; }
        if (additionalSettings === void 0) { additionalSettings = {}; }
        var postBody = JSON.stringify(util_1.Util.extend({
            "__metadata": { "type": "SP.View" },
            "Title": title,
            "PersonalView": personalView,
        }, additionalSettings));
        return this.postAs({ body: postBody }).then(function (data) {
            return {
                data: data,
                view: _this.getById(data.Id),
            };
        });
    };
    return Views;
}(queryable_1.QueryableCollection));
exports.Views = Views;
/**
 * Describes a single View instance
 *
 */
var View = (function (_super) {
    __extends(View, _super);
    /**
     * Creates a new instance of the View class
     *
     * @param baseUrl The url or Queryable which forms the parent of this fields collection
     */
    function View(baseUrl, path) {
        _super.call(this, baseUrl, path);
    }
    Object.defineProperty(View.prototype, "fields", {
        get: function () {
            return new ViewFields(this);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Updates this view intance with the supplied properties
     *
     * @param properties A plain object hash of values to update for the view
     */
    View.prototype.update = function (properties) {
        var _this = this;
        var postBody = JSON.stringify(util_1.Util.extend({
            "__metadata": { "type": "SP.View" },
        }, properties));
        return this.post({
            body: postBody,
            headers: {
                "X-HTTP-Method": "MERGE",
            },
        }).then(function (data) {
            return {
                data: data,
                view: _this,
            };
        });
    };
    /**
     * Delete this view
     *
     */
    View.prototype.delete = function () {
        return this.post({
            headers: {
                "X-HTTP-Method": "DELETE",
            },
        });
    };
    /**
     * Returns the list view as HTML.
     *
     */
    View.prototype.renderAsHtml = function () {
        var q = new queryable_1.Queryable(this, "renderashtml");
        return q.get();
    };
    return View;
}(queryable_1.QueryableInstance));
exports.View = View;
var ViewFields = (function (_super) {
    __extends(ViewFields, _super);
    function ViewFields(baseUrl, path) {
        if (path === void 0) { path = "viewfields"; }
        _super.call(this, baseUrl, path);
    }
    /**
     * Gets a value that specifies the XML schema that represents the collection.
     */
    ViewFields.prototype.getSchemaXml = function () {
        var q = new queryable_1.Queryable(this, "schemaxml");
        return q.get();
    };
    /**
     * Adds the field with the specified field internal name or display name to the collection.
     *
     * @param fieldTitleOrInternalName The case-sensitive internal name or display name of the field to add.
     */
    ViewFields.prototype.add = function (fieldTitleOrInternalName) {
        var q = new ViewFields(this, "addviewfield('" + fieldTitleOrInternalName + "')");
        return q.post();
    };
    /**
     * Moves the field with the specified field internal name to the specified position in the collection.
     *
     * @param fieldInternalName The case-sensitive internal name of the field to move.
     * @param index The zero-based index of the new position for the field.
     */
    ViewFields.prototype.move = function (fieldInternalName, index) {
        var q = new ViewFields(this, "moveviewfieldto");
        var postBody = JSON.stringify({ "field": fieldInternalName, "index": index });
        return q.post({ body: postBody });
    };
    /**
     * Removes all the fields from the collection.
     */
    ViewFields.prototype.removeAll = function () {
        var q = new ViewFields(this, "removeallviewfields");
        return q.post();
    };
    /**
     * Removes the field with the specified field internal name from the collection.
     *
     * @param fieldInternalName The case-sensitive internal name of the field to remove from the view.
     */
    ViewFields.prototype.remove = function (fieldInternalName) {
        var q = new ViewFields(this, "removeviewfield('" + fieldInternalName + "')");
        return q.post();
    };
    return ViewFields;
}(queryable_1.QueryableCollection));
exports.ViewFields = ViewFields;
