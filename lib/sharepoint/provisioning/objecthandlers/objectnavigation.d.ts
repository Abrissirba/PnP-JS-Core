import { ObjectHandlerBase } from "./objecthandlerbase";
import { INavigation } from "../schema/inavigation";
/**
 * Describes the Navigation Object Handler
 */
export declare class ObjectNavigation extends ObjectHandlerBase {
    /**
     * Creates a new instance of the ObjectNavigation class
     */
    constructor();
    /**
     * Provision Navigation nodes
     *
     * @param object The navigation settings and nodes to provision
     */
    ProvisionObjects(object: INavigation): Promise<{}>;
    /**
     * Retrieves the node with the given title from a collection of SP.NavigationNode
     */
    private getNodeFromCollectionByTitle(nodeCollection, title);
    private ConfigureQuickLaunch(nodes, clientContext, httpClient, navigation);
}
