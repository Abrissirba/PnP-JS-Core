"use strict";
var fetchclient_1 = require("./fetchclient");
var digestcache_1 = require("./digestcache");
var util_1 = require("../utils/util");
var pnplibconfig_1 = require("../configuration/pnplibconfig");
var sprequestexecutorclient_1 = require("./sprequestexecutorclient");
var nodefetchclient_1 = require("./nodefetchclient");
var HttpClient = (function () {
    function HttpClient() {
        this._impl = this.getFetchImpl();
        this._digestCache = new digestcache_1.DigestCache(this);
    }
    HttpClient.prototype.fetch = function (url, options) {
        if (options === void 0) { options = {}; }
        var self = this;
        var opts = util_1.Util.extend(options, { cache: "no-cache", credentials: "same-origin" }, true);
        var headers = new Headers();
        // first we add the global headers so they can be overwritten by any passed in locally to this call
        this.mergeHeaders(headers, pnplibconfig_1.RuntimeConfig.headers);
        // second we add the local options so we can overwrite the globals
        this.mergeHeaders(headers, options.headers);
        // lastly we apply any default headers we need that may not exist
        if (!headers.has("Accept")) {
            headers.append("Accept", "application/json");
        }
        if (!headers.has("Content-Type")) {
            headers.append("Content-Type", "application/json;odata=verbose;charset=utf-8");
        }
        if (!headers.has("X-ClientService-ClientTag")) {
            headers.append("X-ClientService-ClientTag", "PnPCoreJS:1.0.4");
        }
        opts = util_1.Util.extend(opts, { headers: headers });
        if (opts.method && opts.method.toUpperCase() !== "GET") {
            if (!headers.has("X-RequestDigest")) {
                var index = url.indexOf("_api/");
                if (index < 0) {
                    throw new Error("Unable to determine API url");
                }
                var webUrl = url.substr(0, index);
                return this._digestCache.getDigest(webUrl)
                    .then(function (digest) {
                    headers.append("X-RequestDigest", digest);
                    return self.fetchRaw(url, opts);
                });
            }
        }
        return self.fetchRaw(url, opts);
    };
    HttpClient.prototype.fetchRaw = function (url, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        // here we need to normalize the headers
        var rawHeaders = new Headers();
        this.mergeHeaders(rawHeaders, options.headers);
        options = util_1.Util.extend(options, { headers: rawHeaders });
        var retry = function (ctx) {
            _this._impl.fetch(url, options).then(function (response) { return ctx.resolve(response); }).catch(function (response) {
                // grab our current delay
                var delay = ctx.delay;
                // Check if request was throttled - http status code 429 
                // Check is request failed due to server unavailable - http status code 503 
                if (response.status !== 429 && response.status !== 503) {
                    ctx.reject(response);
                }
                // Increment our counters.
                ctx.delay *= 2;
                ctx.attempts++;
                // If we have exceeded the retry count, reject.
                if (ctx.retryCount <= ctx.attempts) {
                    ctx.reject(response);
                }
                // Set our retry timeout for {delay} milliseconds.
                setTimeout(util_1.Util.getCtxCallback(_this, retry, ctx), delay);
            });
        };
        return new Promise(function (resolve, reject) {
            var retryContext = {
                attempts: 0,
                delay: 100,
                reject: reject,
                resolve: resolve,
                retryCount: 7,
            };
            retry.call(_this, retryContext);
        });
    };
    HttpClient.prototype.get = function (url, options) {
        if (options === void 0) { options = {}; }
        var opts = util_1.Util.extend(options, { method: "GET" });
        return this.fetch(url, opts);
    };
    HttpClient.prototype.post = function (url, options) {
        if (options === void 0) { options = {}; }
        var opts = util_1.Util.extend(options, { method: "POST" });
        return this.fetch(url, opts);
    };
    HttpClient.prototype.getFetchImpl = function () {
        if (pnplibconfig_1.RuntimeConfig.useSPRequestExecutor) {
            return new sprequestexecutorclient_1.SPRequestExecutorClient();
        }
        else if (pnplibconfig_1.RuntimeConfig.useNodeFetchClient) {
            var opts = pnplibconfig_1.RuntimeConfig.nodeRequestOptions;
            return new nodefetchclient_1.NodeFetchClient(opts.siteUrl, opts.clientId, opts.clientSecret);
        }
        else if (pnplibconfig_1.RuntimeConfig.customHttpClient) {
            if (typeof pnplibconfig_1.RuntimeConfig.customHttpClient === "object") {
                return pnplibconfig_1.RuntimeConfig.customHttpClient;
            }
            return new pnplibconfig_1.RuntimeConfig.customHttpClient();
        }
        else {
            return new fetchclient_1.FetchClient();
        }
    };
    HttpClient.prototype.mergeHeaders = function (target, source) {
        if (typeof source !== "undefined" && source !== null) {
            var temp = new Request("", { headers: source });
            temp.headers.forEach(function (value, name) {
                target.append(name, value);
            });
        }
    };
    return HttpClient;
}());
exports.HttpClient = HttpClient;
