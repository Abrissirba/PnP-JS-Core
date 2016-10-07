"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var roles_1 = require("./roles");
var queryable_1 = require("./queryable");
var QueryableSecurable = (function (_super) {
    __extends(QueryableSecurable, _super);
    function QueryableSecurable() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(QueryableSecurable.prototype, "roleAssignments", {
        /**
         * Gets the set of role assignments for this item
         *
         */
        get: function () {
            return new roles_1.RoleAssignments(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QueryableSecurable.prototype, "firstUniqueAncestorSecurableObject", {
        /**
         * Gets the closest securable up the security hierarchy whose permissions are applied to this list item
         *
         */
        get: function () {
            this.append("FirstUniqueAncestorSecurableObject");
            return new queryable_1.QueryableInstance(this);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Gets the effective permissions for the user supplied
     *
     * @param loginName The claims username for the user (ex: i:0#.f|membership|user@domain.com)
     */
    QueryableSecurable.prototype.getUserEffectivePermissions = function (loginName) {
        this.append("getUserEffectivePermissions(@user)");
        this._query.add("@user", "'" + encodeURIComponent(loginName) + "'");
        return new queryable_1.Queryable(this);
    };
    /**
     * Breaks the security inheritance at this level optinally copying permissions and clearing subscopes
     *
     * @param copyRoleAssignments If true the permissions are copied from the current parent scope
     * @param clearSubscopes Optional. true to make all child securable objects inherit role assignments from the current object
     */
    QueryableSecurable.prototype.breakRoleInheritance = function (copyRoleAssignments, clearSubscopes) {
        if (copyRoleAssignments === void 0) { copyRoleAssignments = false; }
        if (clearSubscopes === void 0) { clearSubscopes = false; }
        var Breaker = (function (_super) {
            __extends(Breaker, _super);
            function Breaker(baseUrl, copy, clear) {
                _super.call(this, baseUrl, "breakroleinheritance(copyroleassignments=" + copy + ", clearsubscopes=" + clear + ")");
            }
            Breaker.prototype.break = function () {
                return this.post();
            };
            return Breaker;
        }(queryable_1.Queryable));
        var b = new Breaker(this, copyRoleAssignments, clearSubscopes);
        return b.break();
    };
    /**
     * Breaks the security inheritance at this level optinally copying permissions and clearing subscopes
     *
     */
    QueryableSecurable.prototype.resetRoleInheritance = function () {
        var Resetter = (function (_super) {
            __extends(Resetter, _super);
            function Resetter(baseUrl) {
                _super.call(this, baseUrl, "resetroleinheritance");
            }
            Resetter.prototype.reset = function () {
                return this.post();
            };
            return Resetter;
        }(queryable_1.Queryable));
        var r = new Resetter(this);
        return r.reset();
    };
    return QueryableSecurable;
}(queryable_1.QueryableInstance));
exports.QueryableSecurable = QueryableSecurable;
