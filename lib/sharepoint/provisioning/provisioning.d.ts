/**
 * Root class of Provisioning
 */
export declare class Provisioning {
    private handlers;
    private httpClient;
    private startTime;
    private queueItems;
    /**
     * Creates a new instance of the Provisioning class
     */
    constructor();
    /**
     * Applies a JSON template to the current web
     *
     * @param path URL to the template file
     */
    applyTemplate(path: string): Promise<any>;
    /**
     * Starts the provisioning
     *
     * @param json The parsed template in JSON format
     * @param queue Array of Object Handlers to run
     */
    private start(json, queue);
}
