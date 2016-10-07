import { Queryable, QueryableCollection, QueryableInstance } from "./queryable";
import { Files } from "./files";
import { Item } from "./items";
/**
 * Describes a collection of Folder objects
 *
 */
export declare class Folders extends QueryableCollection {
    /**
     * Creates a new instance of the Folders class
     *
     * @param baseUrl The url or Queryable which forms the parent of this fields collection
     */
    constructor(baseUrl: string | Queryable, path?: string);
    /**
     * Gets a folder by folder name
     *
     */
    getByName(name: string): Folder;
    /**
     * Adds a new folder to the current folder (relative) or any folder (absolute)
     *
     * @param url The relative or absolute url where the new folder will be created. Urls starting with a forward slash are absolute.
     * @returns The new Folder and the raw response.
     */
    add(url: string): Promise<FolderAddResult>;
}
/**
 * Describes a single Folder instance
 *
 */
export declare class Folder extends QueryableInstance {
    /**
     * Creates a new instance of the Folder class
     *
     * @param baseUrl The url or Queryable which forms the parent of this fields collection
     * @param path Optional, if supplied will be appended to the supplied baseUrl
     */
    constructor(baseUrl: string | Queryable, path?: string);
    /**
     * Specifies the sequence in which content types are displayed.
     *
     */
    contentTypeOrder: QueryableCollection;
    /**
     * Gets this folder's files
     *
     */
    files: Files;
    /**
     * Gets this folder's sub folders
     *
     */
    folders: Folders;
    /**
     * Gets this folder's item count
     *
     */
    itemCount: Queryable;
    /**
     * Gets this folder's list item
     *
     */
    listItemAllFields: Item;
    /**
     * Gets the folders name
     *
     */
    name: Queryable;
    /**
     * Gets the parent folder, if available
     *
     */
    parentFolder: Folder;
    /**
     * Gets this folder's properties
     *
     */
    properties: QueryableInstance;
    /**
     * Gets this folder's server relative url
     *
     */
    serverRelativeUrl: Queryable;
    /**
     * Gets a value that specifies the content type order.
     *
     */
    uniqueContentTypeOrder: QueryableCollection;
    /**
     * Gets this folder's welcome page
     */
    welcomePage: Queryable;
    /**
    * Delete this folder
    *
    * @param eTag Value used in the IF-Match header, by default "*"
    */
    delete(eTag?: string): Promise<void>;
    /**
     * Moves the folder to the Recycle Bin and returns the identifier of the new Recycle Bin item.
     */
    recycle(): Promise<string>;
}
export interface FolderAddResult {
    folder: Folder;
    data: any;
}
