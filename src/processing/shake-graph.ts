import {OntologyGraph} from "../ontology/ontology-graph";

/**
 * Removes broken associations
 * @param graph
 */
export function shakeGraph(graph: OntologyGraph): OntologyGraph {
  return {
    classes: graph.classes,
    associations: Object.fromEntries(
      Object.entries(graph.associations).filter(entry => entry[1].ends.every(end => !!graph.classes[end]))
    )
  }
}
