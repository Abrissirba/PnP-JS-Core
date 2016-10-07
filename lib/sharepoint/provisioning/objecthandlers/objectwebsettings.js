"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objecthandlerbase_1 = require("./objecthandlerbase");
/**
 * Describes the Web Settings Object Handler
 */
var ObjectWebSettings = (function (_super) {
    __extends(ObjectWebSettings, _super);
    /**
     * Creates a new instance of the ObjectWebSettings class
     */
    function ObjectWebSettings() {
        _super.call(this, "WebSettings");
    }
    /**
     * Provision Web Settings
     *
     * @param object The Web Settings to provision
     */
    ObjectWebSettings.prototype.ProvisionObjects = function (object) {
        var _this = this;
        _super.prototype.scope_started.call(this);
        return new Promise(function (resolve, reject) {
            var clientContext = SP.ClientContext.get_current();
            var web = clientContext.get_web();
            if (object.WelcomePage) {
                web.get_rootFolder().set_welcomePage(object.WelcomePage);
                web.get_rootFolder().update();
            }
            if (object.MasterUrl) {
                web.set_masterUrl(object.MasterUrl);
            }
            if (object.CustomMasterUrl) {
                web.set_customMasterUrl(object.CustomMasterUrl);
            }
            if (object.SaveSiteAsTemplateEnabled !== undefined) {
                web.set_saveSiteAsTemplateEnabled(object.SaveSiteAsTemplateEnabled);
            }
            if (object.QuickLaunchEnabled !== undefined) {
                web.set_saveSiteAsTemplateEnabled(object.QuickLaunchEnabled);
            }
            if (object.TreeViewEnabled !== undefined) {
                web.set_treeViewEnabled(object.TreeViewEnabled);
            }
            web.update();
            clientContext.load(web);
            clientContext.executeQueryAsync(function () {
                _super.prototype.scope_ended.call(_this);
                resolve();
            }, function () {
                _super.prototype.scope_ended.call(_this);
                resolve();
            });
        });
    };
    return ObjectWebSettings;
}(objecthandlerbase_1.ObjectHandlerBase));
exports.ObjectWebSettings = ObjectWebSettings;
