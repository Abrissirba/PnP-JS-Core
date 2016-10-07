import { ObjectHandlerBase } from "./objecthandlerbase";
import { IListInstance } from "../schema/IListInstance";
/**
 * Describes the Lists Object Handler
 */
export declare class ObjectLists extends ObjectHandlerBase {
    /**
     * Creates a new instance of the ObjectLists class
     */
    constructor();
    /**
     * Provision Lists
     *
     * @param objects The lists to provision
     */
    ProvisionObjects(objects: Array<IListInstance>): Promise<{}>;
    private EnsureLocationBasedMetadataDefaultsReceiver(clientContext, list);
    private CreateFolders(params);
    private ApplyContentTypeBindings(params);
    private ApplyListInstanceFieldRefs(params);
    private ApplyFields(params);
    private ApplyLookupFields(params);
    private GetFieldXmlAttr(fieldXml, attr);
    private GetFieldXml(field, lists, list);
    private ApplyListSecurity(params);
    private CreateViews(params);
    private InsertDataRows(params);
}
