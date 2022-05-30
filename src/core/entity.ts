import {LanguageString} from "./language-string";

export class Entity {
  iri: string;
  name: LanguageString = {};
  description: LanguageString = {};

  constructor(iri: string) {
    this.iri = iri;
  }
}
