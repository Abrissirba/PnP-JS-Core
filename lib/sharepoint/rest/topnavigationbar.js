"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var queryable_1 = require("./queryable");
/**
 * Describes the top navigation on the site
 *
 */
var TopNavigationBar = (function (_super) {
    __extends(TopNavigationBar, _super);
    /**
     * Creates a new instance of the SiteUsers class
     *
     * @param baseUrl The url or Queryable which forms the parent of this fields collection
     */
    function TopNavigationBar(baseUrl) {
        _super.call(this, baseUrl, "TopNavigationBar");
    }
    return TopNavigationBar;
}(queryable_1.QueryableInstance));
exports.TopNavigationBar = TopNavigationBar;
