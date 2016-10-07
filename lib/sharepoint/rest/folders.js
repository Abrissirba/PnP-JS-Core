"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var queryable_1 = require("./queryable");
var files_1 = require("./files");
var items_1 = require("./items");
/**
 * Describes a collection of Folder objects
 *
 */
var Folders = (function (_super) {
    __extends(Folders, _super);
    /**
     * Creates a new instance of the Folders class
     *
     * @param baseUrl The url or Queryable which forms the parent of this fields collection
     */
    function Folders(baseUrl, path) {
        if (path === void 0) { path = "folders"; }
        _super.call(this, baseUrl, path);
    }
    /**
     * Gets a folder by folder name
     *
     */
    Folders.prototype.getByName = function (name) {
        var f = new Folder(this);
        f.concat("('" + name + "')");
        return f;
    };
    /**
     * Adds a new folder to the current folder (relative) or any folder (absolute)
     *
     * @param url The relative or absolute url where the new folder will be created. Urls starting with a forward slash are absolute.
     * @returns The new Folder and the raw response.
     */
    Folders.prototype.add = function (url) {
        var _this = this;
        return new Folders(this, "add('" + url + "')").post().then(function (response) {
            return {
                data: response,
                folder: _this.getByName(url),
            };
        });
    };
    return Folders;
}(queryable_1.QueryableCollection));
exports.Folders = Folders;
/**
 * Describes a single Folder instance
 *
 */
var Folder = (function (_super) {
    __extends(Folder, _super);
    //
    // TODO:
    //      Properties (https://msdn.microsoft.com/en-us/library/office/dn450841.aspx#bk_FolderProperties)
    //          UniqueContentTypeOrder (setter)
    //          WelcomePage (setter)
    //
    /**
     * Creates a new instance of the Folder class
     *
     * @param baseUrl The url or Queryable which forms the parent of this fields collection
     * @param path Optional, if supplied will be appended to the supplied baseUrl
     */
    function Folder(baseUrl, path) {
        _super.call(this, baseUrl, path);
    }
    Object.defineProperty(Folder.prototype, "contentTypeOrder", {
        /**
         * Specifies the sequence in which content types are displayed.
         *
         */
        get: function () {
            return new queryable_1.QueryableCollection(this, "contentTypeOrder");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Folder.prototype, "files", {
        /**
         * Gets this folder's files
         *
         */
        get: function () {
            return new files_1.Files(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Folder.prototype, "folders", {
        /**
         * Gets this folder's sub folders
         *
         */
        get: function () {
            return new Folders(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Folder.prototype, "itemCount", {
        /**
         * Gets this folder's item count
         *
         */
        get: function () {
            return new queryable_1.Queryable(this, "itemCount");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Folder.prototype, "listItemAllFields", {
        /**
         * Gets this folder's list item
         *
         */
        get: function () {
            return new items_1.Item(this, "listItemAllFields");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Folder.prototype, "name", {
        /**
         * Gets the folders name
         *
         */
        get: function () {
            return new queryable_1.Queryable(this, "name");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Folder.prototype, "parentFolder", {
        /**
         * Gets the parent folder, if available
         *
         */
        get: function () {
            return new Folder(this, "parentFolder");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Folder.prototype, "properties", {
        /**
         * Gets this folder's properties
         *
         */
        get: function () {
            return new queryable_1.QueryableInstance(this, "properties");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Folder.prototype, "serverRelativeUrl", {
        /**
         * Gets this folder's server relative url
         *
         */
        get: function () {
            return new queryable_1.Queryable(this, "serverRelativeUrl");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Folder.prototype, "uniqueContentTypeOrder", {
        /**
         * Gets a value that specifies the content type order.
         *
         */
        get: function () {
            return new queryable_1.QueryableCollection(this, "uniqueContentTypeOrder");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Folder.prototype, "welcomePage", {
        /**
         * Gets this folder's welcome page
         */
        get: function () {
            return new queryable_1.Queryable(this, "welcomePage");
        },
        enumerable: true,
        configurable: true
    });
    /**
    * Delete this folder
    *
    * @param eTag Value used in the IF-Match header, by default "*"
    */
    Folder.prototype.delete = function (eTag) {
        if (eTag === void 0) { eTag = "*"; }
        return new Folder(this).post({
            headers: {
                "IF-Match": eTag,
                "X-HTTP-Method": "DELETE",
            },
        });
    };
    /**
     * Moves the folder to the Recycle Bin and returns the identifier of the new Recycle Bin item.
     */
    Folder.prototype.recycle = function () {
        return new Folder(this, "recycle").post();
    };
    return Folder;
}(queryable_1.QueryableInstance));
exports.Folder = Folder;
