import { Util } from "./utils/util";
import { PnPClientStorage } from "./utils/storage";
import { Settings } from "./configuration/configuration";
import { Logger } from "./utils/logging";
import { Rest } from "./sharepoint/rest/rest";
import { LibraryConfiguration } from "./configuration/pnplibconfig";
/**
 * Root class of the Patterns and Practices namespace, provides an entry point to the library
 */
/**
 * Utility methods
 */
export declare const util: typeof Util;
/**
 * Provides access to the REST interface
 */
export declare const sp: Rest;
/**
 * Provides access to local and session storage
 */
export declare const storage: PnPClientStorage;
/**
 * Global configuration instance to which providers can be added
 */
export declare const config: Settings;
/**
 * Global logging instance to which subscribers can be registered and messages written
 */
export declare const log: typeof Logger;
/**
 * Allows for the configuration of the library
 */
export declare const setup: (config: LibraryConfiguration) => void;
declare let Def: {
    config: Settings;
    log: typeof Logger;
    setup: (config: LibraryConfiguration) => void;
    sp: Rest;
    storage: PnPClientStorage;
    util: typeof Util;
};
export default Def;
