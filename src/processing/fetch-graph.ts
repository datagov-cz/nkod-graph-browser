import {Dataset} from "../dataset/dataset";
import {OntologyAdapter} from "../ontology/ontology-adapter";
import {OntologyGraph} from "../ontology/ontology-graph";

export async function fetchGraph(dataset: Dataset, ontologyAdapters: OntologyAdapter[]): Promise<OntologyGraph> {
  const graph = new OntologyGraph();

  for (const relatedClass of dataset.relatedClasses) {
    for (const adapter of ontologyAdapters) {
      const cls = await adapter.getClass(relatedClass);
      if (cls) {
        const surrounding = await adapter.getClassAssociations(relatedClass);
        if (!surrounding) {
          console.error("Null returned for associations query for existing class");
          break;
        }
        graph.classes[relatedClass] = cls;
        for (const association of surrounding) {
          graph.associations[association.iri] = association;
        }
      }
    }
  }

  return graph;
}
