import { Queryable, QueryableCollection, QueryableInstance } from "./queryable";
import { Item } from "./items";
/**
 * Describes a collection of File objects
 *
 */
export declare class Files extends QueryableCollection {
    /**
     * Creates a new instance of the Files class
     *
     * @param baseUrl The url or Queryable which forms the parent of this fields collection
     */
    constructor(baseUrl: string | Queryable, path?: string);
    /**
     * Gets a File by filename
     *
     * @param name The name of the file, including extension.
     */
    getByName(name: string): File;
    /**
     * Uploads a file.
     *
     * @param url The folder-relative url of the file.
     * @param shouldOverWrite Should a file with the same name in the same location be overwritten?
     * @param content The file contents blob.
     * @returns The new File and the raw response.
     */
    add(url: string, content: Blob, shouldOverWrite?: boolean): Promise<FileAddResult>;
    /**
     * Adds a ghosted file to an existing list or document library.
     *
     * @param fileUrl The server-relative url where you want to save the file.
     * @param templateFileType The type of use to create the file.
     * @returns The template file that was added and the raw response.
     */
    addTemplateFile(fileUrl: string, templateFileType: TemplateFileType): Promise<FileAddResult>;
}
/**
 * Describes a single File instance
 *
 */
export declare class File extends QueryableInstance {
    /**
     * Creates a new instance of the File class
     *
     * @param baseUrl The url or Queryable which forms the parent of this fields collection
     * @param path Optional, if supplied will be appended to the supplied baseUrl
     */
    constructor(baseUrl: string | Queryable, path?: string);
    /**
     * Gets a value that specifies the user who added the file.
     *
     */
    author: Queryable;
    /**
     * Gets a result indicating the current user who has the file checked out.
     *
     */
    checkedOutByUser: Queryable;
    /**
     * Gets a value that returns the comment used when a document is checked in to a document library.
     *
     */
    checkInComment: Queryable;
    /**
     * Gets a value that indicates how the file is checked out of a document library.
     * The checkout state of a file is independent of its locked state.
     *
     */
    checkOutType: Queryable;
    /**
     * Returns internal version of content, used to validate document equality for read purposes.
     *
     */
    contentTag: Queryable;
    /**
     * Gets a value that specifies the customization status of the file.
     *
     */
    customizedPageStatus: Queryable;
    /**
     * Gets the current eTag of a file
     *
     */
    eTag: Queryable;
    /**
     * Gets a value that specifies whether the file exists.
     *
     */
    exists: Queryable;
    /**
     * Gets the size of the file in bytes, excluding the size of any Web Parts that are used in the file.
     */
    length: Queryable;
    /**
     * Gets a value that specifies the publishing level of the file.
     *
     */
    level: Queryable;
    /**
     * Gets a value that specifies the list item field values for the list item corresponding to the file.
     *
     */
    listItemAllFields: Item;
    /**
     * Gets a value that returns the user that owns the current lock on the file.
     *
     */
    lockedByUser: Queryable;
    /**
     * Gets a value that specifies the major version of the file.
     *
     */
    majorVersion: Queryable;
    /**
     * Gets a value that specifies the minor version of the file.
     *
     */
    minorVersion: Queryable;
    /**
     * Gets a value that returns the user who last modified the file.
     *
     */
    modifiedBy: Queryable;
    /**
     * Gets the name of the file including the extension.
     *
     */
    name: Queryable;
    /**
     * Gets the server relative url of a file
     *
     */
    serverRelativeUrl: Queryable;
    /**
     * Gets a value that specifies when the file was created.
     *
     */
    timeCreated: Queryable;
    /**
     * Gets a value that specifies when the file was last modified.
     *
     */
    timeLastModified: Queryable;
    /**
     * Gets a value that specifies the display name of the file.
     *
     */
    title: Queryable;
    /**
     * Gets a value that specifies the implementation-specific version identifier of the file.
     *
     */
    uiVersion: Queryable;
    /**
     * Gets a value that specifies the implementation-specific version identifier of the file.
     *
     */
    uiVersionLabel: Queryable;
    /**
     * Gets a collection of versions
     *
     */
    versions: Versions;
    /**
     * Gets the contents of the file - If the file is not JSON a custom parser function should be used with the get call
     *
     */
    value: Queryable;
    /**
     * Approves the file submitted for content approval with the specified comment.
     * Only documents in lists that are enabled for content approval can be approved.
     *
     * @param comment The comment for the approval.
     */
    approve(comment: string): Promise<void>;
    /**
     * Stops the chunk upload session without saving the uploaded data.
     * If the file doesn’t already exist in the library, the partially uploaded file will be deleted.
     * Use this in response to user action (as in a request to cancel an upload) or an error or exception.
     * Use the uploadId value that was passed to the StartUpload method that started the upload session.
     * This method is currently available only on Office 365.
     *
     * @param uploadId The unique identifier of the upload session.
     */
    cancelUpload(uploadId: string): Promise<void>;
    /**
     * Checks the file in to a document library based on the check-in type.
     *
     * @param comment A comment for the check-in. Its length must be <= 1023.
     * @param checkinType The check-in type for the file.
     */
    checkin(comment?: string, checkinType?: CheckinType): Promise<void>;
    /**
     * Checks out the file from a document library.
     */
    checkout(): Promise<void>;
    /**
     * Continues the chunk upload session with an additional fragment.
     * The current file content is not changed.
     * Use the uploadId value that was passed to the StartUpload method that started the upload session.
     * This method is currently available only on Office 365.
     *
     * @param uploadId The unique identifier of the upload session.
     * @param fileOffset The size of the offset into the file where the fragment starts.
     * @param fragment The file contents.
     * @returns The size of the total uploaded data in bytes.
     */
    continueUpload(uploadId: string, fileOffset: number, b: Blob): Promise<number>;
    /**
     * Copies the file to the destination url.
     *
     * @param url The absolute url or server relative url of the destination file path to copy to.
     * @param shouldOverWrite Should a file with the same name in the same location be overwritten?
     */
    copyTo(url: string, shouldOverWrite?: boolean): Promise<void>;
    /**
     * Delete this file.
     *
     * @param eTag Value used in the IF-Match header, by default "*"
     */
    delete(eTag?: string): Promise<void>;
    /**
     * Denies approval for a file that was submitted for content approval.
     * Only documents in lists that are enabled for content approval can be denied.
     *
     * @param comment The comment for the denial.
     */
    deny(comment?: string): Promise<void>;
    /**
     * Uploads the last file fragment and commits the file. The current file content is changed when this method completes.
     * Use the uploadId value that was passed to the StartUpload method that started the upload session.
     * This method is currently available only on Office 365.
     *
     * @param uploadId The unique identifier of the upload session.
     * @param fileOffset The size of the offset into the file where the fragment starts.
     * @param fragment The file contents.
     * @returns The newly uploaded file.
     */
    finishUpload(uploadId: string, fileOffset: number, fragment: Blob): Promise<FileAddResult>;
    /**
     * Specifies the control set used to access, modify, or add Web Parts associated with this Web Part Page and view.
     * An exception is thrown if the file is not an ASPX page.
     *
     * @param scope The WebPartsPersonalizationScope view on the Web Parts page.
     */
    getLimitedWebPartManager(scope?: WebPartsPersonalizationScope): Queryable;
    /**
     * Moves the file to the specified destination url.
     *
     * @param url The absolute url or server relative url of the destination file path to move to.
     * @param moveOperations The bitwise MoveOperations value for how to move the file.
     */
    moveTo(url: string, moveOperations?: MoveOperations): Promise<void>;
    /**
     * Opens the file as a stream.
     *
     */
    openBinaryStream(): Queryable;
    /**
     * Submits the file for content approval with the specified comment.
     *
     * @param comment The comment for the published file. Its length must be <= 1023.
     */
    publish(comment?: string): Promise<void>;
    /**
     * Moves the file to the Recycle Bin and returns the identifier of the new Recycle Bin item.
     *
     * @returns The GUID of the recycled file.
     */
    recycle(): Promise<string>;
    /**
     * Uploads a binary file.
     *
     * @data The file contents.
     */
    saveBinaryStream(data: Blob): Promise<void>;
    /**
     * Starts a new chunk upload session and uploads the first fragment.
     * The current file content is not changed when this method completes.
     * The method is idempotent (and therefore does not change the result) as long as you use the same values for uploadId and stream.
     * The upload session ends either when you use the CancelUpload method or when you successfully
     * complete the upload session by passing the rest of the file contents through the ContinueUpload and FinishUpload methods.
     * The StartUpload and ContinueUpload methods return the size of the running total of uploaded data in bytes,
     * so you can pass those return values to subsequent uses of ContinueUpload and FinishUpload.
     * This method is currently available only on Office 365.
     *
     * @param uploadId The unique identifier of the upload session.
     * @param fragment The file contents.
     * @returns The size of the total uploaded data in bytes.
     */
    startUpload(uploadId: string, fragment: Blob): Promise<number>;
    /**
     * Reverts an existing checkout for the file.
     *
     */
    undoCheckout(): Promise<void>;
    /**
     * Removes the file from content approval or unpublish a major version.
     *
     * @param comment The comment for the unpublish operation. Its length must be <= 1023.
     */
    unpublish(comment?: string): Promise<void>;
}
/**
 * Describes a collection of Version objects
 *
 */
