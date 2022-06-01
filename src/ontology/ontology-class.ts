import {Entity} from "../core/entity";
import {OntologyAttribute} from "./ontology-attribute";

export class OntologyClass extends Entity {
  attributes: OntologyAttribute[] = [];
  extends: string[] = [];
}
