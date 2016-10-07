"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var queryable_1 = require("./queryable");
var items_1 = require("./items");
/**
 * Describes a collection of File objects
 *
 */
var Files = (function (_super) {
    __extends(Files, _super);
    /**
     * Creates a new instance of the Files class
     *
     * @param baseUrl The url or Queryable which forms the parent of this fields collection
     */
    function Files(baseUrl, path) {
        if (path === void 0) { path = "files"; }
        _super.call(this, baseUrl, path);
    }
    /**
     * Gets a File by filename
     *
     * @param name The name of the file, including extension.
     */
    Files.prototype.getByName = function (name) {
        var f = new File(this);
        f.concat("('" + name + "')");
        return f;
    };
    /**
     * Uploads a file.
     *
     * @param url The folder-relative url of the file.
     * @param shouldOverWrite Should a file with the same name in the same location be overwritten?
     * @param content The file contents blob.
     * @returns The new File and the raw response.
     */
    Files.prototype.add = function (url, content, shouldOverWrite) {
        var _this = this;
        if (shouldOverWrite === void 0) { shouldOverWrite = true; }
        return new Files(this, "add(overwrite=" + shouldOverWrite + ",url='" + url + "')")
            .post({ body: content }).then(function (response) {
            return {
                data: response,
                file: _this.getByName(url),
            };
        });
    };
    /**
     * Adds a ghosted file to an existing list or document library.
     *
     * @param fileUrl The server-relative url where you want to save the file.
     * @param templateFileType The type of use to create the file.
     * @returns The template file that was added and the raw response.
     */
    Files.prototype.addTemplateFile = function (fileUrl, templateFileType) {
        var _this = this;
        return new Files(this, "addTemplateFile(urloffile='" + fileUrl + "',templatefiletype=" + templateFileType + ")")
            .post().then(function (response) {
            return {
                data: response,
                file: _this.getByName(fileUrl),
            };
        });
    };
    return Files;
}(queryable_1.QueryableCollection));
exports.Files = Files;
/**
 * Describes a single File instance
 *
 */
