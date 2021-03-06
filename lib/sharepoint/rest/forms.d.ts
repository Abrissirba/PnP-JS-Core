import { Queryable, QueryableCollection, QueryableInstance } from "./queryable";
/**
 * Describes a collection of Field objects
 *
 */
export declare class Forms extends QueryableCollection {
    /**
     * Creates a new instance of the Fields class
     *
     * @param baseUrl The url or Queryable which forms the parent of this fields collection
     */
    constructor(baseUrl: string | Queryable, path?: string);
    /**
     * Gets a form by id
     *
     * @param id The guid id of the item to retrieve
     */
    getById(id: string): Form;
}
/**
 * Describes a single of Form instance
 *
 */
export declare class Form extends QueryableInstance {
    /**
     * Creates a new instance of the Form class
     *
     * @param baseUrl The url or Queryable which is the parent of this form instance
     */
    constructor(baseUrl: string | Queryable, path?: string);
}
