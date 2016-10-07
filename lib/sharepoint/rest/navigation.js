"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var queryable_1 = require("./queryable");
var quicklaunch_1 = require("./quicklaunch");
var topnavigationbar_1 = require("./topnavigationbar");
/**
 * Exposes the navigation components
 *
 */
var Navigation = (function (_super) {
    __extends(Navigation, _super);
    /**
     * Creates a new instance of the Lists class
     *
     * @param baseUrl The url or Queryable which forms the parent of this fields collection
     */
    function Navigation(baseUrl) {
        _super.call(this, baseUrl, "navigation");
    }
    Object.defineProperty(Navigation.prototype, "quicklaunch", {
        /**
         * Gets the quicklaunch navigation for the current context
         *
         */
        get: function () {
            return new quicklaunch_1.QuickLaunch(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Navigation.prototype, "topNavigationBar", {
        /**
         * Gets the top bar navigation navigation for the current context
         *
         */
        get: function () {
            return new topnavigationbar_1.TopNavigationBar(this);
        },
        enumerable: true,
        configurable: true
    });
    return Navigation;
}(queryable_1.Queryable));
exports.Navigation = Navigation;
