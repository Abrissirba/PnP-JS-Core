import { Queryable, QueryableInstance, QueryableCollection } from "./queryable";
import { SiteGroups } from "./sitegroups";
import { BasePermissions } from "./types";
import { TypedHash } from "../../collections/collections";
/**
 * Describes a set of role assignments for the current scope
 *
 */
export declare class RoleAssignments extends QueryableCollection {
    /**
     * Creates a new instance of the RoleAssignments class
     *
     * @param baseUrl The url or Queryable which forms the parent of this fields collection
     */
    constructor(baseUrl: string | Queryable, path?: string);
    /**
     * Adds a new role assignment with the specified principal and role definitions to the collection.
     *
     * @param principalId The ID of the user or group to assign permissions to
     * @param roleDefId The ID of the role definition that defines the permissions to assign
     *
     */
    add(principalId: number, roleDefId: number): Promise<void>;
    /**
     * Removes the role assignment with the specified principal and role definition from the collection
     *
     * @param principalId The ID of the user or group in the role assignment.
     * @param roleDefId The ID of the role definition in the role assignment
     *
     */
    remove(principalId: number, roleDefId: number): Promise<void>;
    /**
     * Gets the role assignment associated with the specified principal ID from the collection.
     *
     * @param id The id of the role assignment
     */
    getById(id: number): RoleAssignment;
}
export declare class RoleAssignment extends QueryableInstance {
    /**
 * Creates a new instance of the RoleAssignment class
 *
 * @param baseUrl The url or Queryable which forms the parent of this fields collection
 */
    constructor(baseUrl: string | Queryable, path?: string);
    groups: SiteGroups;
    /**
     * Get the role definition bindings for this role assignment
     *
     */
    bindings: RoleDefinitionBindings;
    /**
     * Delete this role assignment
     *
     */
    delete(): Promise<void>;
}
export declare class RoleDefinitions extends QueryableCollection {
    /**
     * Creates a new instance of the RoleDefinitions class
     *
     * @param baseUrl The url or Queryable which forms the parent of this fields collection
     * @param path
     *
     */
    constructor(baseUrl: string | Queryable, path?: string);
    /**
     * Gets the role definition with the specified ID from the collection.
     *
     * @param id The ID of the role definition.
     *
     */
    getById(id: number): RoleDefinition;
    /**
     * Gets the role definition with the specified name.
     *
     * @param name The name of the role definition.
     *
     */
    getByName(name: string): RoleDefinition;
    /**
     * Gets the role definition with the specified type.
     *
     * @param name The name of the role definition.
     *
     */
    getByType(roleTypeKind: number): RoleDefinition;
    /**
     * Create a role definition
     *
     * @param name The new role definition's name
     * @param description The new role definition's description
     * @param order The order in which the role definition appears
     * @param basePermissions The permissions mask for this role definition
     *
     */
    add(name: string, description: string, order: number, basePermissions: BasePermissions): Promise<RoleDefinitionAddResult>;
}
export declare class RoleDefinition extends QueryableInstance {
    constructor(baseUrl: string | Queryable, path?: string);
    /**
     * Updates this web intance with the supplied properties
     *
     * @param properties A plain object hash of values to update for the web
     */
    update(properties: TypedHash<string | number | boolean | BasePermissions>): Promise<RoleDefinitionUpdateResult>;
    /**
     * Delete this role definition
     *
     */
    delete(): Promise<void>;
}
export interface RoleDefinitionUpdateResult {
    definition: RoleDefinition;
    data: any;
}
export interface RoleDefinitionAddResult {
    definition: RoleDefinition;
    data: any;
}
export declare class RoleDefinitionBindings extends QueryableCollection {
    constructor(baseUrl: string | Queryable, path?: string);
}
