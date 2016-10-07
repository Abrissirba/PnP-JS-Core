import { Queryable } from "./queryable";
import { QuickLaunch } from "./quicklaunch";
import { TopNavigationBar } from "./topnavigationbar";
/**
 * Exposes the navigation components
 *
 */
export declare class Navigation extends Queryable {
    /**
     * Creates a new instance of the Lists class
     *
     * @param baseUrl The url or Queryable which forms the parent of this fields collection
     */
    constructor(baseUrl: string | Queryable);
    /**
     * Gets the quicklaunch navigation for the current context
     *
     */
    quicklaunch: QuickLaunch;
    /**
     * Gets the top bar navigation navigation for the current context
     *
     */
    topNavigationBar: TopNavigationBar;
}
