import { Queryable, QueryableCollection, QueryableInstance } from "./queryable";
import { TypedHash } from "../../collections/collections";
import * as Types from "./types";
/**
 * Describes a collection of Field objects
 *
 */
export declare class Fields extends QueryableCollection {
    /**
     * Creates a new instance of the Fields class
     *
     * @param baseUrl The url or Queryable which forms the parent of this fields collection
     */
    constructor(baseUrl: string | Queryable, path?: string);
    /**
     * Gets a field from the collection by title
     *
     * @param title The case-sensitive title of the field
     */
    getByTitle(title: string): Field;
    /**
     * Gets a field from the collection by using internal name or title
     *
     * @param name The case-sensitive internal name or title of the field
     */
    getByInternalNameOrTitle(name: string): Field;
    /**
     * Gets a list from the collection by guid id
     *
     * @param title The Id of the list
     */
    getById(id: string): Field;
    /**
     * Creates a field based on the specified schema
     */
    createFieldAsXml(xml: string | Types.XmlSchemaFieldCreationInformation): Promise<FieldAddResult>;
    /**
     * Adds a new list to the collection
     *
     * @param title The new field's title
     * @param fieldType The new field's type (ex: SP.FieldText)
     * @param properties Differ by type of field being created (see: https://msdn.microsoft.com/en-us/library/office/dn600182.aspx)
     */
    add(title: string, fieldType: string, properties?: TypedHash<string | number | boolean>): Promise<FieldAddResult>;
    /**
     * Adds a new SP.FieldText to the collection
     *
     * @param title The field title
     * @param maxLength The maximum number of characters allowed in the value of the field.
     * @param properties Differ by type of field being created (see: https://msdn.microsoft.com/en-us/library/office/dn600182.aspx)
     */
    addText(title: string, maxLength?: number, properties?: TypedHash<string | number | boolean>): Promise<FieldAddResult>;
    /**
     * Adds a new SP.FieldCalculated to the collection
     *
     * @param title The field title.
     * @param formula The formula for the field.
     * @param dateFormat The date and time format that is displayed in the field.
     * @param outputType Specifies the output format for the field. Represents a FieldType value.
     * @param properties Differ by type of field being created (see: https://msdn.microsoft.com/en-us/library/office/dn600182.aspx)
     */
    addCalculated(title: string, formula: string, dateFormat: Types.DateTimeFieldFormatType, outputType?: Types.FieldTypes, properties?: TypedHash<string | number | boolean>): Promise<FieldAddResult>;
    /**
     * Adds a new SP.FieldDateTime to the collection
     *
     * @param title The field title
     * @param displayFormat The format of the date and time that is displayed in the field.
     * @param calendarType Specifies the calendar type of the field.
     * @param properties Differ by type of field being created (see: https://msdn.microsoft.com/en-us/library/office/dn600182.aspx)
     */
    addDateTime(title: string, displayFormat?: Types.DateTimeFieldFormatType, calendarType?: Types.CalendarType, friendlyDisplayFormat?: number, properties?: TypedHash<string | number | boolean>): Promise<FieldAddResult>;
    /**
     * Adds a new SP.FieldNumber to the collection
     *
     * @param title The field title
     * @param minValue The field's minimum value
     * @param maxValue The field's maximum value
     * @param properties Differ by type of field being created (see: https://msdn.microsoft.com/en-us/library/office/dn600182.aspx)
     */
    addNumber(title: string, minValue?: number, maxValue?: number, properties?: TypedHash<string | number | boolean>): Promise<FieldAddResult>;
    /**
     * Adds a new SP.FieldCurrency to the collection
     *
     * @param title The field title
     * @param minValue The field's minimum value
     * @param maxValue The field's maximum value
     * @param currencyLocalId Specifies the language code identifier (LCID) used to format the value of the field
     * @param properties Differ by type of field being created (see: https://msdn.microsoft.com/en-us/library/office/dn600182.aspx)
     */
    addCurrency(title: string, minValue?: number, maxValue?: number, currencyLocalId?: number, properties?: TypedHash<string | number | boolean>): Promise<FieldAddResult>;
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
    addMultilineText(title: string, numberOfLines?: number, richText?: boolean, restrictedMode?: boolean, appendOnly?: boolean, allowHyperlink?: boolean, properties?: TypedHash<string | number | boolean>): Promise<FieldAddResult>;
    /**
     * Adds a new SP.FieldUrl to the collection
     *
     * @param title The field title
     */
    addUrl(title: string, displayFormat?: Types.UrlFieldFormatType, properties?: TypedHash<string | number | boolean>): Promise<FieldAddResult>;
}
/**
 * Describes a single of Field instance
 *
 */
