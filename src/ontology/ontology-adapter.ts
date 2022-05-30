import {OntologyClass} from "./ontology-class";
import {OntologyAssociation} from "./ontology-association";

export interface OntologyAdapter {
  getClass(iri: string): Promise<OntologyClass | null>;
  getClassAssociations(iri: string): Promise<OntologyAssociation[] | null>;
}
