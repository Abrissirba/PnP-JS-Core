"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var queryable_1 = require("./queryable");
var FileUtil = require("../../utils/files");
var odata_1 = require("./odata");
var UserProfileQuery = (function (_super) {
    __extends(UserProfileQuery, _super);
    function UserProfileQuery(baseUrl, path) {
        if (path === void 0) { path = "_api/sp.userprofiles.peoplemanager"; }
        _super.call(this, baseUrl, path);
        this.profileLoader = new ProfileLoader(baseUrl);
    }
    Object.defineProperty(UserProfileQuery.prototype, "editProfileLink", {
        /**
         * The URL of the edit profile page for the current user.
         */
        get: function () {
            var q = new UserProfileQuery(this, "EditProfileLink");
            return q.getAs(odata_1.ODataValue());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserProfileQuery.prototype, "isMyPeopleListPublic", {
        /**
         * A Boolean value that indicates whether the current user's People I'm Following list is public.
         */
        get: function () {
            var q = new UserProfileQuery(this, "IsMyPeopleListPublic");
            return q.getAs(odata_1.ODataValue());
        },
        enumerable: true,
        configurable: true
    });
    /**
     * A Boolean value that indicates whether the current user's People I'm Following list is public.
     *
     * @param loginName The account name of the user
     */
    UserProfileQuery.prototype.amIFollowedBy = function (loginName) {
        var q = new UserProfileQuery(this, "amifollowedby(@v)");
        q.query.add("@v", "'" + encodeURIComponent(loginName) + "'");
        return q.get();
    };
    /**
     * Checks whether the current user is following the specified user.
     *
     * @param loginName The account name of the user
     */
    UserProfileQuery.prototype.amIFollowing = function (loginName) {
        var q = new UserProfileQuery(this, "amifollowing(@v)");
        q.query.add("@v", "'" + encodeURIComponent(loginName) + "'");
        return q.get();
    };
    /**
     * Gets tags that the user is following.
     *
     * @param maxCount The maximum number of tags to get.
     */
    UserProfileQuery.prototype.getFollowedTags = function (maxCount) {
        if (maxCount === void 0) { maxCount = 20; }
        var q = new UserProfileQuery(this, "getfollowedtags(" + maxCount + ")");
        return q.get();
    };
    /**
     * Gets the people who are following the specified user.
     *
     * @param loginName The account name of the user.
     */
    UserProfileQuery.prototype.getFollowersFor = function (loginName) {
        var q = new UserProfileQuery(this, "getfollowersfor(@v)");
        q.query.add("@v", "'" + encodeURIComponent(loginName) + "'");
        return q.get();
    };
    Object.defineProperty(UserProfileQuery.prototype, "myFollowers", {
        /**
         * Gets the people who are following the current user.
         *
         */
        get: function () {
            return new queryable_1.QueryableCollection(this, "getmyfollowers");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserProfileQuery.prototype, "myProperties", {
        /**
         * Gets user properties for the current user.
         *
         */
        get: function () {
            return new UserProfileQuery(this, "getmyproperties");
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Gets the people who the specified user is following.
     *
     * @param loginName The account name of the user.
     */
    UserProfileQuery.prototype.getPeopleFollowedBy = function (loginName) {
        var q = new UserProfileQuery(this, "getpeoplefollowedby(@v)");
        q.query.add("@v", "'" + encodeURIComponent(loginName) + "'");
        return q.get();
    };
    /**
     * Gets user properties for the specified user.
     *
     * @param loginName The account name of the user.
     */
    UserProfileQuery.prototype.getPropertiesFor = function (loginName) {
        var q = new UserProfileQuery(this, "getpropertiesfor(@v)");
        q.query.add("@v", "'" + encodeURIComponent(loginName) + "'");
        return q.get();
    };
    Object.defineProperty(UserProfileQuery.prototype, "trendingTags", {
        /**
         * Gets the most popular tags.
         *
         */
        get: function () {
            var q = new UserProfileQuery(this, null);
            q.concat(".gettrendingtags");
            return q.get();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Gets the specified user profile property for the specified user.
     *
     * @param loginName The account name of the user.
     * @param propertyName The case-sensitive name of the property to get.
     */
    UserProfileQuery.prototype.getUserProfilePropertyFor = function (loginName, propertyName) {
        var q = new UserProfileQuery(this, "getuserprofilepropertyfor(accountname=@v, propertyname='" + propertyName + "')");
        q.query.add("@v", "'" + encodeURIComponent(loginName) + "'");
        return q.get();
    };
    /**
     * Removes the specified user from the user's list of suggested people to follow.
     *
     * @param loginName The account name of the user.
     */
    UserProfileQuery.prototype.hideSuggestion = function (loginName) {
        var q = new UserProfileQuery(this, "hidesuggestion(@v)");
        q.query.add("@v", "'" + encodeURIComponent(loginName) + "'");
        return q.post();
    };
    /**
     * Checks whether the first user is following the second user.
     *
     * @param follower The account name of the user who might be following followee.
     * @param followee The account name of the user who might be followed.
     */
    UserProfileQuery.prototype.isFollowing = function (follower, followee) {
        var q = new UserProfileQuery(this, null);
        q.concat(".isfollowing(possiblefolloweraccountname=@v, possiblefolloweeaccountname=@y)");
        q.query.add("@v", "'" + encodeURIComponent(follower) + "'");
        q.query.add("@y", "'" + encodeURIComponent(followee) + "'");
        return q.get();
    };
    /**
     * Uploads and sets the user profile picture
     *
     * @param profilePicSource Blob data representing the user's picture
     */
    UserProfileQuery.prototype.setMyProfilePic = function (profilePicSource) {
        var _this = this;
        return FileUtil.readBlobAsArrayBuffer(profilePicSource).then(function (buffer) {
            var request = new UserProfileQuery(_this, "setmyprofilepicture");
            return request.post({
                body: String.fromCharCode.apply(null, new Uint16Array(buffer)),
            });
        });
    };
    /**
     * Provisions one or more users' personal sites. (My Site administrator on SharePoint Online only)
     *
     * @param emails The email addresses of the users to provision sites for
     */
    UserProfileQuery.prototype.createPersonalSiteEnqueueBulk = function () {
        var emails = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            emails[_i - 0] = arguments[_i];
        }
        return this.profileLoader.createPersonalSiteEnqueueBulk(emails);
    };
    Object.defineProperty(UserProfileQuery.prototype, "ownerUserProfile", {
        /**
         * Gets the user profile of the site owner.
         *
         */
        get: function () {
            return this.profileLoader.ownerUserProfile;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserProfileQuery.prototype, "userProfile", {
        /**
         * Gets the user profile that corresponds to the current user.
         */
        get: function () {
            return this.profileLoader.userProfile;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Enqueues creating a personal site for this user, which can be used to share documents, web pages, and other files.
     *
     * @param interactiveRequest true if interactively (web) initiated request, or false if non-interactively (client) initiated request
     */
    UserProfileQuery.prototype.createPersonalSite = function (interactiveRequest) {
        if (interactiveRequest === void 0) { interactiveRequest = false; }
        return this.profileLoader.createPersonalSite(interactiveRequest);
    };
    /**
     * Sets the privacy settings for this profile.
     *
     * @param share true to make all social data public; false to make all social data private.
     */
    UserProfileQuery.prototype.shareAllSocialData = function (share) {
        return this.profileLoader.shareAllSocialData(share);
    };
    return UserProfileQuery;
}(queryable_1.QueryableInstance));
exports.UserProfileQuery = UserProfileQuery;
var ProfileLoader = (function (_super) {
    __extends(ProfileLoader, _super);
    function ProfileLoader(baseUrl, path) {
        if (path === void 0) { path = "_api/sp.userprofiles.profileloader.getprofileloader"; }
        _super.call(this, baseUrl, path);
    }
    /**
     * Provisions one or more users' personal sites. (My Site administrator on SharePoint Online only)
     *
     * @param emails The email addresses of the users to provision sites for
     */
    ProfileLoader.prototype.createPersonalSiteEnqueueBulk = function (emails) {
        var q = new ProfileLoader(this, "createpersonalsiteenqueuebulk");
        var postBody = JSON.stringify({ "emailIDs": emails });
        return q.post({
            body: postBody,
        });
    };
    Object.defineProperty(ProfileLoader.prototype, "ownerUserProfile", {
        /**
         * Gets the user profile of the site owner.
         *
         */
        get: function () {
            var q = this.getParent(ProfileLoader, this.parentUrl, "_api/sp.userprofiles.profileloader.getowneruserprofile");
            return q.postAs();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProfileLoader.prototype, "userProfile", {
        /**
         * Gets the user profile that corresponds to the current user.
         *
         */
        get: function () {
            var q = new ProfileLoader(this, "getuserprofile");
            return q.postAs();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Enqueues creating a personal site for this user, which can be used to share documents, web pages, and other files.
     *
     * @param interactiveRequest true if interactively (web) initiated request, or false if non-interactively (client) initiated request
     */
    ProfileLoader.prototype.createPersonalSite = function (interactiveRequest) {
        if (interactiveRequest === void 0) { interactiveRequest = false; }
        var q = new ProfileLoader(this, "getuserprofile/createpersonalsiteenque(" + interactiveRequest + ")\",");
        return q.post();
    };
    /**
     * Sets the privacy settings for this profile.
     *
     * @param share true to make all social data public; false to make all social data private.
     */
    ProfileLoader.prototype.shareAllSocialData = function (share) {
        var q = new ProfileLoader(this, "getuserprofile/shareallsocialdata(" + share + ")\",");
        return q.post();
    };
    return ProfileLoader;
}(queryable_1.Queryable));
