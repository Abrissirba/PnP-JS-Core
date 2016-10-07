"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var util_1 = require("../../utils/util");
var logging_1 = require("../../utils/logging");
var httpclient_1 = require("../../net/httpclient");
var pnplibconfig_1 = require("../../configuration/pnplibconfig");
function extractOdataId(candidate) {
    if (candidate.hasOwnProperty("odata.id")) {
        return candidate["odata.id"];
    }
    else if (candidate.hasOwnProperty("__metadata") && candidate.__metadata.hasOwnProperty("id")) {
        return candidate.__metadata.id;
    }
    else {
        logging_1.Logger.log({
            data: candidate,
            level: logging_1.Logger.LogLevel.Error,
            message: "Could not extract odata id in object, you may be using nometadata. Object data logged to logger.",
        });
        throw new Error("Could not extract odata id in object, you may be using nometadata. Object data logged to logger.");
    }
}
exports.extractOdataId = extractOdataId;
var ODataParserBase = (function () {
    function ODataParserBase() {
    }
    ODataParserBase.prototype.parse = function (r) {
        return r.json().then(function (json) {
            var result = json;
            if (json.hasOwnProperty("d")) {
                if (json.d.hasOwnProperty("results")) {
                    result = json.d.results;
                }
                else {
                    result = json.d;
                }
            }
            else if (json.hasOwnProperty("value")) {
                result = json.value;
            }
            return result;
        });
    };
    return ODataParserBase;
}());
exports.ODataParserBase = ODataParserBase;
var ODataDefaultParser = (function (_super) {
    __extends(ODataDefaultParser, _super);
    function ODataDefaultParser() {
        _super.apply(this, arguments);
    }
    return ODataDefaultParser;
}(ODataParserBase));
exports.ODataDefaultParser = ODataDefaultParser;
var ODataRawParserImpl = (function () {
    function ODataRawParserImpl() {
    }
    ODataRawParserImpl.prototype.parse = function (r) {
        return r.json();
    };
    return ODataRawParserImpl;
}());
exports.ODataRawParserImpl = ODataRawParserImpl;
var ODataValueParserImpl = (function (_super) {
    __extends(ODataValueParserImpl, _super);
    function ODataValueParserImpl() {
        _super.apply(this, arguments);
    }
    ODataValueParserImpl.prototype.parse = function (r) {
        return _super.prototype.parse.call(this, r).then(function (d) { return d; });
    };
    return ODataValueParserImpl;
}(ODataParserBase));
var ODataEntityParserImpl = (function (_super) {
    __extends(ODataEntityParserImpl, _super);
    function ODataEntityParserImpl(factory) {
        _super.call(this);
        this.factory = factory;
    }
    ODataEntityParserImpl.prototype.parse = function (r) {
        var _this = this;
        return _super.prototype.parse.call(this, r).then(function (d) {
            var o = new _this.factory(getEntityUrl(d), null);
            return util_1.Util.extend(o, d);
        });
    };
    return ODataEntityParserImpl;
}(ODataParserBase));
var ODataEntityArrayParserImpl = (function (_super) {
    __extends(ODataEntityArrayParserImpl, _super);
    function ODataEntityArrayParserImpl(factory) {
        _super.call(this);
        this.factory = factory;
    }
    ODataEntityArrayParserImpl.prototype.parse = function (r) {
        var _this = this;
        return _super.prototype.parse.call(this, r).then(function (d) {
            return d.map(function (v) {
                var o = new _this.factory(getEntityUrl(v), null);
                return util_1.Util.extend(o, v);
            });
        });
    };
    return ODataEntityArrayParserImpl;
}(ODataParserBase));
function getEntityUrl(entity) {
    if (entity.hasOwnProperty("__metadata")) {
        // we are dealing with verbose, which has an absolute uri
        return entity.__metadata.uri;
    }
    else if (entity.hasOwnProperty("odata.editLink")) {
        // we are dealign with minimal metadata (default)
        return util_1.Util.combinePaths("_api", entity["odata.editLink"]);
    }
    else {
        // we are likely dealing with nometadata, so don't error but we won't be able to
        // chain off these objects (write something to log?)
        logging_1.Logger.write("No uri information found in ODataEntity parsing, chaining will fail for this object.", logging_1.Logger.LogLevel.Warning);
        return "";
    }
}
exports.ODataRaw = new ODataRawParserImpl();
function ODataValue() {
    return new ODataValueParserImpl();
}
exports.ODataValue = ODataValue;
function ODataEntity(factory) {
    return new ODataEntityParserImpl(factory);
}
exports.ODataEntity = ODataEntity;
function ODataEntityArray(factory) {
    return new ODataEntityArrayParserImpl(factory);
}
exports.ODataEntityArray = ODataEntityArray;
/**
 * Manages a batch of OData operations
 */
