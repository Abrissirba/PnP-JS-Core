import { Queryable, QueryableInstance, QueryableCollection } from "./queryable";
import { TypedHash } from "../../collections/collections";
export declare class UserCustomActions extends QueryableCollection {
    constructor(baseUrl: string | Queryable, path?: string);
    /**
     * Returns the custom action with the specified identifier.
     *
     * @param id The GUID ID of the user custom action to get.
     */
    getById(id: string): UserCustomAction;
    /**
     * Create a custom action
     *
     * @param creationInfo The information which defines the new custom action
     *
     */
    add(properties: TypedHash<string | boolean | number>): Promise<UserCustomActionAddResult>;
    /**
     * Deletes all custom actions in the collection.
     *
     */
    clear(): Promise<void>;
}
export declare class UserCustomAction extends QueryableInstance {
    constructor(baseUrl: string | Queryable, path?: string);
    update(properties: TypedHash<string | boolean | number>): Promise<UserCustomActionUpdateResult>;
}
export interface UserCustomActionAddResult {
    data: any;
    action: UserCustomAction;
}
export interface UserCustomActionUpdateResult {
    data: any;
    action: UserCustomAction;
}
