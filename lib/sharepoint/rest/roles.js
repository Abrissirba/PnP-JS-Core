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
 * Describes a set of role assignments for the current scope
 *
 */
var RoleAssignments = (function (_super) {
    __extends(RoleAssignments, _super);
    /**
     * Creates a new instance of the RoleAssignments class
     *
     * @param baseUrl The url or Queryable which forms the parent of this fields collection
     */
    function RoleAssignments(baseUrl, path) {
        if (path === void 0) { path = "roleassignments"; }
        _super.call(this, baseUrl, path);
    }
    /**
     * Adds a new role assignment with the specified principal and role definitions to the collection.
     *
     * @param principalId The ID of the user or group to assign permissions to
     * @param roleDefId The ID of the role definition that defines the permissions to assign
     *
     */
    RoleAssignments.prototype.add = function (principalId, roleDefId) {
        var a = new RoleAssignments(this, "addroleassignment(principalid=" + principalId + ", roledefid=" + roleDefId + ")");
        return a.post();
    };
    /**
     * Removes the role assignment with the specified principal and role definition from the collection
     *
     * @param principalId The ID of the user or group in the role assignment.
     * @param roleDefId The ID of the role definition in the role assignment
     *
     */
    RoleAssignments.prototype.remove = function (principalId, roleDefId) {
        var a = new RoleAssignments(this, "removeroleassignment(principalid=" + principalId + ", roledefid=" + roleDefId + ")");
        return a.post();
    };
    /**
     * Gets the role assignment associated with the specified principal ID from the collection.
     *
     * @param id The id of the role assignment
     */
    RoleAssignments.prototype.getById = function (id) {
        var ra = new RoleAssignment(this);
        ra.concat("(" + id + ")");
        return ra;
    };
    return RoleAssignments;
}(queryable_1.QueryableCollection));
exports.RoleAssignments = RoleAssignments;
var RoleAssignment = (function (_super) {
    __extends(RoleAssignment, _super);
    /**
 * Creates a new instance of the RoleAssignment class
 *
 * @param baseUrl The url or Queryable which forms the parent of this fields collection
 */
    function RoleAssignment(baseUrl, path) {
        _super.call(this, baseUrl, path);
    }
    Object.defineProperty(RoleAssignment.prototype, "groups", {
        get: function () {
            return new sitegroups_1.SiteGroups(this, "groups");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RoleAssignment.prototype, "bindings", {
        /**
         * Get the role definition bindings for this role assignment
         *
         */
        get: function () {
            return new RoleDefinitionBindings(this);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Delete this role assignment
     *
     */
    RoleAssignment.prototype.delete = function () {
        return this.post({
            headers: {
                "X-HTTP-Method": "DELETE",
            },
        });
    };
    return RoleAssignment;
}(queryable_1.QueryableInstance));
exports.RoleAssignment = RoleAssignment;
var RoleDefinitions = (function (_super) {
    __extends(RoleDefinitions, _super);
    /**
     * Creates a new instance of the RoleDefinitions class
     *
     * @param baseUrl The url or Queryable which forms the parent of this fields collection
     * @param path
     *
     */
    function RoleDefinitions(baseUrl, path) {
        if (path === void 0) { path = "roledefinitions"; }
        _super.call(this, baseUrl, path);
    }
    /**
     * Gets the role definition with the specified ID from the collection.
     *
     * @param id The ID of the role definition.
     *
     */
    RoleDefinitions.prototype.getById = function (id) {
        return new RoleDefinition(this, "getById(" + id + ")");
    };
    /**
     * Gets the role definition with the specified name.
     *
     * @param name The name of the role definition.
     *
     */
    RoleDefinitions.prototype.getByName = function (name) {
        return new RoleDefinition(this, "getbyname('" + name + "')");
    };
    /**
     * Gets the role definition with the specified type.
     *
     * @param name The name of the role definition.
     *
     */
    RoleDefinitions.prototype.getByType = function (roleTypeKind) {
        return new RoleDefinition(this, "getbytype(" + roleTypeKind + ")");
    };
    /**
     * Create a role definition
     *
     * @param name The new role definition's name
     * @param description The new role definition's description
     * @param order The order in which the role definition appears
     * @param basePermissions The permissions mask for this role definition
     *
     */
    RoleDefinitions.prototype.add = function (name, description, order, basePermissions) {
        var _this = this;
        var postBody = JSON.stringify({
            BasePermissions: util_1.Util.extend({ __metadata: { type: "SP.BasePermissions" } }, basePermissions),
            Description: description,
            Name: name,
            Order: order,
            __metadata: { "type": "SP.RoleDefinition" },
        });
        return this.post({ body: postBody }).then(function (data) {
            return {
                data: data,
                definition: _this.getById(data.Id),
            };
        });
    };
    return RoleDefinitions;
}(queryable_1.QueryableCollection));
exports.RoleDefinitions = RoleDefinitions;
var RoleDefinition = (function (_super) {
    __extends(RoleDefinition, _super);
    function RoleDefinition(baseUrl, path) {
        _super.call(this, baseUrl, path);
    }
    /**
     * Updates this web intance with the supplied properties
     *
     * @param properties A plain object hash of values to update for the web
     */
    /* tslint:disable no-string-literal */
    RoleDefinition.prototype.update = function (properties) {
        var _this = this;
        if (typeof properties.hasOwnProperty("BasePermissions")) {
            properties["BasePermissions"] = util_1.Util.extend({ __metadata: { type: "SP.BasePermissions" } }, properties["BasePermissions"]);
        }
        var postBody = JSON.stringify(util_1.Util.extend({
            "__metadata": { "type": "SP.RoleDefinition" },
        }, properties));
        return this.post({
            body: postBody,
            headers: {
                "X-HTTP-Method": "MERGE",
            },
        }).then(function (data) {
            var retDef = _this;
            if (properties.hasOwnProperty("Name")) {
                var parent_1 = _this.getParent(RoleDefinitions, _this.parentUrl, "");
                retDef = parent_1.getByName(properties["Name"]);
            }
            return {
                data: data,
                definition: retDef,
            };
        });
    };
    /* tslint:enable */
    /**
     * Delete this role definition
     *
     */
    RoleDefinition.prototype.delete = function () {
        return this.post({
            headers: {
                "X-HTTP-Method": "DELETE",
            },
        });
    };
    return RoleDefinition;
}(queryable_1.QueryableInstance));
exports.RoleDefinition = RoleDefinition;
var RoleDefinitionBindings = (function (_super) {
    __extends(RoleDefinitionBindings, _super);
    function RoleDefinitionBindings(baseUrl, path) {
        if (path === void 0) { path = "roledefinitionbindings"; }
        _super.call(this, baseUrl, path);
    }
    return RoleDefinitionBindings;
}(queryable_1.QueryableCollection));
exports.RoleDefinitionBindings = RoleDefinitionBindings;