var ODataBatch = (function () {
    function ODataBatch(_batchId) {
        if (_batchId === void 0) { _batchId = util_1.Util.getGUID(); }
        this._batchId = _batchId;
        this._requests = [];
        this._batchDepCount = 0;
    }
    /**
     * Adds a request to a batch (not designed for public use)
     *
     * @param url The full url of the request
     * @param method The http method GET, POST, etc
     * @param options Any options to include in the request
     * @param parser The parser that will hadle the results of the request
     */
    ODataBatch.prototype.add = function (url, method, options, parser) {
        var info = {
            method: method.toUpperCase(),
            options: options,
            parser: parser,
            reject: null,
            resolve: null,
            url: url,
        };
        var p = new Promise(function (resolve, reject) {
            info.resolve = resolve;
            info.reject = reject;
        });
        this._requests.push(info);
        return p;
    };
    ODataBatch.prototype.incrementBatchDep = function () {
        this._batchDepCount++;
    };
    ODataBatch.prototype.decrementBatchDep = function () {
        this._batchDepCount--;
    };
    /**
     * Execute the current batch and resolve the associated promises
     *
     * @returns A promise which will be resolved once all of the batch's child promises have resolved
     */
    ODataBatch.prototype.execute = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this._batchDepCount > 0) {
                setTimeout(function () { return _this.execute(); }, 100);
            }
            else {
                _this.executeImpl().then(function () { return resolve(); }).catch(reject);
            }
        });
    };
    ODataBatch.prototype.executeImpl = function () {
        var _this = this;
        // if we don't have any requests, don't bother sending anything
        // this could be due to caching further upstream, or just an empty batch 
        if (this._requests.length < 1) {
            return new Promise(function (r) { return r(); });
        }
        // build all the requests, send them, pipe results in order to parsers
        var batchBody = [];
        var currentChangeSetId = "";
        this._requests.forEach(function (reqInfo, index) {
            if (reqInfo.method === "GET") {
                if (currentChangeSetId.length > 0) {
                    // end an existing change set
                    batchBody.push("--changeset_" + currentChangeSetId + "--\n\n");
                    currentChangeSetId = "";
                }
                batchBody.push("--batch_" + _this._batchId + "\n");
            }
            else {
                if (currentChangeSetId.length < 1) {
                    // start new change set
                    currentChangeSetId = util_1.Util.getGUID();
                    batchBody.push("--batch_" + _this._batchId + "\n");
                    batchBody.push("Content-Type: multipart/mixed; boundary=\"changeset_" + currentChangeSetId + "\"\n\n");
                }
                batchBody.push("--changeset_" + currentChangeSetId + "\n");
            }
            // common batch part prefix
            batchBody.push("Content-Type: application/http\n");
            batchBody.push("Content-Transfer-Encoding: binary\n\n");
            var headers = {
                "Accept": "application/json;",
            };
            if (reqInfo.method !== "GET") {
                var method = reqInfo.method;
                if (reqInfo.options && reqInfo.options.headers && reqInfo.options.headers["X-HTTP-Method"] !== typeof undefined) {
                    method = reqInfo.options.headers["X-HTTP-Method"];
                    delete reqInfo.options.headers["X-HTTP-Method"];
                }
                batchBody.push(method + " " + reqInfo.url + " HTTP/1.1\n");
                headers = util_1.Util.extend(headers, { "Content-Type": "application/json;odata=verbose;charset=utf-8" });
            }
            else {
                batchBody.push(reqInfo.method + " " + reqInfo.url + " HTTP/1.1\n");
            }
            if (typeof pnplibconfig_1.RuntimeConfig.headers !== "undefined") {
                headers = util_1.Util.extend(headers, pnplibconfig_1.RuntimeConfig.headers);
            }
            if (reqInfo.options && reqInfo.options.headers) {
                headers = util_1.Util.extend(headers, reqInfo.options.headers);
            }
            for (var name_1 in headers) {
                if (headers.hasOwnProperty(name_1)) {
                    batchBody.push(name_1 + ": " + headers[name_1] + "\n");
                }
            }
            batchBody.push("\n");
            if (reqInfo.options.body) {
                batchBody.push(reqInfo.options.body + "\n\n");
            }
        });
        if (currentChangeSetId.length > 0) {
            // Close the changeset
            batchBody.push("--changeset_" + currentChangeSetId + "--\n\n");
            currentChangeSetId = "";
        }
        batchBody.push("--batch_" + this._batchId + "--\n");
        var batchHeaders = {
            "Content-Type": "multipart/mixed; boundary=batch_" + this._batchId,
        };
        var batchOptions = {
            "body": batchBody.join(""),
            "headers": batchHeaders,
        };
        var client = new httpclient_1.HttpClient();
        return client.post(util_1.Util.makeUrlAbsolute("/_api/$batch"), batchOptions)
            .then(function (r) { return r.text(); })
            .then(this._parseResponse)
            .then(function (responses) {
            if (responses.length !== _this._requests.length) {
                // this is unfortunate
                throw new Error("Could not properly parse responses to match requests in batch.");
            }
            var resolutions = [];
            for (var i = 0; i < responses.length; i++) {
                var request = _this._requests[i];
                var response = responses[i];
                if (!response.ok) {
                    request.reject(new Error(response.statusText));
                }
                resolutions.push(request.parser.parse(response).then(request.resolve).catch(request.reject));
            }
            return Promise.all(resolutions);
        });
    };
    /**
     * Parses the response from a batch request into an array of Response instances
     *
     * @param body Text body of the response from the batch request
     */
    ODataBatch.prototype._parseResponse = function (body) {
        return new Promise(function (resolve, reject) {
            var responses = [];
            var header = "--batchresponse_";
            // Ex. "HTTP/1.1 500 Internal Server Error"
            var statusRegExp = new RegExp("^HTTP/[0-9.]+ +([0-9]+) +(.*)", "i");
            var lines = body.split("\n");
            var state = "batch";
            var status;
            var statusText;
            for (var i = 0; i < lines.length; ++i) {
                var line = lines[i];
                switch (state) {
                    case "batch":
                        if (line.substr(0, header.length) === header) {
                            state = "batchHeaders";
                        }
                        else {
                            if (line.trim() !== "") {
                                throw new Error("Invalid response, line " + i);
                            }
                        }
                        break;
                    case "batchHeaders":
                        if (line.trim() === "") {
                            state = "status";
                        }
                        break;
                    case "status":
                        var parts = statusRegExp.exec(line);
                        if (parts.length !== 3) {
                            throw new Error("Invalid status, line " + i);
                        }
                        status = parseInt(parts[1], 10);
                        statusText = parts[2];
                        state = "statusHeaders";
                        break;
                    case "statusHeaders":
                        if (line.trim() === "") {
                            state = "body";
                        }
                        break;
                    case "body":
                        var response = void 0;
                        if (status === 204) {
                            // https://github.com/whatwg/fetch/issues/178
                            response = new Response();
                        }
                        else {
                            response = new Response(line, { status: status, statusText: statusText });
                        }
                        responses.push(response);
                        state = "batch";
                        break;
                }
            }
            if (state !== "status") {
                reject(new Error("Unexpected end of input"));
            }
            resolve(responses);
        });
    };
    return ODataBatch;
}());
exports.ODataBatch = ODataBatch;
