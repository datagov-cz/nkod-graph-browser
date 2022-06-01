import {RdfSourceWrap} from "../core/rdf";
import {Entity} from "../core/entity";
import {rdfObjectsToLanguageString} from "../io/rdf/rdf-objects-to-language-string";
import {DCTERMS} from "./vocabularies";

export const rdfDataToEntity = async (wrap: RdfSourceWrap, entity: Entity) => {
  entity.name = rdfObjectsToLanguageString(await wrap.property(DCTERMS.title));
  entity.description = rdfObjectsToLanguageString(await wrap.property(DCTERMS.description));
}
