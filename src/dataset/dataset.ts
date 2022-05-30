import {Publisher} from "./publisher";
import {Entity} from "../core/entity";

export class Dataset extends Entity {
  publisher: Publisher|null = null;
  /**
   * IRIs of classes that are contained in the dataset and its subset will be
   * shown in the graph
   */
  relatedClasses: string[] = [];
}
