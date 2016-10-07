"use strict";
var collections_1 = require("../collections/collections");
var util_1 = require("../utils/util");
var odata_1 = require("../sharepoint/rest/odata");
var CachedDigest = (function () {
    function CachedDigest() {
    }
    return CachedDigest;
}());
exports.CachedDigest = CachedDigest;
var DigestCache = (function () {
    function DigestCache(_httpClient, _digests) {
        if (_digests === void 0) { _digests = new collections_1.Dictionary(); }
        this._httpClient = _httpClient;
        this._digests = _digests;
    }
    DigestCache.prototype.getDigest = function (webUrl) {
        var self = this;
        var cachedDigest = this._digests.get(webUrl);
        if (cachedDigest !== null) {
            var now = new Date();
            if (now < cachedDigest.expiration) {
                return Promise.resolve(cachedDigest.value);
            }
        }
        var url = util_1.Util.combinePaths(webUrl, "/_api/contextinfo");
        return self._httpClient.fetchRaw(url, {
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Accept": "application/json;odata=verbose",
                "Content-type": "application/json;odata=verbose;charset=utf-8",
            },
            method: "POST",
        }).then(function (response) {
            var parser = new odata_1.ODataDefaultParser();
            return parser.parse(response).then(function (d) { return d.GetContextWebInformation; });
        }).then(function (data) {
            var newCachedDigest = new CachedDigest();
            newCachedDigest.value = data.FormDigestValue;
            var seconds = data.FormDigestTimeoutSeconds;
            var expiration = new Date();
            expiration.setTime(expiration.getTime() + 1000 * seconds);
            newCachedDigest.expiration = expiration;
            self._digests.add(webUrl, newCachedDigest);
            return newCachedDigest.value;
        });
    };
    DigestCache.prototype.clear = function () {
        this._digests.clear();
    };
    return DigestCache;
}());
exports.DigestCache = DigestCache;
