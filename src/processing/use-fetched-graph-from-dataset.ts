import {Dataset} from "../dataset/dataset";
import {OntologyAdapter} from "../ontology/ontology-adapter";
import {useAsyncMemo} from "../utils/use-async-memo";

export const useFetchedGraphFromDataset =
  (dataset: Dataset|undefined, ontologyAdapter: OntologyAdapter) => {

  return useAsyncMemo(() => {
    if (dataset) {
      try {
        return ontologyAdapter.getGraphForResources(dataset.relatedClasses);
      } catch (e) {
        return Promise.resolve(undefined);
      }
    } else {
      return Promise.resolve(null);
    }
  }, [dataset, ontologyAdapter]);
}
