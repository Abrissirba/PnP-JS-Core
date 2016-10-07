import { ObjectHandlerBase } from "./objecthandlerbase";
import { ICustomAction } from "../schema/ICustomAction";
/**
 * Describes the Custom Actions Object Handler
 */
export declare class ObjectCustomActions extends ObjectHandlerBase {
    /**
     * Creates a new instance of the ObjectCustomActions class
     */
    constructor();
    /**
     * Provisioning Custom Actions
     *
     * @param customactions The Custom Actions to provision
     */
    ProvisionObjects(customactions: Array<ICustomAction>): Promise<{}>;
}
