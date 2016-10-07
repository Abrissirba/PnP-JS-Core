"use strict";
var httpclient_1 = require("../../../net/httpclient");
var logging_1 = require("../../../utils/logging");
/**
 * Describes the Object Handler Base
 */
var ObjectHandlerBase = (function () {
    /**
     * Creates a new instance of the ObjectHandlerBase class
     */
    function ObjectHandlerBase(name) {
        this.name = name;
        this.httpClient = new httpclient_1.HttpClient();
    }
    /**
     * Provisioning objects
     */
    ObjectHandlerBase.prototype.ProvisionObjects = function (objects, parameters) {
        return new Promise(function (resolve, reject) { resolve("Not implemented."); });
    };
    /**
     * Writes to Logger when scope has started
     */
    ObjectHandlerBase.prototype.scope_started = function () {
        logging_1.Logger.write(this.name + ": Code execution scope started");
    };
    /**
     * Writes to Logger when scope has stopped
     */
    ObjectHandlerBase.prototype.scope_ended = function () {
        logging_1.Logger.write(this.name + ": Code execution scope stopped");
    };
    return ObjectHandlerBase;
}());
exports.ObjectHandlerBase = ObjectHandlerBase;
