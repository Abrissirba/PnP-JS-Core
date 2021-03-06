/**
 * Interface that defines a log entry
 *
 */
export interface LogEntry {
    /**
     * The main message to be logged
     */
    message: string;
    /**
     * The level of information this message represents
     */
    level: Logger.LogLevel;
    /**
     * Any associated data that a given logging listener may choose to log or ignore
     */
    data?: any;
}
/**
 * Interface that defines a log listner
 *
 */
export interface LogListener {
    /**
     * Any associated data that a given logging listener may choose to log or ignore
     *
     * @param entry The information to be logged
     */
    log(entry: LogEntry): void;
}
/**
 * Class used to subscribe ILogListener and log messages throughout an application
 *
 */
export declare class Logger {
    private static _instance;
    static activeLogLevel: Logger.LogLevel;
    private static instance;
    /**
     * Adds an ILogListener instance to the set of subscribed listeners
     *
     * @param listeners One or more listeners to subscribe to this log
     */
    static subscribe(...listeners: LogListener[]): void;
    /**
     * Clears the subscribers collection, returning the collection before modifiction
     */
    static clearSubscribers(): LogListener[];
    /**
     * Gets the current subscriber count
     */
    static count: number;
    /**
     * Writes the supplied string to the subscribed listeners
     *
     * @param message The message to write
     * @param level [Optional] if supplied will be used as the level of the entry (Default: LogLevel.Verbose)
     */
    static write(message: string, level?: Logger.LogLevel): void;
    /**
     * Logs the supplied entry to the subscribed listeners
     *
     * @param entry The message to log
     */
    static log(entry: LogEntry): void;
    /**
     * Logs performance tracking data for the the execution duration of the supplied function using console.profile
     *
     * @param name The name of this profile boundary
     * @param f The function to execute and track within this performance boundary
     */
    static measure<T>(name: string, f: () => T): T;
}
/**
 * This module is merged with the Logger class and then exposed via the API as path of pnp.log
 */
export declare module Logger {
    /**
     * A set of logging levels
     *
     */
    enum LogLevel {
        Verbose = 0,
        Info = 1,
        Warning = 2,
        Error = 3,
        Off = 99,
    }
    /**
     * Implementation of ILogListener which logs to the browser console
     *
     */
    class ConsoleListener implements LogListener {
        /**
         * Any associated data that a given logging listener may choose to log or ignore
         *
         * @param entry The information to be logged
         */
        log(entry: LogEntry): void;
        /**
         * Formats the message
         *
         * @param entry The information to format into a string
         */
        private format(entry);
    }
    /**
     * Implementation of ILogListener which logs to Azure Insights
     *
     */
    class AzureInsightsListener implements LogListener {
        private azureInsightsInstrumentationKey;
        /**
         * Creats a new instance of the AzureInsightsListener class
         *
         * @constructor
         * @param azureInsightsInstrumentationKey The instrumentation key created when the Azure Insights instance was created
         */
        constructor(azureInsightsInstrumentationKey: string);
        /**
         * Any associated data that a given logging listener may choose to log or ignore
         *
         * @param entry The information to be logged
         */
        log(entry: LogEntry): void;
        /**
         * Formats the message
         *
         * @param entry The information to format into a string
         */
        private format(entry);
    }
    /**
     * Implementation of ILogListener which logs to the supplied function
     *
     */
    class FunctionListener implements LogListener {
        private method;
        /**
         * Creates a new instance of the FunctionListener class
         *
         * @constructor
         * @param  method The method to which any logging data will be passed
         */
        constructor(method: (entry: LogEntry) => void);
        /**
         * Any associated data that a given logging listener may choose to log or ignore
         *
         * @param entry The information to be logged
         */
        log(entry: LogEntry): void;
    }
}
