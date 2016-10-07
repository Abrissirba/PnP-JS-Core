"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var util_1 = require("../util");
var objecthandlerbase_1 = require("./objecthandlerbase");
/**
 * Describes the Composed Look Object Handler
 */
var ObjectComposedLook = (function (_super) {
    __extends(ObjectComposedLook, _super);
    /**
     * Creates a new instance of the ObjectComposedLook class
     */
    function ObjectComposedLook() {
        _super.call(this, "ComposedLook");
    }
    /**
     * Provisioning Composed Look
     *
     * @param object The Composed Look to provision
     */
    ObjectComposedLook.prototype.ProvisionObjects = function (object) {
        var _this = this;
        _super.prototype.scope_started.call(this);
        return new Promise(function (resolve, reject) {
            var clientContext = SP.ClientContext.get_current();
            var web = clientContext.get_web();
            var colorPaletteUrl = object.ColorPaletteUrl ? util_1.Util.replaceUrlTokens(object.ColorPaletteUrl) : "";
            var fontSchemeUrl = object.FontSchemeUrl ? util_1.Util.replaceUrlTokens(object.FontSchemeUrl) : "";
            var backgroundImageUrl = object.BackgroundImageUrl ? util_1.Util.replaceUrlTokens(object.BackgroundImageUrl) : null;
            web.applyTheme(util_1.Util.getRelativeUrl(colorPaletteUrl), util_1.Util.getRelativeUrl(fontSchemeUrl), backgroundImageUrl, true);
            web.update();
            clientContext.executeQueryAsync(function () {
                _super.prototype.scope_ended.call(_this);
                resolve();
            }, function () {
                _super.prototype.scope_ended.call(_this);
                resolve();
            });
        });
    };
    return ObjectComposedLook;
}(objecthandlerbase_1.ObjectHandlerBase));
exports.ObjectComposedLook = ObjectComposedLook;
