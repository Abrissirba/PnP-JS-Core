"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var queryable_1 = require("./queryable");
/**
 * Describes the quick launch navigation
 *
 */
var QuickLaunch = (function (_super) {
    __extends(QuickLaunch, _super);
    /**
     * Creates a new instance of the Lists class
     *
     * @param baseUrl The url or Queryable which forms the parent of this fields collection
     */
    function QuickLaunch(baseUrl) {
        _super.call(this, baseUrl, "QuickLaunch");
    }
    return QuickLaunch;
}(queryable_1.Queryable));
exports.QuickLaunch = QuickLaunch;
