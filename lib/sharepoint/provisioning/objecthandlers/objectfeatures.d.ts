import { ObjectHandlerBase } from "./objecthandlerbase";
import { IFeature } from "../schema/IFeature";
/**
 * Describes the Features Object Handler
 */
export declare class ObjectFeatures extends ObjectHandlerBase {
    /**
     * Creates a new instance of the ObjectFeatures class
     */
    constructor();
    /**
     * Provisioning features
     *
     * @paramm features The features to provision
     */
    ProvisionObjects(features: Array<IFeature>): Promise<{}>;
}
