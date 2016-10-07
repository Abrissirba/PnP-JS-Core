import { RoleAssignments } from "./roles";
import { Queryable, QueryableInstance } from "./queryable";
export declare class QueryableSecurable extends QueryableInstance {
    /**
     * Gets the set of role assignments for this item
     *
     */
    roleAssignments: RoleAssignments;
    /**
     * Gets the closest securable up the security hierarchy whose permissions are applied to this list item
     *
     */
    firstUniqueAncestorSecurableObject: QueryableInstance;
    /**
     * Gets the effective permissions for the user supplied
     *
     * @param loginName The claims username for the user (ex: i:0#.f|membership|user@domain.com)
     */
    getUserEffectivePermissions(loginName: string): Queryable;
    /**
     * Breaks the security inheritance at this level optinally copying permissions and clearing subscopes
     *
     * @param copyRoleAssignments If true the permissions are copied from the current parent scope
     * @param clearSubscopes Optional. true to make all child securable objects inherit role assignments from the current object
     */
    breakRoleInheritance(copyRoleAssignments?: boolean, clearSubscopes?: boolean): Promise<any>;
    /**
     * Breaks the security inheritance at this level optinally copying permissions and clearing subscopes
     *
     */
    resetRoleInheritance(): Promise<any>;
}
