import {Entity} from "../core/entity";

export class OntologyAssociation extends Entity {
  /**
   * OntologyClass IRIs as ends of the association
   */
  ends: [string, string];

  constructor(iri: string, ends: [string, string]) {
    super(iri);
    this.ends = ends;
  }
}
