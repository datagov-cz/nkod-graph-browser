import {Entity} from "../core/entity";
import {OntologyAttribute} from "./ontology-attribute";

export interface OntologyClass extends Entity {
  attributes: OntologyAttribute[];
}
