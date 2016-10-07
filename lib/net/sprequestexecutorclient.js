"use strict";
var util_1 = require("../utils/util");
/**
 * Makes requests using the SP.RequestExecutor library.
 */
var SPRequestExecutorClient = (function () {
    function SPRequestExecutorClient() {
        /**
         * Converts a SharePoint REST API response to a fetch API response.
         */
        this.convertToResponse = function (spResponse) {
            var responseHeaders = new Headers();
            for (var h in spResponse.headers) {
                if (spResponse.headers[h]) {
                    responseHeaders.append(h, spResponse.headers[h]);
                }
            }
            return new Response(spResponse.body, {
                headers: responseHeaders,
                status: spResponse.statusCode,
                statusText: spResponse.statusText,
            });
        };
    }
    /**
     * Fetches a URL using the SP.RequestExecutor library.
     */
    SPRequestExecutorClient.prototype.fetch = function (url, options) {
        var _this = this;
        if (typeof SP === "undefined" || typeof SP.RequestExecutor === "undefined") {
            throw new Error("SP.RequestExecutor is undefined. " +
                "Load the SP.RequestExecutor.js library (/_layouts/15/SP.RequestExecutor.js) before loading the PnP JS Core library.");
        }
        var addinWebUrl = url.substring(0, url.indexOf("/_api")), executor = new SP.RequestExecutor(addinWebUrl), headers = {}, iterator, temp;
        if (options.headers && options.headers instanceof Headers) {
            iterator = options.headers.entries();
            temp = iterator.next();
            while (!temp.done) {
                headers[temp.value[0]] = temp.value[1];
                temp = iterator.next();
            }
        }
        else {
            headers = options.headers;
        }
        return new Promise(function (resolve, reject) {
            var requestOptions = {
                error: function (error) {
                    reject(_this.convertToResponse(error));
                },
                headers: headers,
                method: options.method,
                success: function (response) {
                    resolve(_this.convertToResponse(response));
                },
                url: url,
            };
            if (options.body) {
                util_1.Util.extend(requestOptions, { body: options.body });
            }
            else {
                util_1.Util.extend(requestOptions, { binaryStringRequestBody: true });
            }
            executor.executeAsync(requestOptions);
        });
    };
    return SPRequestExecutorClient;
}());
exports.SPRequestExecutorClient = SPRequestExecutorClient;
