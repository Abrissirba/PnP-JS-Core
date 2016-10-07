import { Queryable, QueryableCollection, QueryableInstance } from "./queryable";
/**
 * Describes a collection of content types
 *
 */
export declare class ContentTypes extends QueryableCollection {
    /**
     * Creates a new instance of the ContentTypes class
     *
     * @param baseUrl The url or Queryable which forms the parent of this content types collection
     */
    constructor(baseUrl: string | Queryable, path?: string);
    /**
     * Gets a ContentType by content type id
     */
    getById(id: string): ContentType;
}
/**
 * Describes a single ContentType instance
 *
 */
export declare class ContentType extends QueryableInstance {
    /**
     * Creates a new instance of the ContentType class
     *
     * @param baseUrl The url or Queryable which forms the parent of this content type instance
     */
    constructor(baseUrl: string | Queryable, path?: string);
    /**
     * Gets the description resource
     */
    descriptionResource: Queryable;
    /**
     * Gets the column (also known as field) references in the content type.
    */
    fieldLinks: Queryable;
    /**
     * Gets a value that specifies the collection of fields for the content type.
     */
    fields: Queryable;
    /**
     * Gets name resource
     */
    nameResource: Queryable;
    /**
     * Gets the parent content type of the content type.
     */
    parent: Queryable;
    /**
     * Gets a value that specifies the collection of workflow associations for the content type.
     */
    workflowAssociations: Queryable;
    /**
     * Gets or sets a description of the content type.
     */
    description: Queryable;
    /**
     * Gets or sets a value that specifies the name of a custom display form template
     * to use for list items that have been assigned the content type.
     */
    displayFormTemplateName: Queryable;
    /**
     * Gets or sets a value that specifies the URL of a custom display form
     * to use for list items that have been assigned the content type.
     */
    displayFormUrl: Queryable;
    /**
     * Gets or sets a value that specifies the file path to the document template
     * used for a new list item that has been assigned the content type.
     */
    documentTemplate: Queryable;
    /**
     * Gets a value that specifies the URL of the document template assigned to the content type.
     */
    documentTemplateUrl: Queryable;
    /**
     * Gets or sets a value that specifies the name of a custom edit form template
     * to use for list items that have been assigned the content type.
     */
    editFormTemplateName: Queryable;
    /**
     * Gets or sets a value that specifies the URL of a custom edit form
     * to use for list items that have been assigned the content type.
     */
    editFormUrl: Queryable;
    /**
     * Gets or sets a value that specifies the content type group for the content type.
     */
    group: Queryable;
    /**
    * Gets or sets a value that specifies whether the content type is unavailable
    * for creation or usage directly from a user interface.
    */
    hidden: Queryable;
    /**
     * Gets or sets the JSLink for the content type custom form template.
     * NOTE!
     * The JSLink property is not supported on Survey or Events lists.
     * A SharePoint calendar is an Events list.
     */
    jsLink: Queryable;
    /**
     * Gets a value that specifies the name of the content type.
     */
    name: Queryable;
    /**
     * Gets a value that specifies new form template name of the content type.
     */
    newFormTemplateName: Queryable;
    /**
    * Gets a value that specifies new form url of the content type.
    */
    newFormUrl: Queryable;
    /**
     * Gets or sets a value that specifies whether changes
     * to the content type properties are denied.
     */
    readOnly: Queryable;
    /**
     * Gets a value that specifies the XML Schema representing the content type.
     */
    schemaXml: Queryable;
    /**
     * Gets a value that specifies a server-relative path to the content type scope of the content type.
     */
    scope: Queryable;
    /**
     * Gets or sets whether the content type can be modified.
     */
    sealed: Queryable;
    /**
     * A string representation of the value of the Id.
     */
    stringId: Queryable;
}
