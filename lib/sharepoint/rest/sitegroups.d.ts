import { Queryable, QueryableInstance, QueryableCollection } from "./queryable";
import { SiteUser, SiteUsers } from "./siteusers";
/**
 * Properties that provide a getter, but no setter.
 *
 */
export interface GroupReadOnlyProperties {
    canCurrentUserEditMembership?: boolean;
    canCurrentUserManageGroup?: boolean;
    canCurrentUserViewMembership?: boolean;
    id?: number;
    isHiddenInUI?: boolean;
    loginName?: string;
    ownerTitle?: string;
    principalType?: PrincipalType;
    users?: SiteUsers;
}
/**
 * Properties that provide both a getter, and a setter.
 *
 */
export interface GroupWriteableProperties {
    allowMembersEditMembership?: boolean;
    allowRequestToJoinLeave?: boolean;
    autoAcceptRequestToJoinLeave?: boolean;
    description?: string;
    onlyAllowMembersViewMembership?: boolean;
    owner?: number | SiteUser | SiteGroup;
    requestToJoinLeaveEmailSetting?: string;
    title?: string;
}
/**
 * Group Properties
 *
 */
export interface GroupProperties extends GroupReadOnlyProperties, GroupWriteableProperties {
    __metadata: {
        id?: string;
        url?: string;
        type?: string;
    };
}
/**
 * Principal Type enum
 *
 */
export declare enum PrincipalType {
    None = 0,
    User = 1,
    DistributionList = 2,
    SecurityGroup = 4,
    SharePointGroup = 8,
    All = 15,
}
/**
 * Result from adding a group.
 *
 */
export interface GroupUpdateResult {
    group: SiteGroup;
    data: any;
}
/**
 * Results from updating a group
 *
 */
export interface GroupAddResult {
    group: SiteGroup;
    data: any;
}
/**
 * Describes a collection of site users
 *
 */
export declare class SiteGroups extends QueryableCollection {
    /**
     * Creates a new instance of the SiteUsers class
     *
     * @param baseUrl The url or Queryable which forms the parent of this user collection
     */
    constructor(baseUrl: string | Queryable, path?: string);
    /**
     * Adds a new group to the site collection
     *
     * @param props The properties to be updated
     */
    add(properties: GroupWriteableProperties): Promise<GroupAddResult>;
    /**
     * Gets a group from the collection by name
     *
     * @param email The name of the group
     */
    getByName(groupName: string): SiteGroup;
    /**
     * Gets a group from the collection by id
     *
     * @param id The id of the group
     */
    getById(id: number): SiteGroup;
    /**
     * Removes the group with the specified member ID from the collection.
     *
     * @param id The id of the group to remove
     */
    removeById(id: number): Promise<void>;
    /**
     * Removes a user from the collection by login name
     *
     * @param loginName The login name of the user
     */
    removeByLoginName(loginName: string): Promise<any>;
}
/**
 * Describes a single group
 *
 */
export declare class SiteGroup extends QueryableInstance {
    /**
     * Creates a new instance of the Group class
     *
     * @param baseUrl The url or Queryable which forms the parent of this site group
     * @param path Optional, passes the path to the group
     */
    constructor(baseUrl: string | Queryable, path?: string);
    /**
     * Get's the users for this group
     *
     */
    users: SiteUsers;
    /**
    * Updates this group instance with the supplied properties
    *
    * @param properties A GroupWriteableProperties object of property names and values to update for the user
    */
    update(properties: GroupWriteableProperties): Promise<GroupUpdateResult>;
}
export interface SiteGroupAddResult {
    group: SiteGroup;
    data: GroupProperties;
}
