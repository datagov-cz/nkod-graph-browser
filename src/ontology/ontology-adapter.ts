import {OntologyGraph} from "./ontology-graph";

export interface OntologyAdapter {
  /**
   * Returns a known graph for given IRIs.
   * @param iris array of IRIs of classes, attributes, and associations
   */
  getGraphForResources(iris: string[]): Promise<OntologyGraph>;
}
