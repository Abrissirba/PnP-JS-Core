"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var queryable_1 = require("./queryable");
var sitegroups_1 = require("./sitegroups");
var util_1 = require("../../utils/util");
/**
 * Describes a collection of all site collection users
 *
 */
var SiteUsers = (function (_super) {
    __extends(SiteUsers, _super);
    /**
     * Creates a new instance of the Users class
     *
     * @param baseUrl The url or Queryable which forms the parent of this user collection
     */
    function SiteUsers(baseUrl, path) {
        if (path === void 0) { path = "siteusers"; }
        _super.call(this, baseUrl, path);
    }
    /**
     * Gets a user from the collection by email
     *
     * @param email The email of the user
     */
    SiteUsers.prototype.getByEmail = function (email) {
        return new SiteUser(this, "getByEmail('" + email + "')");
    };
    /**
     * Gets a user from the collection by id
     *
     * @param id The id of the user
     */
    SiteUsers.prototype.getById = function (id) {
        return new SiteUser(this, "getById(" + id + ")");
    };
    /**
     * Gets a user from the collection by login name
     *
     * @param loginName The email address of the user
     */
    SiteUsers.prototype.getByLoginName = function (loginName) {
        var su = new SiteUser(this);
        su.concat("(@v)");
        su.query.add("@v", encodeURIComponent(loginName));
        return su;
    };
    /**
     * Removes a user from the collection by id
     *
     * @param id The id of the user
     */
    SiteUsers.prototype.removeById = function (id) {
        var o = new SiteUsers(this, "removeById(" + id + ")");
        return o.post();
    };
    /**
     * Removes a user from the collection by login name
     *
     * @param loginName The login name of the user
     */
    SiteUsers.prototype.removeByLoginName = function (loginName) {
        var o = new SiteUsers(this, "removeByLoginName(@v)");
        o.query.add("@v", encodeURIComponent(loginName));
        return o.post();
    };
    /**
     * Add a user to a group
     *
     * @param loginName The login name of the user to add to the group
     *
     */
    SiteUsers.prototype.add = function (loginName) {
        var _this = this;
        var postBody = JSON.stringify({ "__metadata": { "type": "SP.User" }, LoginName: loginName });
        return this.post({ body: postBody }).then(function (data) { return _this.getByLoginName(loginName); });
    };
    return SiteUsers;
}(queryable_1.QueryableCollection));
exports.SiteUsers = SiteUsers;
/**
 * Describes a single user
 *
 */
var SiteUser = (function (_super) {
    __extends(SiteUser, _super);
    /**
     * Creates a new instance of the User class
     *
     * @param baseUrl The url or Queryable which forms the parent of this fields collection
     * @param path Optional, passes the path to the user
     */
    function SiteUser(baseUrl, path) {
        _super.call(this, baseUrl, path);
    }
    Object.defineProperty(SiteUser.prototype, "groups", {
        /**
         * Get's the groups for this user.
         *
         */
        get: function () {
            return new sitegroups_1.SiteGroups(this, "groups");
        },
        enumerable: true,
        configurable: true
    });
    /**
    * Updates this user instance with the supplied properties
    *
    * @param properties A plain object of property names and values to update for the user
    */
    SiteUser.prototype.update = function (properties) {
        var _this = this;
        var postBody = util_1.Util.extend({ "__metadata": { "type": "SP.User" } }, properties);
        return this.post({
            body: JSON.stringify(postBody),
            headers: {
                "X-HTTP-Method": "MERGE",
            },
        }).then(function (data) {
            return {
                data: data,
                user: _this,
            };
        });
    };
    /**
     * Delete this user
     *
     */
    SiteUser.prototype.delete = function () {
        return this.post({
            headers: {
                "X-HTTP-Method": "DELETE",
            },
        });
    };
    return SiteUser;
}(queryable_1.QueryableInstance));
exports.SiteUser = SiteUser;
