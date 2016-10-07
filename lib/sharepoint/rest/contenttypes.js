"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var queryable_1 = require("./queryable");
/**
 * Describes a collection of content types
 *
 */
var ContentTypes = (function (_super) {
    __extends(ContentTypes, _super);
    /**
     * Creates a new instance of the ContentTypes class
     *
     * @param baseUrl The url or Queryable which forms the parent of this content types collection
     */
    function ContentTypes(baseUrl, path) {
        if (path === void 0) { path = "contenttypes"; }
        _super.call(this, baseUrl, path);
    }
    /**
     * Gets a ContentType by content type id
     */
    ContentTypes.prototype.getById = function (id) {
        var ct = new ContentType(this);
        ct.concat("('" + id + "')");
        return ct;
    };
    return ContentTypes;
}(queryable_1.QueryableCollection));
exports.ContentTypes = ContentTypes;
/**
 * Describes a single ContentType instance
 *
 */
var ContentType = (function (_super) {
    __extends(ContentType, _super);
    /**
     * Creates a new instance of the ContentType class
     *
     * @param baseUrl The url or Queryable which forms the parent of this content type instance
     */
    function ContentType(baseUrl, path) {
        _super.call(this, baseUrl, path);
    }
    Object.defineProperty(ContentType.prototype, "descriptionResource", {
        /**
         * Gets the description resource
         */
        get: function () {
            return new queryable_1.Queryable(this, "descriptionResource");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContentType.prototype, "fieldLinks", {
        /**
         * Gets the column (also known as field) references in the content type.
        */
        get: function () {
            return new queryable_1.Queryable(this, "fieldLinks");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContentType.prototype, "fields", {
        /**
         * Gets a value that specifies the collection of fields for the content type.
         */
        get: function () {
            return new queryable_1.Queryable(this, "fields");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContentType.prototype, "nameResource", {
        /**
         * Gets name resource
         */
        get: function () {
            return new queryable_1.Queryable(this, "nameResource");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContentType.prototype, "parent", {
        /**
         * Gets the parent content type of the content type.
         */
        get: function () {
            return new queryable_1.Queryable(this, "parent");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContentType.prototype, "workflowAssociations", {
        /**
         * Gets a value that specifies the collection of workflow associations for the content type.
         */
        get: function () {
            return new queryable_1.Queryable(this, "workflowAssociations");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContentType.prototype, "description", {
        /**
         * Gets or sets a description of the content type.
         */
        get: function () {
            return new queryable_1.Queryable(this, "description");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContentType.prototype, "displayFormTemplateName", {
        /**
         * Gets or sets a value that specifies the name of a custom display form template
         * to use for list items that have been assigned the content type.
         */
        get: function () {
            return new queryable_1.Queryable(this, "displayFormTemplateName");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContentType.prototype, "displayFormUrl", {
        /**
         * Gets or sets a value that specifies the URL of a custom display form
         * to use for list items that have been assigned the content type.
         */
        get: function () {
            return new queryable_1.Queryable(this, "displayFormUrl");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContentType.prototype, "documentTemplate", {
        /**
         * Gets or sets a value that specifies the file path to the document template
         * used for a new list item that has been assigned the content type.
         */
        get: function () {
            return new queryable_1.Queryable(this, "documentTemplate");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContentType.prototype, "documentTemplateUrl", {
        /**
         * Gets a value that specifies the URL of the document template assigned to the content type.
         */
        get: function () {
            return new queryable_1.Queryable(this, "documentTemplateUrl");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContentType.prototype, "editFormTemplateName", {
        /**
         * Gets or sets a value that specifies the name of a custom edit form template
         * to use for list items that have been assigned the content type.
         */
        get: function () {
            return new queryable_1.Queryable(this, "editFormTemplateName");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContentType.prototype, "editFormUrl", {
        /**
         * Gets or sets a value that specifies the URL of a custom edit form
         * to use for list items that have been assigned the content type.
         */
        get: function () {
            return new queryable_1.Queryable(this, "editFormUrl");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContentType.prototype, "group", {
        /**
         * Gets or sets a value that specifies the content type group for the content type.
         */
        get: function () {
            return new queryable_1.Queryable(this, "group");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContentType.prototype, "hidden", {
        /**
        * Gets or sets a value that specifies whether the content type is unavailable
        * for creation or usage directly from a user interface.
        */
        get: function () {
            return new queryable_1.Queryable(this, "hidden");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContentType.prototype, "jsLink", {
        /**
         * Gets or sets the JSLink for the content type custom form template.
         * NOTE!
         * The JSLink property is not supported on Survey or Events lists.
         * A SharePoint calendar is an Events list.
         */
        get: function () {
            return new queryable_1.Queryable(this, "jsLink");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContentType.prototype, "name", {
        /**
         * Gets a value that specifies the name of the content type.
         */
        get: function () {
            return new queryable_1.Queryable(this, "name");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContentType.prototype, "newFormTemplateName", {
        /**
         * Gets a value that specifies new form template name of the content type.
         */
        get: function () {
            return new queryable_1.Queryable(this, "newFormTemplateName");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContentType.prototype, "newFormUrl", {
        /**
        * Gets a value that specifies new form url of the content type.
        */
        get: function () {
            return new queryable_1.Queryable(this, "newFormUrl");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContentType.prototype, "readOnly", {
        /**
         * Gets or sets a value that specifies whether changes
         * to the content type properties are denied.
         */
        get: function () {
            return new queryable_1.Queryable(this, "readOnly");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContentType.prototype, "schemaXml", {
        /**
         * Gets a value that specifies the XML Schema representing the content type.
         */
        get: function () {
            return new queryable_1.Queryable(this, "schemaXml");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContentType.prototype, "scope", {
        /**
         * Gets a value that specifies a server-relative path to the content type scope of the content type.
         */
        get: function () {
            return new queryable_1.Queryable(this, "scope");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContentType.prototype, "sealed", {
        /**
         * Gets or sets whether the content type can be modified.
         */
        get: function () {
            return new queryable_1.Queryable(this, "sealed");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContentType.prototype, "stringId", {
        /**
         * A string representation of the value of the Id.
         */
        get: function () {
            return new queryable_1.Queryable(this, "stringId");
        },
        enumerable: true,
        configurable: true
    });
    return ContentType;
}(queryable_1.QueryableInstance));
exports.ContentType = ContentType;
