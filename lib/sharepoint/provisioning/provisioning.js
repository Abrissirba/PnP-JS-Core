"use strict";
var provisioningstep_1 = require("./provisioningstep");
var objectnavigation_1 = require("./objecthandlers/objectnavigation");
var objectpropertybagentries_1 = require("./objecthandlers/objectpropertybagentries");
var objectfeatures_1 = require("./objecthandlers/objectfeatures");
var objectwebsettings_1 = require("./objecthandlers/objectwebsettings");
var objectcomposedlook_1 = require("./objecthandlers/objectcomposedlook");
var objectcustomactions_1 = require("./objecthandlers/objectcustomactions");
var objectfiles_1 = require("./objecthandlers/objectfiles");
var objectlists_1 = require("./objecthandlers/objectlists");
var util_1 = require("./util");
var logging_1 = require("../../utils/logging");
var httpclient_1 = require("../../net/httpclient");
/**
 * Root class of Provisioning
 */
var Provisioning = (function () {
    /**
     * Creates a new instance of the Provisioning class
     */
    function Provisioning() {
        this.handlers = {
            "Navigation": objectnavigation_1.ObjectNavigation,
            "PropertyBagEntries": objectpropertybagentries_1.ObjectPropertyBagEntries,
            "Features": objectfeatures_1.ObjectFeatures,
            "WebSettings": objectwebsettings_1.ObjectWebSettings,
            "ComposedLook": objectcomposedlook_1.ObjectComposedLook,
            "CustomActions": objectcustomactions_1.ObjectCustomActions,
            "Files": objectfiles_1.ObjectFiles,
            "Lists": objectlists_1.ObjectLists,
        };
        this.httpClient = new httpclient_1.HttpClient();
    }
    /**
     * Applies a JSON template to the current web
     *
     * @param path URL to the template file
     */
    Provisioning.prototype.applyTemplate = function (path) {
        var _this = this;
        var url = util_1.Util.replaceUrlTokens(path);
        return new Promise(function (resolve, reject) {
            _this.httpClient.get(url).then(function (response) {
                if (response.ok) {
                    response.json().then(function (template) {
                        _this.start(template, Object.keys(template)).then(resolve, reject);
                    });
                }
                else {
                    reject(response.statusText);
                }
            }, function (error) {
                logging_1.Logger.write("Provisioning: The provided template is invalid", logging_1.Logger.LogLevel.Error);
            });
        });
    };
    /**
     * Starts the provisioning
     *
     * @param json The parsed template in JSON format
     * @param queue Array of Object Handlers to run
     */
    Provisioning.prototype.start = function (json, queue) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.startTime = new Date().getTime();
            _this.queueItems = [];
            queue.forEach(function (q, index) {
                if (!_this.handlers[q]) {
                    return;
                }
                _this.queueItems.push(new provisioningstep_1.ProvisioningStep(q, index, json[q], json.Parameters, _this.handlers[q]));
            });
            var promises = [];
            promises.push(new Promise(function (res) {
                logging_1.Logger.write("Provisioning: Code execution scope started", logging_1.Logger.LogLevel.Info);
                res();
            }));
            var index = 1;
            while (_this.queueItems[index - 1] !== undefined) {
                var i = promises.length - 1;
                promises.push(_this.queueItems[index - 1].execute(promises[i]));
                index++;
            }
            ;
            Promise.all(promises).then(function (value) {
                logging_1.Logger.write("Provisioning: Code execution scope ended", logging_1.Logger.LogLevel.Info);
                resolve(value);
            }, function (error) {
                logging_1.Logger.write("Provisioning: Code execution scope ended" + JSON.stringify(error), logging_1.Logger.LogLevel.Error);
                reject(error);
            });
        });
    };
    return Provisioning;
}());
exports.Provisioning = Provisioning;
