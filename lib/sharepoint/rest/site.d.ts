import { Queryable, QueryableInstance } from "./queryable";
import { Web } from "./webs";
import { UserCustomActions } from "./usercustomactions";
import { ContextInfo, DocumentLibraryInformation } from "./types";
/**
 * Describes a site collection
 *
 */
export declare class Site extends QueryableInstance {
    /**
     * Creates a new instance of the RoleAssignments class
     *
     * @param baseUrl The url or Queryable which forms the parent of this fields collection
     */
    constructor(baseUrl: string | Queryable, path?: string);
    /**
     * Gets the root web of the site collection
     *
     */
    rootWeb: Web;
    /**
     * Get all custom actions on a site collection
     *
     */
    userCustomActions: UserCustomActions;
    /**
     * Gets the context information for the site.
     */
    getContextInfo(): Promise<ContextInfo>;
    /**
     * Gets the document libraries on a site. Static method. (SharePoint Online only)
     *
     * @param absoluteWebUrl The absolute url of the web whose document libraries should be returned
     */
    getDocumentLibraries(absoluteWebUrl: string): Promise<DocumentLibraryInformation[]>;
    /**
     * Gets the site URL from a page URL.
     *
     * @param absolutePageUrl The absolute url of the page
     */
    getWebUrlFromPageUrl(absolutePageUrl: string): Promise<string>;
}
