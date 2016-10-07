import { Queryable, QueryableInstance, QueryableCollection } from "./queryable";
import { SiteGroups } from "./sitegroups";
import { UserIdInfo, PrincipalType } from "./types";
/**
 * Properties that provide a getter, but no setter.
 *
 */
export interface UserReadOnlyProperties {
    id?: number;
    isHiddenInUI?: boolean;
    loginName?: string;
    principalType?: PrincipalType;
    userIdInfo?: UserIdInfo;
}
/**
 * Properties that provide both a getter, and a setter.
 *
 */
export interface UserWriteableProperties {
    isSiteAdmin?: string;
    email?: string;
    title?: string;
}
/**
 * Properties that provide both a getter, and a setter.
 *
 */
export interface UserUpdateResult {
    user: SiteUser;
    data: any;
}
export interface UserProps extends UserReadOnlyProperties, UserWriteableProperties {
    __metadata: {
        id?: string;
        url?: string;
        type?: string;
    };
}
/**
 * Describes a collection of all site collection users
 *
 */
export declare class SiteUsers extends QueryableCollection {
    /**
     * Creates a new instance of the Users class
     *
     * @param baseUrl The url or Queryable which forms the parent of this user collection
     */
    constructor(baseUrl: string | Queryable, path?: string);
    /**
     * Gets a user from the collection by email
     *
     * @param email The email of the user
     */
    getByEmail(email: string): SiteUser;
    /**
     * Gets a user from the collection by id
     *
     * @param id The id of the user
     */
    getById(id: number): SiteUser;
    /**
     * Gets a user from the collection by login name
     *
     * @param loginName The email address of the user
     */
    getByLoginName(loginName: string): SiteUser;
    /**
     * Removes a user from the collection by id
     *
     * @param id The id of the user
     */
    removeById(id: number | Queryable): Promise<void>;
    /**
     * Removes a user from the collection by login name
     *
     * @param loginName The login name of the user
     */
    removeByLoginName(loginName: string): Promise<any>;
    /**
     * Add a user to a group
     *
     * @param loginName The login name of the user to add to the group
     *
     */
    add(loginName: string): Promise<SiteUser>;
}
/**
 * Describes a single user
 *
 */
export declare class SiteUser extends QueryableInstance {
    /**
     * Creates a new instance of the User class
     *
     * @param baseUrl The url or Queryable which forms the parent of this fields collection
     * @param path Optional, passes the path to the user
     */
    constructor(baseUrl: string | Queryable, path?: string);
    /**
     * Get's the groups for this user.
     *
     */
    groups: SiteGroups;
    /**
    * Updates this user instance with the supplied properties
    *
    * @param properties A plain object of property names and values to update for the user
    */
    update(properties: UserWriteableProperties): Promise<UserUpdateResult>;
    /**
     * Delete this user
     *
     */
    delete(): Promise<void>;
}
