"use strict";
/**
 * Class used to subscribe ILogListener and log messages throughout an application
 *
 */
var Logger = (function () {
    function Logger() {
    }
    Object.defineProperty(Logger, "activeLogLevel", {
        get: function () {
            return Logger.instance.activeLogLevel;
        },
        set: function (value) {
            Logger.instance.activeLogLevel = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Logger, "instance", {
        get: function () {
            if (typeof Logger._instance === "undefined" || Logger._instance === null) {
                Logger._instance = new LoggerImpl();
            }
            return Logger._instance;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Adds an ILogListener instance to the set of subscribed listeners
     *
     * @param listeners One or more listeners to subscribe to this log
     */
    Logger.subscribe = function () {
        var listeners = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            listeners[_i - 0] = arguments[_i];
        }
        for (var i = 0; i < listeners.length; i++) {
            Logger.instance.subscribe(listeners[i]);
        }
    };
    /**
     * Clears the subscribers collection, returning the collection before modifiction
     */
    Logger.clearSubscribers = function () {
        return Logger.instance.clearSubscribers();
    };
    Object.defineProperty(Logger, "count", {
        /**
         * Gets the current subscriber count
         */
        get: function () {
            return Logger.instance.count;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Writes the supplied string to the subscribed listeners
     *
     * @param message The message to write
     * @param level [Optional] if supplied will be used as the level of the entry (Default: LogLevel.Verbose)
     */
    Logger.write = function (message, level) {
        if (level === void 0) { level = Logger.LogLevel.Verbose; }
        Logger.instance.log({ level: level, message: message });
    };
    /**
     * Logs the supplied entry to the subscribed listeners
     *
     * @param entry The message to log
     */
    Logger.log = function (entry) {
        Logger.instance.log(entry);
    };
    /**
     * Logs performance tracking data for the the execution duration of the supplied function using console.profile
     *
     * @param name The name of this profile boundary
     * @param f The function to execute and track within this performance boundary
     */
    Logger.measure = function (name, f) {
        return Logger.instance.measure(name, f);
    };
    return Logger;
}());
exports.Logger = Logger;
var LoggerImpl = (function () {
    function LoggerImpl(activeLogLevel, subscribers) {
        if (activeLogLevel === void 0) { activeLogLevel = Logger.LogLevel.Warning; }
        if (subscribers === void 0) { subscribers = []; }
        this.activeLogLevel = activeLogLevel;
        this.subscribers = subscribers;
    }
    LoggerImpl.prototype.subscribe = function (listener) {
        this.subscribers.push(listener);
    };
    LoggerImpl.prototype.clearSubscribers = function () {
        var s = this.subscribers.slice(0);
        this.subscribers.length = 0;
        return s;
    };
    Object.defineProperty(LoggerImpl.prototype, "count", {
        get: function () {
            return this.subscribers.length;
        },
        enumerable: true,
        configurable: true
    });
    LoggerImpl.prototype.write = function (message, level) {
        if (level === void 0) { level = Logger.LogLevel.Verbose; }
        this.log({ level: level, message: message });
    };
    LoggerImpl.prototype.log = function (entry) {
        if (typeof entry === "undefined" || entry.level < this.activeLogLevel) {
            return;
        }
        for (var i = 0; i < this.subscribers.length; i++) {
            this.subscribers[i].log(entry);
        }
    };
    LoggerImpl.prototype.measure = function (name, f) {
        console.profile(name);
        try {
            return f();
        }
        finally {
            console.profileEnd();
        }
    };
    return LoggerImpl;
}());
/**
 * This module is merged with the Logger class and then exposed via the API as path of pnp.log
 */
var Logger;
(function (Logger) {
    /**
     * A set of logging levels
     *
     */
    (function (LogLevel) {
        LogLevel[LogLevel["Verbose"] = 0] = "Verbose";
        LogLevel[LogLevel["Info"] = 1] = "Info";
        LogLevel[LogLevel["Warning"] = 2] = "Warning";
        LogLevel[LogLevel["Error"] = 3] = "Error";
        LogLevel[LogLevel["Off"] = 99] = "Off";
    })(Logger.LogLevel || (Logger.LogLevel = {}));
    var LogLevel = Logger.LogLevel;
    /**
     * Implementation of ILogListener which logs to the browser console
     *
     */
    var ConsoleListener = (function () {
        function ConsoleListener() {
        }
        /**
         * Any associated data that a given logging listener may choose to log or ignore
         *
         * @param entry The information to be logged
         */
        ConsoleListener.prototype.log = function (entry) {
            var msg = this.format(entry);
            switch (entry.level) {
                case LogLevel.Verbose:
                case LogLevel.Info:
                    console.log(msg);
                    break;
                case LogLevel.Warning:
                    console.warn(msg);
                    break;
                case LogLevel.Error:
                    console.error(msg);
                    break;
            }
        };
        /**
         * Formats the message
         *
         * @param entry The information to format into a string
         */
        ConsoleListener.prototype.format = function (entry) {
            return "Message: " + entry.message + ". Data: " + JSON.stringify(entry.data);
        };
        return ConsoleListener;
    }());
    Logger.ConsoleListener = ConsoleListener;
    /* tslint:disable */
    /**
     * Implementation of ILogListener which logs to Azure Insights
     *
     */
    var AzureInsightsListener = (function () {
        /**
         * Creats a new instance of the AzureInsightsListener class
         *
         * @constructor
         * @param azureInsightsInstrumentationKey The instrumentation key created when the Azure Insights instance was created
         */
        function AzureInsightsListener(azureInsightsInstrumentationKey) {
            this.azureInsightsInstrumentationKey = azureInsightsInstrumentationKey;
            var appInsights = window["appInsights"] || function (config) {
                function r(config) {
                    t[config] = function () {
                        var i = arguments;
                        t.queue.push(function () { t[config].apply(t, i); });
                    };
                }
                var t = { config: config }, u = document, e = window, o = "script", s = u.createElement(o), i, f;
                for (s.src = config.url || "//az416426.vo.msecnd.net/scripts/a/ai.0.js", u.getElementsByTagName(o)[0].parentNode.appendChild(s), t.cookie = u.cookie, t.queue = [], i = ["Event", "Exception", "Metric", "PageView", "Trace"]; i.length;) {
                    r("track" + i.pop());
                }
                return r("setAuthenticatedUserContext"), r("clearAuthenticatedUserContext"), config.disableExceptionTracking || (i = "onerror", r("_" + i), f = e[i], e[i] = function (config, r, u, e, o) {
                    var s = f && f(config, r, u, e, o);
                    return s !== !0 && t["_" + i](config, r, u, e, o), s;
                }), t;
            }({
                instrumentationKey: this.azureInsightsInstrumentationKey
            });
            window["appInsights"] = appInsights;
        }
        /**
         * Any associated data that a given logging listener may choose to log or ignore
         *
         * @param entry The information to be logged
         */
        AzureInsightsListener.prototype.log = function (entry) {
            var ai = window["appInsights"];
            var msg = this.format(entry);
            if (entry.level === LogLevel.Error) {
                ai.trackException(msg);
            }
            else {
                ai.trackEvent(msg);
            }
        };
        /**
         * Formats the message
         *
         * @param entry The information to format into a string
         */
        AzureInsightsListener.prototype.format = function (entry) {
            return "Message: " + entry.message + ". Data: " + JSON.stringify(entry.data);
        };
        return AzureInsightsListener;
    }());
    Logger.AzureInsightsListener = AzureInsightsListener;
    /* tslint:enable */
    /**
     * Implementation of ILogListener which logs to the supplied function
     *
     */
    var FunctionListener = (function () {
        /**
         * Creates a new instance of the FunctionListener class
         *
         * @constructor
         * @param  method The method to which any logging data will be passed
         */
        function FunctionListener(method) {
            this.method = method;
        }
        /**
         * Any associated data that a given logging listener may choose to log or ignore
         *
         * @param entry The information to be logged
         */
        FunctionListener.prototype.log = function (entry) {
            this.method(entry);
        };
        return FunctionListener;
    }());
    Logger.FunctionListener = FunctionListener;
})(Logger = exports.Logger || (exports.Logger = {}));
