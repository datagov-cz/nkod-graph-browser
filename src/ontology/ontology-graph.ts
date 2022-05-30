import {OntologyClass} from "./ontology-class";
import {OntologyAssociation} from "./ontology-association";

export class OntologyGraph {
  classes: Record<string, OntologyClass> = {};
  associations: Record<string, OntologyAssociation> = {};
}
