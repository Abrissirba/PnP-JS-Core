/**
 * Describes a ProvisioningStep
 */
export declare class ProvisioningStep {
    private name;
    private index;
    private objects;
    private parameters;
    private handler;
    /**
     * Executes the ProvisioningStep function
     *
     * @param dependentPromise The promise the ProvisioningStep is dependent on
     */
    execute(dependentPromise?: any): any;
    /**
     * Creates a new instance of the ProvisioningStep class
     */
    constructor(name: string, index: number, objects: any, parameters: any, handler: any);
}
