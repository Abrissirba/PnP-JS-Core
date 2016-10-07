"use strict";
var Util = (function () {
    function Util() {
    }
    /**
     * Make URL relative to host
     *
     * @param url The URL to make relative
     */
    Util.getRelativeUrl = function (url) {
        return url.replace(document.location.protocol + "//" + document.location.hostname, "");
    };
    /**
     * Replaces URL tokens in a string
     */
    Util.replaceUrlTokens = function (url) {
        return url.replace(/{site}/g, _spPageContextInfo.webAbsoluteUrl)
            .replace(/{sitecollection}/g, _spPageContextInfo.siteAbsoluteUrl)
            .replace(/{themegallery}/g, _spPageContextInfo.siteAbsoluteUrl + "/_catalogs/theme/15");
    };
    ;
    Util.encodePropertyKey = function (propKey) {
        var bytes = [];
        for (var i = 0; i < propKey.length; ++i) {
            bytes.push(propKey.charCodeAt(i));
            bytes.push(0);
        }
        var b64encoded = window.btoa(String.fromCharCode.apply(null, bytes));
        return b64encoded;
    };
    return Util;
}());
exports.Util = Util;
