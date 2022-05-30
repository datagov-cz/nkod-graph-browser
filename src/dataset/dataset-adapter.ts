import {Dataset} from "./dataset";

export interface DatasetAdapter {
  getDataset(iri: string): Promise<Dataset | null>;
}
