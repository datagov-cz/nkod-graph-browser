import {Dataset} from "../dataset/dataset";
import {OntologyAdapter} from "../ontology/ontology-adapter";
import {OntologyGraph} from "../ontology/ontology-graph";

export async function fetchGraph(dataset: Dataset, ontologyAdapters: OntologyAdapter[]): Promise<OntologyGraph> {
  const result = new OntologyGraph();

  for (const adapter of ontologyAdapters) {
    try {
      const graph = await adapter.getGraphForResources(dataset.relatedClasses);
      result.classes = {...result.classes, ...graph.classes};
      result.associations = {...result.associations, ...graph.associations};
    } catch (e) {
      console.error(e);
    }
  }

  return result;
}
