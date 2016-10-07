"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var queryable_1 = require("./queryable");
var util_1 = require("../../utils/util");
var UserCustomActions = (function (_super) {
    __extends(UserCustomActions, _super);
    function UserCustomActions(baseUrl, path) {
        if (path === void 0) { path = "usercustomactions"; }
        _super.call(this, baseUrl, path);
    }
    /**
     * Returns the custom action with the specified identifier.
     *
     * @param id The GUID ID of the user custom action to get.
     */
    UserCustomActions.prototype.getById = function (id) {
        return new UserCustomAction(this, "(" + id + ")");
    };
    /**
     * Create a custom action
     *
     * @param creationInfo The information which defines the new custom action
     *
     */
    UserCustomActions.prototype.add = function (properties) {
        var _this = this;
        var postBody = JSON.stringify(util_1.Util.extend({ __metadata: { "type": "SP.UserCustomAction" } }, properties));
        return this.post({ body: postBody }).then(function (data) {
            return {
                action: _this.getById(data.Id),
                data: data,
            };
        });
    };
    /**
     * Deletes all custom actions in the collection.
     *
     */
    UserCustomActions.prototype.clear = function () {
        var a = new UserCustomActions(this, "clear");
        return a.post();
    };
    return UserCustomActions;
}(queryable_1.QueryableCollection));
exports.UserCustomActions = UserCustomActions;
var UserCustomAction = (function (_super) {
    __extends(UserCustomAction, _super);
    function UserCustomAction(baseUrl, path) {
        _super.call(this, baseUrl, path);
    }
    UserCustomAction.prototype.update = function (properties) {
        var _this = this;
        var postBody = JSON.stringify(util_1.Util.extend({
            "__metadata": { "type": "SP.UserCustomAction" },
        }, properties));
        return this.post({
            body: postBody,
            headers: {
                "X-HTTP-Method": "MERGE",
            },
        }).then(function (data) {
            return {
                action: _this,
                data: data,
            };
        });
    };
    return UserCustomAction;
}(queryable_1.QueryableInstance));
exports.UserCustomAction = UserCustomAction;
