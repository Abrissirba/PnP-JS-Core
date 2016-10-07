"use strict";
/**
 * This module is substituted for the NodeFetchClient.ts during the packaging process. This helps to reduce the pnp.js file size by
 * not including all of the node dependencies
 */
var NodeFetchClient = (function () {
    function NodeFetchClient(siteUrl, _clientId, _clientSecret, _realm) {
        if (_realm === void 0) { _realm = ""; }
        this.siteUrl = siteUrl;
        this._clientId = _clientId;
        this._clientSecret = _clientSecret;
        this._realm = _realm;
    }
    /**
     * Always throws an error that NodeFetchClient is not supported for use in the browser
     */
    NodeFetchClient.prototype.fetch = function (url, options) {
        throw new Error("Using NodeFetchClient in the browser is not supported.");
    };
    return NodeFetchClient;
}());
exports.NodeFetchClient = NodeFetchClient;
