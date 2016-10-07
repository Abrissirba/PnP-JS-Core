"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var queryable_1 = require("./queryable");
var util_1 = require("../../utils/util");
var Types = require("./types");
/**
 * Describes a collection of Field objects
 *
 */
var Fields = (function (_super) {
    __extends(Fields, _super);
    /**
     * Creates a new instance of the Fields class
     *
     * @param baseUrl The url or Queryable which forms the parent of this fields collection
     */
    function Fields(baseUrl, path) {
        if (path === void 0) { path = "fields"; }
        _super.call(this, baseUrl, path);
    }
    /**
     * Gets a field from the collection by title
     *
     * @param title The case-sensitive title of the field
     */
    Fields.prototype.getByTitle = function (title) {
        return new Field(this, "getByTitle('" + title + "')");
    };
    /**
     * Gets a field from the collection by using internal name or title
     *
     * @param name The case-sensitive internal name or title of the field
     */
    Fields.prototype.getByInternalNameOrTitle = function (name) {
        return new Field(this, "getByInternalNameOrTitle('" + name + "')");
    };
    /**
     * Gets a list from the collection by guid id
     *
     * @param title The Id of the list
     */
    Fields.prototype.getById = function (id) {
        var f = new Field(this);
        f.concat("('" + id + "')");
        return f;
    };
    /**
     * Creates a field based on the specified schema
     */
    Fields.prototype.createFieldAsXml = function (xml) {
        var _this = this;
        var info;
        if (typeof xml === "string") {
            info = { SchemaXml: xml };
        }
        else {
            info = xml;
        }
        var postBody = JSON.stringify({
            "parameters": util_1.Util.extend({
                "__metadata": {
                    "type": "SP.XmlSchemaFieldCreationInformation",
                },
            }, info),
        });
        var q = new Fields(this, "createfieldasxml");
        return q.postAs({ body: postBody }).then(function (data) {
            return {
                data: data,
                field: _this.getById(data.Id),
            };
        });
    };
    /**
     * Adds a new list to the collection
     *
     * @param title The new field's title
     * @param fieldType The new field's type (ex: SP.FieldText)
     * @param properties Differ by type of field being created (see: https://msdn.microsoft.com/en-us/library/office/dn600182.aspx)
     */
    Fields.prototype.add = function (title, fieldType, properties) {
        var _this = this;
        if (properties === void 0) { properties = {}; }
        var postBody = JSON.stringify(util_1.Util.extend({
            "__metadata": { "type": fieldType },
            "Title": title,
        }, properties));
        return this.postAs({ body: postBody }).then(function (data) {
            return {
                data: data,
                field: _this.getById(data.Id),
            };
        });
    };
    /**
     * Adds a new SP.FieldText to the collection
     *
     * @param title The field title
     * @param maxLength The maximum number of characters allowed in the value of the field.
     * @param properties Differ by type of field being created (see: https://msdn.microsoft.com/en-us/library/office/dn600182.aspx)
     */
    Fields.prototype.addText = function (title, maxLength, properties) {
        if (maxLength === void 0) { maxLength = 255; }
        var props = {
            FieldTypeKind: 2,
        };
        return this.add(title, "SP.FieldText", util_1.Util.extend(props, properties));
    };
    /**
     * Adds a new SP.FieldCalculated to the collection
     *
     * @param title The field title.
     * @param formula The formula for the field.
     * @param dateFormat The date and time format that is displayed in the field.
     * @param outputType Specifies the output format for the field. Represents a FieldType value.
     * @param properties Differ by type of field being created (see: https://msdn.microsoft.com/en-us/library/office/dn600182.aspx)
     */
    Fields.prototype.addCalculated = function (title, formula, dateFormat, outputType, properties) {
        if (outputType === void 0) { outputType = Types.FieldTypes.Text; }
        var props = {
            DateFormat: dateFormat,
            FieldTypeKind: 17,
            Formula: formula,
            OutputType: outputType,
        };
        return this.add(title, "SP.FieldCalculated", util_1.Util.extend(props, properties));
    };
    /**
     * Adds a new SP.FieldDateTime to the collection
     *
     * @param title The field title
     * @param displayFormat The format of the date and time that is displayed in the field.
     * @param calendarType Specifies the calendar type of the field.
     * @param properties Differ by type of field being created (see: https://msdn.microsoft.com/en-us/library/office/dn600182.aspx)
     */
    Fields.prototype.addDateTime = function (title, displayFormat, calendarType, friendlyDisplayFormat, properties) {
        if (displayFormat === void 0) { displayFormat = Types.DateTimeFieldFormatType.DateOnly; }
        if (calendarType === void 0) { calendarType = Types.CalendarType.Gregorian; }
        if (friendlyDisplayFormat === void 0) { friendlyDisplayFormat = 0; }
        var props = {
            DateTimeCalendarType: calendarType,
            DisplayFormat: displayFormat,
            FieldTypeKind: 4,
            FriendlyDisplayFormat: friendlyDisplayFormat,
        };
        return this.add(title, "SP.FieldDateTime", util_1.Util.extend(props, properties));
    };
    /**
     * Adds a new SP.FieldNumber to the collection
     *
     * @param title The field title
     * @param minValue The field's minimum value
     * @param maxValue The field's maximum value
     * @param properties Differ by type of field being created (see: https://msdn.microsoft.com/en-us/library/office/dn600182.aspx)
     */
    Fields.prototype.addNumber = function (title, minValue, maxValue, properties) {
        var props = { FieldTypeKind: 9 };
        if (typeof minValue !== "undefined") {
            props = util_1.Util.extend({ MinimumValue: minValue }, props);
        }
        if (typeof maxValue !== "undefined") {
            props = util_1.Util.extend({ MaximumValue: maxValue }, props);
        }
        return this.add(title, "SP.FieldNumber", util_1.Util.extend(props, properties));
    };
    /**
     * Adds a new SP.FieldCurrency to the collection
     *
     * @param title The field title
     * @param minValue The field's minimum value
     * @param maxValue The field's maximum value
     * @param currencyLocalId Specifies the language code identifier (LCID) used to format the value of the field
     * @param properties Differ by type of field being created (see: https://msdn.microsoft.com/en-us/library/office/dn600182.aspx)
     */
    Fields.prototype.addCurrency = function (title, minValue, maxValue, currencyLocalId, properties) {
        if (currencyLocalId === void 0) { currencyLocalId = 1033; }
        var props = {
            CurrencyLocaleId: currencyLocalId,
            FieldTypeKind: 10,
        };
        if (typeof minValue !== "undefined") {
            props = util_1.Util.extend({ MinimumValue: minValue }, props);
        }
        if (typeof maxValue !== "undefined") {
            props = util_1.Util.extend({ MaximumValue: maxValue }, props);
        }
        return this.add(title, "SP.FieldCurrency", util_1.Util.extend(props, properties));
    };
    /**
     * Adds a new SP.FieldMultiLineText to the collection
     *
     * @param title The field title
     * @param numberOfLines Specifies the number of lines of text to display for the field.
     * @param richText Specifies whether the field supports rich formatting.
     * @param restrictedMode Specifies whether the field supports a subset of rich formatting.
     * @param appendOnly Specifies whether all changes to the value of the field are displayed in list forms.
     * @param allowHyperlink Specifies whether a hyperlink is allowed as a value of the field.
     * @param properties Differ by type of field being created (see: https://msdn.microsoft.com/en-us/library/office/dn600182.aspx)
     *
     */
    Fields.prototype.addMultilineText = function (title, numberOfLines, richText, restrictedMode, appendOnly, allowHyperlink, properties) {
        if (numberOfLines === void 0) { numberOfLines = 6; }
        if (richText === void 0) { richText = true; }
        if (restrictedMode === void 0) { restrictedMode = false; }
        if (appendOnly === void 0) { appendOnly = false; }
        if (allowHyperlink === void 0) { allowHyperlink = true; }
        var props = {
            AllowHyperlink: allowHyperlink,
            AppendOnly: appendOnly,
            FieldTypeKind: 3,
            NumberOfLines: numberOfLines,
            RestrictedMode: restrictedMode,
            RichText: richText,
        };
        return this.add(title, "SP.FieldMultiLineText", util_1.Util.extend(props, properties));
    };
    /**
     * Adds a new SP.FieldUrl to the collection
     *
     * @param title The field title
     */
    Fields.prototype.addUrl = function (title, displayFormat, properties) {
        if (displayFormat === void 0) { displayFormat = Types.UrlFieldFormatType.Hyperlink; }
        var props = {
            DisplayFormat: displayFormat,
            FieldTypeKind: 11,
        };
        return this.add(title, "SP.FieldUrl", util_1.Util.extend(props, properties));
    };
    return Fields;
}(queryable_1.QueryableCollection));
exports.Fields = Fields;
/**
 * Describes a single of Field instance
 *
 */
