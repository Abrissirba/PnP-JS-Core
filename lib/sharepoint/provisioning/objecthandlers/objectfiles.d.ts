import { ObjectHandlerBase } from "./objecthandlerbase";
import { IFile } from "../schema/IFile";
/**
 * Describes the Files Object Handler
 */
export declare class ObjectFiles extends ObjectHandlerBase {
    /**
     * Creates a new instance of the ObjectFiles class
     */
    constructor();
    /**
     * Provisioning Files
     *
     * @param objects The files to provisiion
     */
    ProvisionObjects(objects: Array<IFile>): Promise<{}>;
    private RemoveWebPartsFromFileIfSpecified(clientContext, limitedWebPartManager, shouldRemoveExisting);
    private GetWebPartXml(webParts);
    private AddWebPartsToWebPartPage(dest, src, webParts, shouldRemoveExisting);
    private ApplyFileProperties(dest, fileProperties);
    private GetViewFromCollectionByUrl(viewCollection, url);
    private ModifyHiddenViews(objects);
    private GetFolderFromFilePath(filePath);
    private GetFilenameFromFilePath(filePath);
}
