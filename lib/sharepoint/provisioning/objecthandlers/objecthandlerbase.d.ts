import { HttpClient } from "../../../net/httpclient";
/**
 * Describes the Object Handler Base
 */
export declare class ObjectHandlerBase {
    httpClient: HttpClient;
    private name;
    /**
     * Creates a new instance of the ObjectHandlerBase class
     */
    constructor(name: string);
    /**
     * Provisioning objects
     */
    ProvisionObjects(objects: any, parameters?: any): Promise<{}>;
    /**
     * Writes to Logger when scope has started
     */
    scope_started(): void;
    /**
     * Writes to Logger when scope has stopped
     */
    scope_ended(): void;
}
