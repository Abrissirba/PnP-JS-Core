"use strict";
var RuntimeConfigImpl = (function () {
    function RuntimeConfigImpl() {
        // these are our default values for the library
        this._headers = null;
        this._defaultCachingStore = "session";
        this._defaultCachingTimeoutSeconds = 30;
        this._globalCacheDisable = false;
        this._useSPRequestExecutor = false;
    }
    RuntimeConfigImpl.prototype.set = function (config) {
        if (config.hasOwnProperty("headers")) {
            this._headers = config.headers;
        }
        if (config.hasOwnProperty("globalCacheDisable")) {
            this._globalCacheDisable = config.globalCacheDisable;
        }
        if (config.hasOwnProperty("defaultCachingStore")) {
            this._defaultCachingStore = config.defaultCachingStore;
        }
        if (config.hasOwnProperty("defaultCachingTimeoutSeconds")) {
            this._defaultCachingTimeoutSeconds = config.defaultCachingTimeoutSeconds;
        }
        if (config.hasOwnProperty("useSPRequestExecutor")) {
            this._useSPRequestExecutor = config.useSPRequestExecutor;
        }
        if (config.hasOwnProperty("nodeClientOptions")) {
            this._useNodeClient = true;
            this._useSPRequestExecutor = false; // just don't allow this conflict
            this._nodeClientData = config.nodeClientOptions;
            // this is to help things work when running in node.js, specifically batching
            // we shim the _spPageContextInfo object
            global._spPageContextInfo = {
                webAbsoluteUrl: config.nodeClientOptions.siteUrl,
            };
        }
        if (config.hasOwnProperty("customHttpClient")) {
            this._useNodeClient = false;
            this._useSPRequestExecutor = false; // just don't allow this conflict
            this._customHttpClient = config.customHttpClient;
        }
    };
    Object.defineProperty(RuntimeConfigImpl.prototype, "headers", {
        get: function () {
            return this._headers;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RuntimeConfigImpl.prototype, "defaultCachingStore", {
        get: function () {
            return this._defaultCachingStore;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RuntimeConfigImpl.prototype, "defaultCachingTimeoutSeconds", {
        get: function () {
            return this._defaultCachingTimeoutSeconds;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RuntimeConfigImpl.prototype, "globalCacheDisable", {
        get: function () {
            return this._globalCacheDisable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RuntimeConfigImpl.prototype, "useSPRequestExecutor", {
        get: function () {
            return this._useSPRequestExecutor;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RuntimeConfigImpl.prototype, "useNodeFetchClient", {
        get: function () {
            return this._useNodeClient;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RuntimeConfigImpl.prototype, "nodeRequestOptions", {
        get: function () {
            return this._nodeClientData;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RuntimeConfigImpl.prototype, "customHttpClient", {
        get: function () {
            return this._customHttpClient;
        },
        enumerable: true,
        configurable: true
    });
    return RuntimeConfigImpl;
}());
exports.RuntimeConfigImpl = RuntimeConfigImpl;
var _runtimeConfig = new RuntimeConfigImpl();
exports.RuntimeConfig = _runtimeConfig;
function setRuntimeConfig(config) {
    _runtimeConfig.set(config);
}
exports.setRuntimeConfig = setRuntimeConfig;
