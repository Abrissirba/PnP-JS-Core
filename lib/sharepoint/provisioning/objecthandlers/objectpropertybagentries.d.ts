import { ObjectHandlerBase } from "./objecthandlerbase";
import { IPropertyBagEntry } from "../schema/IPropertyBagEntry";
/**
 * Describes the Property Bag Entries Object Handler
 */
export declare class ObjectPropertyBagEntries extends ObjectHandlerBase {
    /**
     * Creates a new instance of the ObjectPropertyBagEntries class
     */
    constructor();
    /**
     * Provision Property Bag Entries
     *
     * @param entries The entries to provision
     */
    ProvisionObjects(entries: Array<IPropertyBagEntry>): Promise<{}>;
}
