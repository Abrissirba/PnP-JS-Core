import { ObjectHandlerBase } from "./objecthandlerbase";
import { IWebSettings } from "../schema/IWebSettings";
/**
 * Describes the Web Settings Object Handler
 */
export declare class ObjectWebSettings extends ObjectHandlerBase {
    /**
     * Creates a new instance of the ObjectWebSettings class
     */
    constructor();
    /**
     * Provision Web Settings
     *
     * @param object The Web Settings to provision
     */
    ProvisionObjects(object: IWebSettings): Promise<{}>;
}
