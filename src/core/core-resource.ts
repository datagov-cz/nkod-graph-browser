/**
 * Allow for single value in each language. It is not possible to have
 * multiple values for a single language.
 */
export type LanguageString = Record<string, string>;

/**
 * Core object that support type control.
 */
export class CoreTyped {
  /**
   * Types used by core model. Single resource can be of multiple
   * application types like PimClass, PimAttribute, etc..
   */
  types: string[] = [];

  protected constructor() {}
}

/**
 * Define the a core resource for the model, this interface shall be
 * used as a base class for every other core entity/object.
 */
export class CoreResource extends CoreTyped {
  /**
   * In order to allow identification of all resources they must all use
   * named nodes. Blank nodes are not allowed. This property can
   * be set to null for new objects.
   */
  iri: string | null;

  protected constructor(iri: string | null) {
    super();
    this.iri = iri;
  }
}
