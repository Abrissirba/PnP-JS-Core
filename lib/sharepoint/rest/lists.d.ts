import { Items } from "./items";
import { Views, View } from "./views";
import { ContentTypes } from "./contenttypes";
import { Fields } from "./fields";
import { Forms } from "./forms";
import { Queryable, QueryableInstance, QueryableCollection } from "./queryable";
import { QueryableSecurable } from "./queryablesecurable";
import { TypedHash } from "../../collections/collections";
import { ControlMode, RenderListData, ChangeQuery, CamlQuery, ChangeLogitemQuery, ListFormData } from "./types";
import { UserCustomActions } from "./usercustomactions";
/**
 * Describes a collection of List objects
 *
 */
export declare class Lists extends QueryableCollection {
    /**
     * Creates a new instance of the Lists class
     *
     * @param baseUrl The url or Queryable which forms the parent of this fields collection
     */
    constructor(baseUrl: string | Queryable, path?: string);
    /**
     * Gets a list from the collection by title
     *
     * @param title The title of the list
     */
    getByTitle(title: string): List;
    /**
     * Gets a list from the collection by guid id
     *
     * @param title The Id of the list
     */
    getById(id: string): List;
    /**
     * Adds a new list to the collection
     *
     * @param title The new list's title
     * @param description The new list's description
     * @param template The list template value
     * @param enableContentTypes If true content types will be allowed and enabled, otherwise they will be disallowed and not enabled
     * @param additionalSettings Will be passed as part of the list creation body
     */
    add(title: string, description?: string, template?: number, enableContentTypes?: boolean, additionalSettings?: TypedHash<string | number | boolean>): Promise<ListAddResult>;
    /**
     * Ensures that the specified list exists in the collection (note: settings are not updated if the list exists,
     * not supported for batching)
     *
     * @param title The new list's title
     * @param description The new list's description
     * @param template The list template value
     * @param enableContentTypes If true content types will be allowed and enabled, otherwise they will be disallowed and not enabled
     * @param additionalSettings Will be passed as part of the list creation body
     */
    ensure(title: string, description?: string, template?: number, enableContentTypes?: boolean, additionalSettings?: TypedHash<string | number | boolean>): Promise<ListEnsureResult>;
    /**
     * Gets a list that is the default asset location for images or other files, which the users upload to their wiki pages.
     */
    ensureSiteAssetsLibrary(): Promise<List>;
    /**
     * Gets a list that is the default location for wiki pages.
     */
    ensureSitePagesLibrary(): Promise<List>;
}
/**
 * Describes a single List instance
 *
 */
export declare class List extends QueryableSecurable {
    /**
     * Creates a new instance of the Lists class
     *
     * @param baseUrl The url or Queryable which forms the parent of this fields collection
     * @param path Optional, if supplied will be appended to the supplied baseUrl
     */
    constructor(baseUrl: string | Queryable, path?: string);
    /**
     * Gets the content types in this list
     *
     */
    contentTypes: ContentTypes;
    /**
     * Gets the items in this list
     *
     */
    items: Items;
    /**
     * Gets the views in this list
     *
     */
    views: Views;
    /**
     * Gets the fields in this list
     *
     */
    fields: Fields;
    /**
     * Gets the forms in this list
     *
     */
    forms: Forms;
    /**
     * Gets the default view of this list
     *
     */
    defaultView: QueryableInstance;
    /**
     * Get all custom actions on a site collection
     *
     */
    userCustomActions: UserCustomActions;
    /**
     * Gets the effective base permissions of this list
     *
     */
    effectiveBasePermissions: Queryable;
    /**
     * Gets the event receivers attached to this list
     *
     */
    eventReceivers: QueryableCollection;
    /**
     * Gets the related fields of this list
     *
     */
    relatedFields: Queryable;
    /**
     * Gets the IRM settings for this list
     *
     */
    informationRightsManagementSettings: Queryable;
    /**
     * Gets a view by view guid id
     *
     */
    getView(viewId: string): View;
    /**
     * Updates this list intance with the supplied properties
     *
     * @param properties A plain object hash of values to update for the list
     * @param eTag Value used in the IF-Match header, by default "*"
     */
    update(properties: TypedHash<string | number | boolean>, eTag?: string): Promise<ListUpdateResult>;
    /**
     * Delete this list
     *
     * @param eTag Value used in the IF-Match header, by default "*"
     */
    delete(eTag?: string): Promise<void>;
    /**
     * Returns the collection of changes from the change log that have occurred within the list, based on the specified query.
     */
    getChanges(query: ChangeQuery): Promise<any>;
    /**
     * Returns a collection of items from the list based on the specified query.
     *
     * @param CamlQuery The Query schema of Collaborative Application Markup
     * Language (CAML) is used in various ways within the context of Microsoft SharePoint Foundation
     * to define queries against list data.
     * see:
     *
     * https://msdn.microsoft.com/en-us/library/office/ms467521.aspx
     *
     * @param expands A URI with a $expand System Query Option indicates that Entries associated with
     * the Entry or Collection of Entries identified by the Resource Path
     * section of the URI must be represented inline (i.e. eagerly loaded).
     * see:
     *
     * https://msdn.microsoft.com/en-us/library/office/fp142385.aspx
     *
     * http://www.odata.org/documentation/odata-version-2-0/uri-conventions/#ExpandSystemQueryOption
     */
    getItemsByCAMLQuery(query: CamlQuery, ...expands: string[]): Promise<any>;
    /**
     * See: https://msdn.microsoft.com/en-us/library/office/dn292554.aspx
     */
    getListItemChangesSinceToken(query: ChangeLogitemQuery): Promise<string>;
    /**
     * Moves the list to the Recycle Bin and returns the identifier of the new Recycle Bin item.
     */
    recycle(): Promise<string>;
    /**
     * Renders list data based on the view xml provided
     */
    renderListData(viewXml: string): Promise<RenderListData>;
    /**
     * Gets the field values and field schema attributes for a list item.
     */
    renderListFormData(itemId: number, formId: string, mode: ControlMode): Promise<ListFormData>;
    /**
     * Reserves a list item ID for idempotent list item creation.
     */
    reserveListItemId(): Promise<number>;
}
export interface ListAddResult {
    list: List;
    data: any;
}
export interface ListUpdateResult {
    list: List;
    data: any;
}
export interface ListEnsureResult {
    list: List;
    created: boolean;
    data: any;
}
