import { Queryable, QueryableCollection } from "./queryable";
import { QueryableSecurable } from "./queryablesecurable";
import { Lists } from "./lists";
import { Fields } from "./fields";
import { Navigation } from "./navigation";
import { SiteGroups } from "./sitegroups";
import { ContentTypes } from "./contenttypes";
import { Folders, Folder } from "./folders";
import { RoleDefinitions } from "./roles";
import { File } from "./files";
import { TypedHash } from "../../collections/collections";
import * as Types from "./types";
import { List } from "./lists";
import { SiteUsers, SiteUser } from "./siteusers";
import { UserCustomActions } from "./usercustomactions";
export declare class Webs extends QueryableCollection {
    constructor(baseUrl: string | Queryable, webPath?: string);
    /**
     * Adds a new web to the collection
     *
     * @param title The new web's title
     * @param url The new web's relative url
     * @param description The web web's description
     * @param template The web's template
     * @param language The language code to use for this web
     * @param inheritPermissions If true permissions will be inherited from the partent web
     * @param additionalSettings Will be passed as part of the web creation body
     */
    add(title: string, url: string, description?: string, template?: string, language?: number, inheritPermissions?: boolean, additionalSettings?: TypedHash<string | number | boolean>): Promise<WebAddResult>;
}
/**
 * Describes a web
 *
 */
export declare class Web extends QueryableSecurable {
    constructor(baseUrl: string | Queryable, path?: string);
    webs: Webs;
    /**
     * Get the content types available in this web
     *
     */
    contentTypes: ContentTypes;
    /**
     * Get the lists in this web
     *
     */
    lists: Lists;
    /**
     * Gets the fields in this web
     *
     */
    fields: Fields;
    /**
     * Gets the available fields in this web
     *
     */
    availablefields: Fields;
    /**
     * Get the navigation options in this web
     *
     */
    navigation: Navigation;
    /**
     * Gets the site users
     *
     */
    siteUsers: SiteUsers;
    /**
     * Gets the site groups
     *
     */
    siteGroups: SiteGroups;
    /**
     * Get the folders in this web
     *
     */
    folders: Folders;
    /**
     * Get all custom actions on a site
     *
     */
    userCustomActions: UserCustomActions;
    /**
     * Gets the collection of RoleDefinition resources.
     *
     */
    roleDefinitions: RoleDefinitions;
    /**
     * Get a folder by server relative url
     *
     * @param folderRelativeUrl the server relative path to the folder (including /sites/ if applicable)
     */
    getFolderByServerRelativeUrl(folderRelativeUrl: string): Folder;
    /**
     * Get a file by server relative url
     *
     * @param fileRelativeUrl the server relative path to the file (including /sites/ if applicable)
     */
    getFileByServerRelativeUrl(fileRelativeUrl: string): File;
    /**
     * Updates this web intance with the supplied properties
     *
     * @param properties A plain object hash of values to update for the web
     */
    update(properties: TypedHash<string | number | boolean>): Promise<WebUpdateResult>;
    /**
     * Delete this web
     *
     */
    delete(): Promise<void>;
    /**
     * Applies the theme specified by the contents of each of the files specified in the arguments to the site.
     *
     * @param colorPaletteUrl Server-relative URL of the color palette file.
     * @param fontSchemeUrl Server-relative URL of the font scheme.
     * @param backgroundImageUrl Server-relative URL of the background image.
     * @param shareGenerated true to store the generated theme files in the root site, or false to store them in this site.
     */
    applyTheme(colorPaletteUrl: string, fontSchemeUrl: string, backgroundImageUrl: string, shareGenerated: boolean): Promise<void>;
    /**
     * Applies the specified site definition or site template to the Web site that has no template applied to it.
     *
     * @param template Name of the site definition or the name of the site template
     */
    applyWebTemplate(template: string): Promise<void>;
    /**
     * Returns whether the current user has the given set of permissions.
     *
     * @param perms The high and low permission range.
     */
    doesUserHavePermissions(perms: Types.BasePermissions): Promise<boolean>;
    /**
     * Checks whether the specified login name belongs to a valid user in the site. If the user doesn't exist, adds the user to the site.
     *
     * @param loginName The login name of the user (ex: i:0#.f|membership|user@domain.onmicrosoft.com)
     */
    ensureUser(loginName: string): Promise<any>;
    /**
     * Returns a collection of site templates available for the site.
     *
     * @param language The LCID of the site templates to get.
     * @param true to include language-neutral site templates; otherwise false
     */
    availableWebTemplates(language?: number, includeCrossLanugage?: boolean): QueryableCollection;
    /**
     * Returns the list gallery on the site.
     *
     * @param type The gallery type - WebTemplateCatalog = 111, WebPartCatalog = 113 ListTemplateCatalog = 114,
     * MasterPageCatalog = 116, SolutionCatalog = 121, ThemeCatalog = 123, DesignCatalog = 124, AppDataCatalog = 125
     */
    getCatalog(type: number): Promise<List>;
    /**
     * Returns the collection of changes from the change log that have occurred within the list, based on the specified query.
     */
    getChanges(query: Types.ChangeQuery): Promise<any>;
    /**
     * Gets the custom list templates for the site.
     *
     */
    customListTemplate: QueryableCollection;
    /**
     * Returns the user corresponding to the specified member identifier for the current site.
     *
     * @param id The ID of the user.
     */
    getUserById(id: number): SiteUser;
    /**
     * Returns the name of the image file for the icon that is used to represent the specified file.
     *
     * @param filename The file name. If this parameter is empty, the server returns an empty string.
     * @param size The size of the icon: 16x16 pixels = 0, 32x32 pixels = 1.
     * @param progId The ProgID of the application that was used to create the file, in the form OLEServerName.ObjectName
     */
    mapToIcon(filename: string, size?: number, progId?: string): Promise<string>;
}
export interface WebAddResult {
    data: any;
    web: Web;
}
export interface WebUpdateResult {
    data: any;
    web: Web;
}
export interface GetCatalogResult {
    data: any;
    list: List;
}