var File = (function (_super) {
    __extends(File, _super);
    /**
     * Creates a new instance of the File class
     *
     * @param baseUrl The url or Queryable which forms the parent of this fields collection
     * @param path Optional, if supplied will be appended to the supplied baseUrl
     */
    function File(baseUrl, path) {
        _super.call(this, baseUrl, path);
    }
    Object.defineProperty(File.prototype, "author", {
        /**
         * Gets a value that specifies the user who added the file.
         *
         */
        get: function () {
            return new queryable_1.Queryable(this, "author");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(File.prototype, "checkedOutByUser", {
        /**
         * Gets a result indicating the current user who has the file checked out.
         *
         */
        get: function () {
            return new queryable_1.Queryable(this, "checkedOutByUser");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(File.prototype, "checkInComment", {
        /**
         * Gets a value that returns the comment used when a document is checked in to a document library.
         *
         */
        get: function () {
            return new queryable_1.Queryable(this, "checkInComment");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(File.prototype, "checkOutType", {
        /**
         * Gets a value that indicates how the file is checked out of a document library.
         * The checkout state of a file is independent of its locked state.
         *
         */
        get: function () {
            return new queryable_1.Queryable(this, "checkOutType");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(File.prototype, "contentTag", {
        /**
         * Returns internal version of content, used to validate document equality for read purposes.
         *
         */
        get: function () {
            return new queryable_1.Queryable(this, "contentTag");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(File.prototype, "customizedPageStatus", {
        /**
         * Gets a value that specifies the customization status of the file.
         *
         */
        get: function () {
            return new queryable_1.Queryable(this, "customizedPageStatus");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(File.prototype, "eTag", {
        /**
         * Gets the current eTag of a file
         *
         */
        get: function () {
            return new queryable_1.Queryable(this, "eTag");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(File.prototype, "exists", {
        /**
         * Gets a value that specifies whether the file exists.
         *
         */
        get: function () {
            return new queryable_1.Queryable(this, "exists");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(File.prototype, "length", {
        /**
         * Gets the size of the file in bytes, excluding the size of any Web Parts that are used in the file.
         */
        get: function () {
            return new queryable_1.Queryable(this, "length");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(File.prototype, "level", {
        /**
         * Gets a value that specifies the publishing level of the file.
         *
         */
        get: function () {
            return new queryable_1.Queryable(this, "level");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(File.prototype, "listItemAllFields", {
        /**
         * Gets a value that specifies the list item field values for the list item corresponding to the file.
         *
         */
        get: function () {
            return new items_1.Item(this, "listItemAllFields");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(File.prototype, "lockedByUser", {
        /**
         * Gets a value that returns the user that owns the current lock on the file.
         *
         */
        get: function () {
            return new queryable_1.Queryable(this, "lockedByUser");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(File.prototype, "majorVersion", {
        /**
         * Gets a value that specifies the major version of the file.
         *
         */
        get: function () {
            return new queryable_1.Queryable(this, "majorVersion");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(File.prototype, "minorVersion", {
        /**
         * Gets a value that specifies the minor version of the file.
         *
         */
        get: function () {
            return new queryable_1.Queryable(this, "minorVersion");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(File.prototype, "modifiedBy", {
        /**
         * Gets a value that returns the user who last modified the file.
         *
         */
        get: function () {
            return new queryable_1.Queryable(this, "modifiedBy");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(File.prototype, "name", {
        /**
         * Gets the name of the file including the extension.
         *
         */
        get: function () {
            return new queryable_1.Queryable(this, "name");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(File.prototype, "serverRelativeUrl", {
        /**
         * Gets the server relative url of a file
         *
         */
        get: function () {
            return new queryable_1.Queryable(this, "serverRelativeUrl");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(File.prototype, "timeCreated", {
        /**
         * Gets a value that specifies when the file was created.
         *
         */
        get: function () {
            return new queryable_1.Queryable(this, "timeCreated");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(File.prototype, "timeLastModified", {
        /**
         * Gets a value that specifies when the file was last modified.
         *
         */
        get: function () {
            return new queryable_1.Queryable(this, "timeLastModified");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(File.prototype, "title", {
        /**
         * Gets a value that specifies the display name of the file.
         *
         */
        get: function () {
            return new queryable_1.Queryable(this, "title");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(File.prototype, "uiVersion", {
        /**
         * Gets a value that specifies the implementation-specific version identifier of the file.
         *
         */
        get: function () {
            return new queryable_1.Queryable(this, "uiVersion");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(File.prototype, "uiVersionLabel", {
        /**
         * Gets a value that specifies the implementation-specific version identifier of the file.
         *
         */
        get: function () {
            return new queryable_1.Queryable(this, "uiVersionLabel");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(File.prototype, "versions", {
        /**
         * Gets a collection of versions
         *
         */
        get: function () {
            return new Versions(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(File.prototype, "value", {
        /**
         * Gets the contents of the file - If the file is not JSON a custom parser function should be used with the get call
         *
         */
        get: function () {
            return new queryable_1.Queryable(this, "$value");
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Approves the file submitted for content approval with the specified comment.
     * Only documents in lists that are enabled for content approval can be approved.
     *
     * @param comment The comment for the approval.
     */
    File.prototype.approve = function (comment) {
        return new File(this, "approve(comment='" + comment + "')").post();
    };
    /**
     * Stops the chunk upload session without saving the uploaded data.
     * If the file doesn’t already exist in the library, the partially uploaded file will be deleted.
     * Use this in response to user action (as in a request to cancel an upload) or an error or exception.
     * Use the uploadId value that was passed to the StartUpload method that started the upload session.
     * This method is currently available only on Office 365.
     *
     * @param uploadId The unique identifier of the upload session.
     */
    File.prototype.cancelUpload = function (uploadId) {
        return new File(this, "cancelUpload(uploadId=guid'" + uploadId + "')").post();
    };
    /**
     * Checks the file in to a document library based on the check-in type.
     *
     * @param comment A comment for the check-in. Its length must be <= 1023.
     * @param checkinType The check-in type for the file.
     */
    File.prototype.checkin = function (comment, checkinType) {
        if (comment === void 0) { comment = ""; }
        if (checkinType === void 0) { checkinType = CheckinType.Major; }
        // TODO: Enforce comment length <= 1023
        return new File(this, "checkin(comment='" + comment + "',checkintype=" + checkinType + ")").post();
    };
    /**
     * Checks out the file from a document library.
     */
    File.prototype.checkout = function () {
        return new File(this, "checkout").post();
    };
    /**
     * Continues the chunk upload session with an additional fragment.
     * The current file content is not changed.
     * Use the uploadId value that was passed to the StartUpload method that started the upload session.
     * This method is currently available only on Office 365.
     *
     * @param uploadId The unique identifier of the upload session.
     * @param fileOffset The size of the offset into the file where the fragment starts.
     * @param fragment The file contents.
     * @returns The size of the total uploaded data in bytes.
     */
    File.prototype.continueUpload = function (uploadId, fileOffset, b) {
        return new File(this, "continueUpload(uploadId=guid'" + uploadId + "',fileOffset=" + fileOffset + ")").postAs({ body: b });
    };
    /**
     * Copies the file to the destination url.
     *
     * @param url The absolute url or server relative url of the destination file path to copy to.
     * @param shouldOverWrite Should a file with the same name in the same location be overwritten?
     */
    File.prototype.copyTo = function (url, shouldOverWrite) {
        if (shouldOverWrite === void 0) { shouldOverWrite = true; }
        return new File(this, "copyTo(strnewurl='" + url + "',boverwrite=" + shouldOverWrite + ")").post();
    };
    /**
     * Delete this file.
     *
     * @param eTag Value used in the IF-Match header, by default "*"
     */
    File.prototype.delete = function (eTag) {
        if (eTag === void 0) { eTag = "*"; }
        return new File(this).post({
            headers: {
                "IF-Match": eTag,
                "X-HTTP-Method": "DELETE",
            },
        });
    };
    /**
     * Denies approval for a file that was submitted for content approval.
     * Only documents in lists that are enabled for content approval can be denied.
     *
     * @param comment The comment for the denial.
     */
    File.prototype.deny = function (comment) {
        if (comment === void 0) { comment = ""; }
        return new File(this, "deny(comment='" + comment + "')").post();
    };
    /**
     * Uploads the last file fragment and commits the file. The current file content is changed when this method completes.
     * Use the uploadId value that was passed to the StartUpload method that started the upload session.
     * This method is currently available only on Office 365.
     *
     * @param uploadId The unique identifier of the upload session.
     * @param fileOffset The size of the offset into the file where the fragment starts.
     * @param fragment The file contents.
     * @returns The newly uploaded file.
     */
    File.prototype.finishUpload = function (uploadId, fileOffset, fragment) {
        return new File(this, "finishUpload(uploadId=guid'" + uploadId + "',fileOffset=" + fileOffset + ")")
            .postAs({ body: fragment }).then(function (response) {
            return {
                data: response,
                file: new File(response.ServerRelativeUrl),
            };
        });
    };
    /**
     * Specifies the control set used to access, modify, or add Web Parts associated with this Web Part Page and view.
     * An exception is thrown if the file is not an ASPX page.
     *
     * @param scope The WebPartsPersonalizationScope view on the Web Parts page.
     */
    File.prototype.getLimitedWebPartManager = function (scope) {
        if (scope === void 0) { scope = WebPartsPersonalizationScope.User; }
        return new queryable_1.Queryable(this, "getLimitedWebPartManager(scope=" + scope + ")");
    };
    /**
     * Moves the file to the specified destination url.
     *
     * @param url The absolute url or server relative url of the destination file path to move to.
     * @param moveOperations The bitwise MoveOperations value for how to move the file.
     */
    File.prototype.moveTo = function (url, moveOperations) {
        if (moveOperations === void 0) { moveOperations = MoveOperations.Overwrite; }
        return new File(this, "moveTo(newurl='" + url + "',flags=" + moveOperations + ")").post();
    };
    /**
     * Opens the file as a stream.
     *
     */
    File.prototype.openBinaryStream = function () {
        return new queryable_1.Queryable(this, "openBinaryStream");
    };
    /**
     * Submits the file for content approval with the specified comment.
     *
     * @param comment The comment for the published file. Its length must be <= 1023.
     */
    File.prototype.publish = function (comment) {
        if (comment === void 0) { comment = ""; }
        return new File(this, "publish(comment='" + comment + "')").post();
    };
    /**
     * Moves the file to the Recycle Bin and returns the identifier of the new Recycle Bin item.
     *
     * @returns The GUID of the recycled file.
     */
    File.prototype.recycle = function () {
        return new File(this, "recycle").post();
    };
    /**
     * Uploads a binary file.
     *
     * @data The file contents.
     */
    File.prototype.saveBinaryStream = function (data) {
        return new File(this, "saveBinary").post({ body: data });
    };
    /**
     * Starts a new chunk upload session and uploads the first fragment.
     * The current file content is not changed when this method completes.
     * The method is idempotent (and therefore does not change the result) as long as you use the same values for uploadId and stream.
     * The upload session ends either when you use the CancelUpload method or when you successfully
     * complete the upload session by passing the rest of the file contents through the ContinueUpload and FinishUpload methods.
     * The StartUpload and ContinueUpload methods return the size of the running total of uploaded data in bytes,
     * so you can pass those return values to subsequent uses of ContinueUpload and FinishUpload.
     * This method is currently available only on Office 365.
     *
     * @param uploadId The unique identifier of the upload session.
     * @param fragment The file contents.
     * @returns The size of the total uploaded data in bytes.
     */
    File.prototype.startUpload = function (uploadId, fragment) {
        return new File(this, "startUpload(uploadId=guid'" + uploadId + "')").postAs({ body: fragment });
    };
    /**
     * Reverts an existing checkout for the file.
     *
     */
    File.prototype.undoCheckout = function () {
        return new File(this, "undoCheckout").post();
    };
    /**
     * Removes the file from content approval or unpublish a major version.
     *
     * @param comment The comment for the unpublish operation. Its length must be <= 1023.
     */
    File.prototype.unpublish = function (comment) {
        if (comment === void 0) { comment = ""; }
        // TODO: Enforce comment length <= 1023
        return new File(this, "unpublish(comment='" + comment + "')").post();
    };
    return File;
}(queryable_1.QueryableInstance));
exports.File = File;
/**
 * Describes a collection of Version objects
 *
 */
var Versions = (function (_super) {
    __extends(Versions, _super);
    /**
     * Creates a new instance of the File class
     *
     * @param baseUrl The url or Queryable which forms the parent of this fields collection
     */
    function Versions(baseUrl, path) {
        if (path === void 0) { path = "versions"; }
        _super.call(this, baseUrl, path);
    }
    /**
     * Gets a version by id
     *
     * @param versionId The id of the version to retrieve
     */
    Versions.prototype.getById = function (versionId) {
        var v = new Version(this);
        v.concat("(" + versionId + ")");
        return v;
    };
    /**
     * Deletes all the file version objects in the collection.
     *
     */
    Versions.prototype.deleteAll = function () {
        return new Versions(this, "deleteAll").post();
    };
    /**
     * Deletes the specified version of the file.
     *
     * @param versionId The ID of the file version to delete.
     */
    Versions.prototype.deleteById = function (versionId) {
        return new Versions(this, "deleteById(vid=" + versionId + ")").post();
    };
    /**
     * Deletes the file version object with the specified version label.
     *
     * @param label The version label of the file version to delete, for example: 1.2
     */
    Versions.prototype.deleteByLabel = function (label) {
        return new Versions(this, "deleteByLabel(versionlabel='" + label + "')").post();
    };
    /**
     * Creates a new file version from the file specified by the version label.
     *
     * @param label The version label of the file version to restore, for example: 1.2
     */
    Versions.prototype.restoreByLabel = function (label) {
        return new Versions(this, "restoreByLabel(versionlabel='" + label + "')").post();
    };
    return Versions;
}(queryable_1.QueryableCollection));
exports.Versions = Versions;
/**
 * Describes a single Version instance
 *
 */
var Version = (function (_super) {
    __extends(Version, _super);
    /**
     * Creates a new instance of the Version class
     *
     * @param baseUrl The url or Queryable which forms the parent of this fields collection
     * @param path Optional, if supplied will be appended to the supplied baseUrl
     */
    function Version(baseUrl, path) {
        _super.call(this, baseUrl, path);
    }
    Object.defineProperty(Version.prototype, "checkInComment", {
        /**
         * Gets a value that specifies the check-in comment.
         *
         */
        get: function () {
            return new queryable_1.Queryable(this, "checkInComment");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Version.prototype, "created", {
        /**
         * Gets a value that specifies the creation date and time for the file version.
         *
         */
        get: function () {
            return new queryable_1.Queryable(this, "created");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Version.prototype, "createdBy", {
        /**
         * Gets a value that specifies the user that represents the creator of the file version.
         *
         */
        get: function () {
            return new queryable_1.Queryable(this, "createdBy");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Version.prototype, "id", {
        /**
         * Gets the internal identifier for the file version.
         *
         */
        get: function () {
            return new queryable_1.Queryable(this, "id");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Version.prototype, "isCurrentVersion", {
        /**
         * Gets a value that specifies whether the file version is the current version.
         *
         */
        get: function () {
            return new queryable_1.Queryable(this, "isCurrentVersion");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Version.prototype, "size", {
        /**
         * Gets a value that specifies the size of this version of the file.
         *
         */
        get: function () {
            return new queryable_1.Queryable(this, "size");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Version.prototype, "url", {
        /**
         * Gets a value that specifies the relative URL of the file version based on the URL for the site or subsite.
         *
         */
        get: function () {
            return new queryable_1.Queryable(this, "url");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Version.prototype, "versionLabel", {
        /**
         * Gets a value that specifies the implementation specific identifier of the file.
         * Uses the majorVersionNumber.minorVersionNumber format, for example: 1.2
         *
         */
        get: function () {
            return new queryable_1.Queryable(this, "versionLabel");
        },
        enumerable: true,
        configurable: true
    });
    /**
    * Delete a specific version of a file.
    *
    * @param eTag Value used in the IF-Match header, by default "*"
    */
    Version.prototype.delete = function (eTag) {
        if (eTag === void 0) { eTag = "*"; }
        return this.post({
            headers: {
                "IF-Match": eTag,
                "X-HTTP-Method": "DELETE",
            },
        });
    };
    return Version;
}(queryable_1.QueryableInstance));
exports.Version = Version;
(function (CheckinType) {
    CheckinType[CheckinType["Minor"] = 0] = "Minor";
    CheckinType[CheckinType["Major"] = 1] = "Major";
    CheckinType[CheckinType["Overwrite"] = 2] = "Overwrite";
})(exports.CheckinType || (exports.CheckinType = {}));
var CheckinType = exports.CheckinType;
(function (WebPartsPersonalizationScope) {
    WebPartsPersonalizationScope[WebPartsPersonalizationScope["User"] = 0] = "User";
    WebPartsPersonalizationScope[WebPartsPersonalizationScope["Shared"] = 1] = "Shared";
})(exports.WebPartsPersonalizationScope || (exports.WebPartsPersonalizationScope = {}));
var WebPartsPersonalizationScope = exports.WebPartsPersonalizationScope;
(function (MoveOperations) {
    MoveOperations[MoveOperations["Overwrite"] = 1] = "Overwrite";
    MoveOperations[MoveOperations["AllowBrokenThickets"] = 8] = "AllowBrokenThickets";
})(exports.MoveOperations || (exports.MoveOperations = {}));
var MoveOperations = exports.MoveOperations;
(function (TemplateFileType) {
    TemplateFileType[TemplateFileType["StandardPage"] = 0] = "StandardPage";
    TemplateFileType[TemplateFileType["WikiPage"] = 1] = "WikiPage";
    TemplateFileType[TemplateFileType["FormPage"] = 2] = "FormPage";
})(exports.TemplateFileType || (exports.TemplateFileType = {}));
var TemplateFileType = exports.TemplateFileType;
