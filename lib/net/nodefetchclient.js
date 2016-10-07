"use strict";
var nodeFetch = require("node-fetch");
var u = require("url");
var util_1 = require("../utils/util");
var logging_1 = require("../utils/logging");
/**
 * Fetch client for use within nodejs, requires you register a client id and secret with app only permissions
 */
var NodeFetchClient = (function () {
    function NodeFetchClient(siteUrl, _clientId, _clientSecret, _realm) {
        if (_realm === void 0) { _realm = ""; }
        this.siteUrl = siteUrl;
        this._clientId = _clientId;
        this._clientSecret = _clientSecret;
        this._realm = _realm;
        this.token = null;
        // here we "cheat" and set the globals for fetch things when this client is instantiated
        global.Headers = nodeFetch.Headers;
        global.Request = nodeFetch.Request;
        global.Response = nodeFetch.Response;
    }
    NodeFetchClient.prototype.fetch = function (url, options) {
        if (!util_1.Util.isUrlAbsolute(url)) {
            url = util_1.Util.combinePaths(this.siteUrl, url);
        }
        return this.getAddInOnlyAccessToken().then(function (token) {
            options.headers.set("Authorization", "Bearer " + token.access_token);
            return nodeFetch(url, options);
        });
    };
    /**
     * Gets an add-in only authentication token based on the supplied site url, client id and secret
     */
    NodeFetchClient.prototype.getAddInOnlyAccessToken = function () {
        var _this = this;
        if (this.token !== null && new Date() < this.toDate(this.token.expires_on)) {
            return new Promise(function (r) { return r(_this.token); });
        }
        return this.getRealm().then(function (realm) {
            var resource = _this.getFormattedPrincipal(NodeFetchClient.SharePointServicePrincipal, u.parse(_this.siteUrl).hostname, realm);
            var formattedClientId = _this.getFormattedPrincipal(_this._clientId, "", realm);
            return _this.getAuthUrl(realm).then(function (authUrl) {
                var body = [];
                body.push("grant_type=client_credentials");
                body.push("client_id=" + formattedClientId);
                body.push("client_secret=" + _this._clientSecret);
                body.push("resource=" + resource);
                return nodeFetch(authUrl, {
                    body: body.join("&"),
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    method: "POST",
                }).then(function (r) { return r.json(); }).then(function (tok) {
                    _this.token = tok;
                    return _this.token;
                });
            });
        });
    };
    NodeFetchClient.prototype.getRealm = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this._realm.length > 0) {
                resolve(_this._realm);
            }
            var url = util_1.Util.combinePaths(_this.siteUrl, "vti_bin/client.svc");
            nodeFetch(url, {
                "method": "POST",
                "headers": {
                    "Authorization": "Bearer ",
                },
            }).then(function (r) {
                var data = r.headers.get("www-authenticate");
                var index = data.indexOf("Bearer realm=\"");
                _this._realm = data.substring(index + 14, index + 50);
                resolve(_this._realm);
            });
        });
    };
    NodeFetchClient.prototype.getAuthUrl = function (realm) {
        var url = "https://accounts.accesscontrol.windows.net/metadata/json/1?realm=" + realm;
        return nodeFetch(url).then(function (r) { return r.json(); }).then(function (json) {
            for (var i = 0; i < json.endpoints.length; i++) {
                if (json.endpoints[i].protocol === "OAuth2") {
                    return json.endpoints[i].location;
                }
            }
            logging_1.Logger.log({
                data: json,
                level: logging_1.Logger.LogLevel.Error,
                message: "Auth URL Endpoint could not be determined from data. Data logged.",
            });
            throw new Error("Auth URL Endpoint could not be determined from data. Data logged.");
        });
    };
    NodeFetchClient.prototype.getFormattedPrincipal = function (principalName, hostName, realm) {
        var resource = principalName;
        if (hostName !== null && hostName !== "") {
            resource += "/" + hostName;
        }
        resource += "@" + realm;
        return resource;
    };
    NodeFetchClient.prototype.toDate = function (epoch) {
        var tmp = parseInt(epoch, 10);
        if (tmp < 10000000000) {
            tmp *= 1000;
        }
        var d = new Date();
        d.setTime(tmp);
        return d;
    };
    NodeFetchClient.SharePointServicePrincipal = "00000003-0000-0ff1-ce00-000000000000";
    return NodeFetchClient;
}());
exports.NodeFetchClient = NodeFetchClient;
