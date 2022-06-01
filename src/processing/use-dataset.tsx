import {useAsyncMemo} from "../utils/use-async-memo";
import {DatasetAdapter} from "../dataset/dataset-adapter";

export function useDataset(datasetIri: string | null, adapter: DatasetAdapter) {
  return useAsyncMemo(async () => {
    if (datasetIri) {
      try {
        return await adapter.getDataset(datasetIri);
      } catch (e) {
        console.error(e);
        return undefined;
      }
    } else {
      return null;
    }
  }, []);
}
