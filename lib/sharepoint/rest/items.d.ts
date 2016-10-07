import { Queryable, QueryableCollection, QueryableInstance } from "./queryable";
import { QueryableSecurable } from "./queryablesecurable";
import { Folder } from "./folders";
import { ContentType } from "./contenttypes";
import { TypedHash } from "../../collections/collections";
import * as Types from "./types";
/**
 * Describes a collection of Item objects
 *
 */
export declare class Items extends QueryableCollection {
    /**
     * Creates a new instance of the Items class
     *
     * @param baseUrl The url or Queryable which forms the parent of this fields collection
     */
    constructor(baseUrl: string | Queryable, path?: string);
    /**
     * Gets an Item by id
     *
     * @param id The integer id of the item to retrieve
     */
    getById(id: number): Item;
    /**
     * Skips the specified number of items (https://msdn.microsoft.com/en-us/library/office/fp142385.aspx#sectionSection6)
     *
     * @param skip The starting id where the page should start, use with top to specify pages
     */
    skip(skip: number): QueryableCollection;
    /**
     * Gets a collection designed to aid in paging through data
     *
     */
    getPaged(): Promise<PagedItemCollection<any>>;
    /**
     * Adds a new item to the collection
     *
     * @param properties The new items's properties
     */
    add(properties?: TypedHash<string | number | boolean>): Promise<ItemAddResult>;
}
/**
 * Descrines a single Item instance
 *
 */
export declare class Item extends QueryableSecurable {
    /**
     * Creates a new instance of the Items class
     *
     * @param baseUrl The url or Queryable which forms the parent of this fields collection
     */
    constructor(baseUrl: string | Queryable, path?: string);
    /**
     * Gets the set of attachments for this item
     *
     */
    attachmentFiles: QueryableCollection;
    /**
     * Gets the content type for this item
     *
     */
    contentType: ContentType;
    /**
     * Gets the effective base permissions for the item
     *
     */
    effectiveBasePermissions: Queryable;
    /**
     * Gets the effective base permissions for the item in a UI context
     *
     */
    effectiveBasePermissionsForUI: Queryable;
    /**
     * Gets the field values for this list item in their HTML representation
     *
     */
    fieldValuesAsHTML: QueryableInstance;
    /**
     * Gets the field values for this list item in their text representation
     *
     */
    fieldValuesAsText: QueryableInstance;
    /**
     * Gets the field values for this list item for use in editing controls
     *
     */
    fieldValuesForEdit: QueryableInstance;
    /**
     * Gets the folder associated with this list item (if this item represents a folder)
     *
     */
    folder: Folder;
    /**
     * Updates this list intance with the supplied properties
     *
     * @param properties A plain object hash of values to update for the list
     * @param eTag Value used in the IF-Match header, by default "*"
     */
    update(properties: TypedHash<string | number | boolean>, eTag?: string): Promise<ItemUpdateResult>;
    /**
     * Delete this item
     *
     * @param eTag Value used in the IF-Match header, by default "*"
     */
    delete(eTag?: string): Promise<void>;
    /**
     * Moves the list item to the Recycle Bin and returns the identifier of the new Recycle Bin item.
     */
    recycle(): Promise<string>;
    /**
     * Gets a string representation of the full URL to the WOPI frame.
     * If there is no associated WOPI application, or no associated action, an empty string is returned.
     *
     * @param action Display mode: 0: view, 1: edit, 2: mobileView, 3: interactivePreview
     */
    getWopiFrameUrl(action?: number): Promise<string>;
    /**
     * Validates and sets the values of the specified collection of fields for the list item.
     *
     * @param formValues The fields to change and their new values.
     * @param newDocumentUpdate true if the list item is a document being updated after upload; otherwise false.
     */
    validateUpdateListItem(formValues: Types.ListItemFormUpdateValue[], newDocumentUpdate?: boolean): Promise<Types.ListItemFormUpdateValue[]>;
}
export interface ItemAddResult {
    item: Item;
    data: any;
}
export interface ItemUpdateResult {
    item: Item;
    data: any;
}
/**
 * Provides paging functionality for list items
 */
export declare class PagedItemCollection<T> {
    /**
     * Contains the results of the query
     */
    results: T;
    /**
     * The url to the next set of results
     */
    private nextUrl;
    /**
     * If true there are more results available in the set, otherwise there are not
     */
    hasNext: boolean;
    /**
     * Creats a new instance of the PagedItemCollection class from the response
     *
     * @param r Response instance from which this collection will be created
     *
     */
    static fromResponse(r: Response): Promise<PagedItemCollection<any>>;
    /**
     * Gets the next set of results, or resolves to null if no results are available
     */
    getNext(): Promise<PagedItemCollection<any>>;
}
