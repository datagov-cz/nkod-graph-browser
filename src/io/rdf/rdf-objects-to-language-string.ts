import {RdfObject} from "../../core/rdf";
import {LanguageString} from "../../core/language-string";

export function rdfObjectsToLanguageString(objects: RdfObject[]): LanguageString {
  return Object.fromEntries(objects.map((o) => [o.language, o.value]));
}
