"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var queryable_1 = require("./queryable");
var siteusers_1 = require("./siteusers");
var util_1 = require("../../utils/util");
/**
 * Principal Type enum
 *
 */
(function (PrincipalType) {
    PrincipalType[PrincipalType["None"] = 0] = "None";
    PrincipalType[PrincipalType["User"] = 1] = "User";
    PrincipalType[PrincipalType["DistributionList"] = 2] = "DistributionList";
    PrincipalType[PrincipalType["SecurityGroup"] = 4] = "SecurityGroup";
    PrincipalType[PrincipalType["SharePointGroup"] = 8] = "SharePointGroup";
    PrincipalType[PrincipalType["All"] = 15] = "All";
})(exports.PrincipalType || (exports.PrincipalType = {}));
var PrincipalType = exports.PrincipalType;
/**
 * Describes a collection of site users
 *
 */
var SiteGroups = (function (_super) {
    __extends(SiteGroups, _super);
    /**
     * Creates a new instance of the SiteUsers class
     *
     * @param baseUrl The url or Queryable which forms the parent of this user collection
     */
    function SiteGroups(baseUrl, path) {
        if (path === void 0) { path = "sitegroups"; }
        _super.call(this, baseUrl, path);
    }
    /**
     * Adds a new group to the site collection
     *
     * @param props The properties to be updated
     */
    SiteGroups.prototype.add = function (properties) {
        var _this = this;
        var postBody = JSON.stringify(util_1.Util.extend({ "__metadata": { "type": "SP.Group" } }, properties));
        return this.post({ body: postBody }).then(function (data) {
            return {
                data: data,
                group: _this.getById(data.Id),
            };
        });
    };
    /**
     * Gets a group from the collection by name
     *
     * @param email The name of the group
     */
    SiteGroups.prototype.getByName = function (groupName) {
        return new SiteGroup(this, "getByName('" + groupName + "')");
    };
    /**
     * Gets a group from the collection by id
     *
     * @param id The id of the group
     */
    SiteGroups.prototype.getById = function (id) {
        var sg = new SiteGroup(this);
        sg.concat("(" + id + ")");
        return sg;
    };
    /**
     * Removes the group with the specified member ID from the collection.
     *
     * @param id The id of the group to remove
     */
    SiteGroups.prototype.removeById = function (id) {
        var g = new SiteGroups(this, "removeById('" + id + "')");
        return g.post();
    };
    /**
     * Removes a user from the collection by login name
     *
     * @param loginName The login name of the user
     */
    SiteGroups.prototype.removeByLoginName = function (loginName) {
        var g = new SiteGroups(this, "removeByLoginName('" + loginName + "')");
        return g.post();
    };
    return SiteGroups;
}(queryable_1.QueryableCollection));
exports.SiteGroups = SiteGroups;
/**
 * Describes a single group
 *
 */
var SiteGroup = (function (_super) {
    __extends(SiteGroup, _super);
    /**
     * Creates a new instance of the Group class
     *
     * @param baseUrl The url or Queryable which forms the parent of this site group
     * @param path Optional, passes the path to the group
     */
    function SiteGroup(baseUrl, path) {
        _super.call(this, baseUrl, path);
    }
    Object.defineProperty(SiteGroup.prototype, "users", {
        /**
         * Get's the users for this group
         *
         */
        get: function () {
            return new siteusers_1.SiteUsers(this, "users");
        },
        enumerable: true,
        configurable: true
    });
    /**
    * Updates this group instance with the supplied properties
    *
    * @param properties A GroupWriteableProperties object of property names and values to update for the user
    */
    /* tslint:disable no-string-literal */
    SiteGroup.prototype.update = function (properties) {
        var _this = this;
        var postBody = util_1.Util.extend({ "__metadata": { "type": "SP.Group" } }, properties);
        return this.post({
            body: JSON.stringify(postBody),
            headers: {
                "X-HTTP-Method": "MERGE",
            },
        }).then(function (data) {
            var retGroup = _this;
            if (properties.hasOwnProperty("Title")) {
                retGroup = _this.getParent(SiteGroup, _this.parentUrl, "getByName('" + properties["Title"] + "')");
            }
            return {
                data: data,
                group: retGroup,
            };
        });
    };
    return SiteGroup;
}(queryable_1.QueryableInstance));
exports.SiteGroup = SiteGroup;
