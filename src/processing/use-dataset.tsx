import {useAsyncMemo} from "../utils/use-async-memo";
import {DatasetAdapter} from "../dataset/dataset-adapter";

export function useDataset(datasetIri: string | null, adapter: DatasetAdapter) {
  return useAsyncMemo(async () => {
    if (datasetIri) {
      return await adapter.getDataset(datasetIri);
    } else {
      return null;
    }
  }, []);
}