export declare class Field extends QueryableInstance {
    /**
     * Creates a new instance of the Field class
     *
     * @param baseUrl The url or Queryable which forms the parent of this field instance
     */
    constructor(baseUrl: string | Queryable, path?: string);
    /**
      * Gets a value that specifies whether the field can be deleted.
      */
    canBeDeleted: Queryable;
    /**
     * Gets a value that specifies the default value for the field.
     */
    defaultValue: Queryable;
    /**
     * Gets a value that specifies the description of the field.
     */
    description: Queryable;
    /**
     * Gets a value that specifies the reading order of the field.
     */
    direction: Queryable;
    /**
     * Gets a value that specifies whether to require unique field values in a list or library column.
     */
    enforceUniqueValues: Queryable;
    /**
     * Gets the name of the entity property for the list item entity that uses this field.
     */
    entityPropertyName: Queryable;
    /**
     * Gets a value that specifies whether list items in the list can be filtered by the field value.
     */
    filterable: Queryable;
    /**
     * Gets a Boolean value that indicates whether the field derives from a base field type.
     */
    fromBaseType: Queryable;
    /**
     * Gets a value that specifies the field group.
     */
    group: Queryable;
    /**
     * Gets a value that specifies whether the field is hidden in list views and list forms.
     */
    hidden: Queryable;
    /**
     * Gets a value that specifies the field identifier.
     */
    id: Queryable;
    /**
     * Gets a Boolean value that specifies whether the field is indexed.
     */
    indexed: Queryable;
    /**
     * Gets a value that specifies the field internal name.
     */
    internalName: Queryable;
    /**
     * Gets the name of an external JS file containing any client rendering logic for fields of this type.
     */
    jsLink: Queryable;
    /**
     * Gets a value that specifies whether the value of the field is read-only.
     */
    readOnlyField: Queryable;
    /**
     * Gets a value that specifies whether the field requires a value.
     */
    required: Queryable;
    /**
     * Gets a value that specifies the XML schema that defines the field.
     */
    schemaXml: Queryable;
    /**
     * Gets a value that specifies the server-relative URL of the list or the site to which the field belongs.
     */
    scope: Queryable;
    /**
     * Gets a value that specifies whether properties on the field cannot be changed and whether the field cannot be deleted.
     */
    sealed: Queryable;
    /**
     * Gets a value that specifies whether list items in the list can be sorted by the field value.
     */
    sortable: Queryable;
    /**
     * Gets a value that specifies a customizable identifier of the field.
     */
    staticName: Queryable;
    /**
     * Gets value that specifies the display name of the field.
     */
    title: Queryable;
    /**
     * Gets a value that specifies the type of the field. Represents a FieldType value.
     * See FieldType in the .NET client object model reference for a list of field type values.
     */
    fieldTypeKind: Queryable;
    /**
     * Gets a value that specifies the type of the field.
     */
    typeAsString: Queryable;
    /**
     * Gets a value that specifies the display name for the type of the field.
     */
    typeDisplayName: Queryable;
    /**
     * Gets a value that specifies the description for the type of the field.
     */
    typeShortDescription: Queryable;
    /**
     * Gets a value that specifies the data validation criteria for the value of the field.
     */
    validationFormula: Queryable;
    /**
     * Gets a value that specifies the error message returned when data validation fails for the field.
     */
    validationMessage: Queryable;
    /**
     * Updates this field intance with the supplied properties
     *
     * @param properties A plain object hash of values to update for the list
     * @param fieldType The type value, required to update child field type properties
     */
    update(properties: TypedHash<string | number | boolean>, fieldType?: string): Promise<FieldUpdateResult>;
    /**
     * Delete this fields
     *
     */
    delete(): Promise<void>;
    /**
     * Sets the value of the ShowInDisplayForm property for this field.
     */
    setShowInDisplayForm(show: boolean): Promise<void>;
    /**
     * Sets the value of the ShowInEditForm property for this field.
     */
    setShowInEditForm(show: boolean): Promise<void>;
    /**
     * Sets the value of the ShowInNewForm property for this field.
     */
    setShowInNewForm(show: boolean): Promise<void>;
}
export interface FieldAddResult {
    data: any;
    field: Field;
}
export interface FieldUpdateResult {
    data: any;
    field: Field;
}
