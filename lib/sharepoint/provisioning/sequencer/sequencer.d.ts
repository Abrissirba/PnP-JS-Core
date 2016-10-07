/**
 * Descibes a Sequencer
 */
export declare class Sequencer {
    private functions;
    private parameter;
    private scope;
    /**
     * Creates a new instance of the Sequencer class, and declare private variables
     */
    constructor(functions: Array<any>, parameter: any, scope: any);
    /**
     * Executes the functions in sequence using DeferredObject
     */
    execute(progressFunction?: (s: Sequencer, index: number, functions: any[]) => void): Promise<void>;
}
