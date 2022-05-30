import {Entity} from "../core/entity";

export interface OntologyAssociation extends Entity {
  /**
   * OntologyClass IRIs as ends of the association
   */
  ends: [string, string];
}
