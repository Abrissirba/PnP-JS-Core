import { SearchQuery, SearchResult } from "./search";
import { Site } from "./site";
import { Web } from "./webs";
import { UserProfileQuery } from "./userprofiles";
import { ODataBatch } from "./odata";
/**
 * Root of the SharePoint REST module
 */
export declare class Rest {
    /**
     * Executes a search against this web context
     *
     * @param query The SearchQuery definition
     */
    search(query: string | SearchQuery): Promise<SearchResult>;
    /**
     * Begins a site collection scoped REST request
     *
     */
    site: Site;
    /**
     * Begins a web scoped REST request
     *
     */
    web: Web;
    /**
     * Access to user profile methods
     *
     */
    profiles: UserProfileQuery;
    /**
     * Creates a new batch object for use with the Queryable.addToBatch method
     *
     */
    createBatch(): ODataBatch;
    /**
     * Begins a cross-domain, host site scoped REST request, for use in add-in webs
     *
     * @param addInWebUrl The absolute url of the add-in web
     * @param hostWebUrl The absolute url of the host web
     */
    crossDomainSite(addInWebUrl: string, hostWebUrl: string): Site;
    /**
     * Begins a cross-domain, host web scoped REST request, for use in add-in webs
     *
     * @param addInWebUrl The absolute url of the add-in web
     * @param hostWebUrl The absolute url of the host web
     */
    crossDomainWeb(addInWebUrl: string, hostWebUrl: string): Web;
    /**
     * Implements the creation of cross domain REST urls
     *
     * @param factory The constructor of the object to create Site | Web
     * @param addInWebUrl The absolute url of the add-in web
     * @param hostWebUrl The absolute url of the host web
     * @param urlPart String part to append to the url "site" | "web"
     */
    private _cdImpl<T>(factory, addInWebUrl, hostWebUrl, urlPart);
}