export declare class Versions extends QueryableCollection {
    /**
     * Creates a new instance of the File class
     *
     * @param baseUrl The url or Queryable which forms the parent of this fields collection
     */
    constructor(baseUrl: string | Queryable, path?: string);
    /**
     * Gets a version by id
     *
     * @param versionId The id of the version to retrieve
     */
    getById(versionId: number): Version;
    /**
     * Deletes all the file version objects in the collection.
     *
     */
    deleteAll(): Promise<void>;
    /**
     * Deletes the specified version of the file.
     *
     * @param versionId The ID of the file version to delete.
     */
    deleteById(versionId: number): Promise<void>;
    /**
     * Deletes the file version object with the specified version label.
     *
     * @param label The version label of the file version to delete, for example: 1.2
     */
    deleteByLabel(label: string): Promise<void>;
    /**
     * Creates a new file version from the file specified by the version label.
     *
     * @param label The version label of the file version to restore, for example: 1.2
     */
    restoreByLabel(label: string): Promise<void>;
}
/**
 * Describes a single Version instance
 *
 */
export declare class Version extends QueryableInstance {
    /**
     * Creates a new instance of the Version class
     *
     * @param baseUrl The url or Queryable which forms the parent of this fields collection
     * @param path Optional, if supplied will be appended to the supplied baseUrl
     */
    constructor(baseUrl: string | Queryable, path?: string);
    /**
     * Gets a value that specifies the check-in comment.
     *
     */
    checkInComment: Queryable;
    /**
     * Gets a value that specifies the creation date and time for the file version.
     *
     */
    created: Queryable;
    /**
     * Gets a value that specifies the user that represents the creator of the file version.
     *
     */
    createdBy: Queryable;
    /**
     * Gets the internal identifier for the file version.
     *
     */
    id: Queryable;
    /**
     * Gets a value that specifies whether the file version is the current version.
     *
     */
    isCurrentVersion: Queryable;
    /**
     * Gets a value that specifies the size of this version of the file.
     *
     */
    size: Queryable;
    /**
     * Gets a value that specifies the relative URL of the file version based on the URL for the site or subsite.
     *
     */
    url: Queryable;
    /**
     * Gets a value that specifies the implementation specific identifier of the file.
     * Uses the majorVersionNumber.minorVersionNumber format, for example: 1.2
     *
     */
    versionLabel: Queryable;
    /**
    * Delete a specific version of a file.
    *
    * @param eTag Value used in the IF-Match header, by default "*"
    */
    delete(eTag?: string): Promise<void>;
}
export declare enum CheckinType {
    Minor = 0,
    Major = 1,
    Overwrite = 2,
}
export interface FileAddResult {
    file: File;
    data: any;
}
export declare enum WebPartsPersonalizationScope {
    User = 0,
    Shared = 1,
}
export declare enum MoveOperations {
    Overwrite = 1,
    AllowBrokenThickets = 8,
}
export declare enum TemplateFileType {
    StandardPage = 0,
    WikiPage = 1,
    FormPage = 2,
}