var Field = (function (_super) {
    __extends(Field, _super);
    /**
     * Creates a new instance of the Field class
     *
     * @param baseUrl The url or Queryable which forms the parent of this field instance
     */
    function Field(baseUrl, path) {
        _super.call(this, baseUrl, path);
    }
    Object.defineProperty(Field.prototype, "canBeDeleted", {
        /**
          * Gets a value that specifies whether the field can be deleted.
          */
        get: function () {
            return new queryable_1.Queryable(this, "canBeDeleted");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Field.prototype, "defaultValue", {
        /**
         * Gets a value that specifies the default value for the field.
         */
        get: function () {
            return new queryable_1.Queryable(this, "defaultValue");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Field.prototype, "description", {
        /**
         * Gets a value that specifies the description of the field.
         */
        get: function () {
            return new queryable_1.Queryable(this, "description");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Field.prototype, "direction", {
        /**
         * Gets a value that specifies the reading order of the field.
         */
        get: function () {
            return new queryable_1.Queryable(this, "direction");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Field.prototype, "enforceUniqueValues", {
        /**
         * Gets a value that specifies whether to require unique field values in a list or library column.
         */
        get: function () {
            return new queryable_1.Queryable(this, "enforceUniqueValues");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Field.prototype, "entityPropertyName", {
        /**
         * Gets the name of the entity property for the list item entity that uses this field.
         */
        get: function () {
            return new queryable_1.Queryable(this, "entityPropertyName");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Field.prototype, "filterable", {
        /**
         * Gets a value that specifies whether list items in the list can be filtered by the field value.
         */
        get: function () {
            return new queryable_1.Queryable(this, "filterable");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Field.prototype, "fromBaseType", {
        /**
         * Gets a Boolean value that indicates whether the field derives from a base field type.
         */
        get: function () {
            return new queryable_1.Queryable(this, "fromBaseType");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Field.prototype, "group", {
        /**
         * Gets a value that specifies the field group.
         */
        get: function () {
            return new queryable_1.Queryable(this, "group");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Field.prototype, "hidden", {
        /**
         * Gets a value that specifies whether the field is hidden in list views and list forms.
         */
        get: function () {
            return new queryable_1.Queryable(this, "hidden");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Field.prototype, "id", {
        /**
         * Gets a value that specifies the field identifier.
         */
        get: function () {
            return new queryable_1.Queryable(this, "id");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Field.prototype, "indexed", {
        /**
         * Gets a Boolean value that specifies whether the field is indexed.
         */
        get: function () {
            return new queryable_1.Queryable(this, "indexed");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Field.prototype, "internalName", {
        /**
         * Gets a value that specifies the field internal name.
         */
        get: function () {
            return new queryable_1.Queryable(this, "internalName");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Field.prototype, "jsLink", {
        /**
         * Gets the name of an external JS file containing any client rendering logic for fields of this type.
         */
        get: function () {
            return new queryable_1.Queryable(this, "jsLink");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Field.prototype, "readOnlyField", {
        /**
         * Gets a value that specifies whether the value of the field is read-only.
         */
        get: function () {
            return new queryable_1.Queryable(this, "readOnlyField");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Field.prototype, "required", {
        /**
         * Gets a value that specifies whether the field requires a value.
         */
        get: function () {
            return new queryable_1.Queryable(this, "required");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Field.prototype, "schemaXml", {
        /**
         * Gets a value that specifies the XML schema that defines the field.
         */
        get: function () {
            return new queryable_1.Queryable(this, "schemaXml");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Field.prototype, "scope", {
        /**
         * Gets a value that specifies the server-relative URL of the list or the site to which the field belongs.
         */
        get: function () {
            return new queryable_1.Queryable(this, "scope");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Field.prototype, "sealed", {
        /**
         * Gets a value that specifies whether properties on the field cannot be changed and whether the field cannot be deleted.
         */
        get: function () {
            return new queryable_1.Queryable(this, "sealed");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Field.prototype, "sortable", {
        /**
         * Gets a value that specifies whether list items in the list can be sorted by the field value.
         */
        get: function () {
            return new queryable_1.Queryable(this, "sortable");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Field.prototype, "staticName", {
        /**
         * Gets a value that specifies a customizable identifier of the field.
         */
        get: function () {
            return new queryable_1.Queryable(this, "staticName");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Field.prototype, "title", {
        /**
         * Gets value that specifies the display name of the field.
         */
        get: function () {
            return new queryable_1.Queryable(this, "title");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Field.prototype, "fieldTypeKind", {
        /**
         * Gets a value that specifies the type of the field. Represents a FieldType value.
         * See FieldType in the .NET client object model reference for a list of field type values.
         */
        get: function () {
            return new queryable_1.Queryable(this, "fieldTypeKind");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Field.prototype, "typeAsString", {
        /**
         * Gets a value that specifies the type of the field.
         */
        get: function () {
            return new queryable_1.Queryable(this, "typeAsString");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Field.prototype, "typeDisplayName", {
        /**
         * Gets a value that specifies the display name for the type of the field.
         */
        get: function () {
            return new queryable_1.Queryable(this, "typeDisplayName");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Field.prototype, "typeShortDescription", {
        /**
         * Gets a value that specifies the description for the type of the field.
         */
        get: function () {
            return new queryable_1.Queryable(this, "typeShortDescription");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Field.prototype, "validationFormula", {
        /**
         * Gets a value that specifies the data validation criteria for the value of the field.
         */
        get: function () {
            return new queryable_1.Queryable(this, "validationFormula");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Field.prototype, "validationMessage", {
        /**
         * Gets a value that specifies the error message returned when data validation fails for the field.
         */
        get: function () {
            return new queryable_1.Queryable(this, "validationMessage");
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Updates this field intance with the supplied properties
     *
     * @param properties A plain object hash of values to update for the list
     * @param fieldType The type value, required to update child field type properties
     */
    Field.prototype.update = function (properties, fieldType) {
        var _this = this;
        if (fieldType === void 0) { fieldType = "SP.Field"; }
        var postBody = JSON.stringify(util_1.Util.extend({
            "__metadata": { "type": fieldType },
        }, properties));
        return this.post({
            body: postBody,
            headers: {
                "X-HTTP-Method": "MERGE",
            },
        }).then(function (data) {
            return {
                data: data,
                field: _this,
            };
        });
    };
    /**
     * Delete this fields
     *
     */
    Field.prototype.delete = function () {
        return this.post({
            headers: {
                "X-HTTP-Method": "DELETE",
            },
        });
    };
    /**
     * Sets the value of the ShowInDisplayForm property for this field.
     */
    Field.prototype.setShowInDisplayForm = function (show) {
        var q = new Field(this, "setshowindisplayform(" + show + ")");
        return q.post();
    };
    /**
     * Sets the value of the ShowInEditForm property for this field.
     */
    Field.prototype.setShowInEditForm = function (show) {
        var q = new Field(this, "setshowineditform(" + show + ")");
        return q.post();
    };
    /**
     * Sets the value of the ShowInNewForm property for this field.
     */
    Field.prototype.setShowInNewForm = function (show) {
        var q = new Field(this, "setshowinnewform(" + show + ")");
        return q.post();
    };
    return Field;
}(queryable_1.QueryableInstance));
exports.Field = Field;
