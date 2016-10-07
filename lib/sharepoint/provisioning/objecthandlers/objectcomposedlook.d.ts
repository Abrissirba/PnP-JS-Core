import { IComposedLook } from "../schema/IComposedLook";
import { ObjectHandlerBase } from "./objecthandlerbase";
/**
 * Describes the Composed Look Object Handler
 */
export declare class ObjectComposedLook extends ObjectHandlerBase {
    /**
     * Creates a new instance of the ObjectComposedLook class
     */
    constructor();
    /**
     * Provisioning Composed Look
     *
     * @param object The Composed Look to provision
     */
    ProvisionObjects(object: IComposedLook): Promise<{}>;
}
