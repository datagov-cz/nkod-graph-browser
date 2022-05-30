import {DatasetAdapter} from "../dataset/dataset-adapter";
import {Dataset} from "../dataset/dataset";
import {HttpFetch} from "../io/fetch/fetch-api";
import {SparqlQueryRdfSource} from "../io/rdf/sparql/sparql-query-rdf-source";
import {DatasetQuery} from "./dataset-query";
import {RdfSourceWrap} from "../core/rdf";
import {rdfObjectsToLanguageString} from "../io/rdf/rdf-objects-to-language-string";
import {Publisher} from "../dataset/publisher";

const DCAT = {
  Dataset: "http://www.w3.org/ns/dcat#Dataset",
  theme: "http://www.w3.org/ns/dcat#theme",
}

const DCTERMS = {
  title: "http://purl.org/dc/terms/title",
  description: "http://purl.org/dc/terms/description",
  publisher: "http://purl.org/dc/terms/publisher",
}

const FOAF = {
  name: "http://xmlns.com/foaf/0.1/name",
}

const RDF = {
  type: "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
};

export class NkodDatasetAdapter implements DatasetAdapter {
  private sparqlEndpoint: string;
  private httpFetch: HttpFetch;

  constructor(sparqlEndpoint: string, httpFetch: HttpFetch) {
    this.sparqlEndpoint = sparqlEndpoint;
    this.httpFetch = httpFetch;
  }

  async getDataset(iri: string): Promise<Dataset | null> {
    const source = new SparqlQueryRdfSource(
      this.httpFetch,
      this.sparqlEndpoint,
      DatasetQuery.replace(/%DATASET%/g, `<${iri}>`)
    );

    await source.query();

    console.log("source", source);

    const rdfDataset = RdfSourceWrap.forIri(iri, source);

    if ((await rdfDataset.property(RDF.type)).length === 0) {
      return null;
    }

    const dataset = new Dataset(iri);
    dataset.name = rdfObjectsToLanguageString(await rdfDataset.property(DCTERMS.title));
    dataset.description = rdfObjectsToLanguageString(await rdfDataset.property(DCTERMS.description));

    const publishers = await rdfDataset.property(DCTERMS.publisher);
    if (publishers.length) {
      const publisherIri = publishers[0].value;
      const rdfPublisher = RdfSourceWrap.forIri(publisherIri, source);

      const publisher = new Publisher(publisherIri);
      publisher.name = rdfObjectsToLanguageString(await rdfPublisher.property(FOAF.name));
      dataset.publisher = publisher;
    }

    const themes = await rdfDataset.property(DCAT.theme);
    dataset.relatedClasses = themes.map(theme => theme.value);

    return dataset;
  }
}
