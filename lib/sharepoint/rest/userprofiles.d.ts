import { Queryable, QueryableInstance, QueryableCollection } from "./queryable";
import * as Types from "./types";
export declare class UserProfileQuery extends QueryableInstance {
    private profileLoader;
    constructor(baseUrl: string | Queryable, path?: string);
    /**
     * The URL of the edit profile page for the current user.
     */
    editProfileLink: Promise<string>;
    /**
     * A Boolean value that indicates whether the current user's People I'm Following list is public.
     */
    isMyPeopleListPublic: Promise<boolean>;
    /**
     * A Boolean value that indicates whether the current user's People I'm Following list is public.
     *
     * @param loginName The account name of the user
     */
    amIFollowedBy(loginName: string): Promise<boolean>;
    /**
     * Checks whether the current user is following the specified user.
     *
     * @param loginName The account name of the user
     */
    amIFollowing(loginName: string): Promise<boolean>;
    /**
     * Gets tags that the user is following.
     *
     * @param maxCount The maximum number of tags to get.
     */
    getFollowedTags(maxCount?: number): Promise<string[]>;
    /**
     * Gets the people who are following the specified user.
     *
     * @param loginName The account name of the user.
     */
    getFollowersFor(loginName: string): Promise<any[]>;
    /**
     * Gets the people who are following the current user.
     *
     */
    myFollowers: QueryableCollection;
    /**
     * Gets user properties for the current user.
     *
     */
    myProperties: QueryableInstance;
    /**
     * Gets the people who the specified user is following.
     *
     * @param loginName The account name of the user.
     */
    getPeopleFollowedBy(loginName: string): Promise<any[]>;
    /**
     * Gets user properties for the specified user.
     *
     * @param loginName The account name of the user.
     */
    getPropertiesFor(loginName: string): Promise<any[]>;
    /**
     * Gets the most popular tags.
     *
     */
    trendingTags: Promise<Types.HashTagCollection>;
    /**
     * Gets the specified user profile property for the specified user.
     *
     * @param loginName The account name of the user.
     * @param propertyName The case-sensitive name of the property to get.
     */
    getUserProfilePropertyFor(loginName: string, propertyName: string): Promise<string>;
    /**
     * Removes the specified user from the user's list of suggested people to follow.
     *
     * @param loginName The account name of the user.
     */
    hideSuggestion(loginName: string): Promise<void>;
    /**
     * Checks whether the first user is following the second user.
     *
     * @param follower The account name of the user who might be following followee.
     * @param followee The account name of the user who might be followed.
     */
    isFollowing(follower: string, followee: string): Promise<boolean>;
    /**
     * Uploads and sets the user profile picture
     *
     * @param profilePicSource Blob data representing the user's picture
     */
    setMyProfilePic(profilePicSource: Blob): Promise<void>;
    /**
     * Provisions one or more users' personal sites. (My Site administrator on SharePoint Online only)
     *
     * @param emails The email addresses of the users to provision sites for
     */
    createPersonalSiteEnqueueBulk(...emails: string[]): Promise<void>;
    /**
     * Gets the user profile of the site owner.
     *
     */
    ownerUserProfile: Promise<Types.UserProfile>;
    /**
     * Gets the user profile that corresponds to the current user.
     */
    userProfile: Promise<any>;
    /**
     * Enqueues creating a personal site for this user, which can be used to share documents, web pages, and other files.
     *
     * @param interactiveRequest true if interactively (web) initiated request, or false if non-interactively (client) initiated request
     */
    createPersonalSite(interactiveRequest?: boolean): Promise<void>;
    /**
     * Sets the privacy settings for this profile.
     *
     * @param share true to make all social data public; false to make all social data private.
     */
    shareAllSocialData(share: any): Promise<void>;
}
