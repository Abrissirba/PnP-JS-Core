"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var queryable_1 = require("./queryable");
/**
 * Describes a collection of Field objects
 *
 */
var Forms = (function (_super) {
    __extends(Forms, _super);
    /**
     * Creates a new instance of the Fields class
     *
     * @param baseUrl The url or Queryable which forms the parent of this fields collection
     */
    function Forms(baseUrl, path) {
        if (path === void 0) { path = "forms"; }
        _super.call(this, baseUrl, path);
    }
    /**
     * Gets a form by id
     *
     * @param id The guid id of the item to retrieve
     */
    Forms.prototype.getById = function (id) {
        var i = new Form(this);
        i.concat("('" + id + "')");
        return i;
    };
    return Forms;
}(queryable_1.QueryableCollection));
exports.Forms = Forms;
/**
 * Describes a single of Form instance
 *
 */
var Form = (function (_super) {
    __extends(Form, _super);
    /**
     * Creates a new instance of the Form class
     *
     * @param baseUrl The url or Queryable which is the parent of this form instance
     */
    function Form(baseUrl, path) {
        _super.call(this, baseUrl, path);
    }
    return Form;
}(queryable_1.QueryableInstance));
exports.Form = Form;
