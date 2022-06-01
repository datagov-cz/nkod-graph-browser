import {DatasetAdapter} from "../dataset/dataset-adapter";
import {Dataset} from "../dataset/dataset";
import {HttpFetch} from "../io/fetch/fetch-api";
import {SparqlQueryRdfSource} from "../io/rdf/sparql/sparql-query-rdf-source";
import {DatasetQuery} from "./dataset-query";
import {RdfSourceWrap} from "../core/rdf";
import {rdfObjectsToLanguageString} from "../io/rdf/rdf-objects-to-language-string";
import {Publisher} from "../dataset/publisher";
import {DCAT, DCTERMS, FOAF, RDF} from "../utils/vocabularies";

export class NkodDatasetAdapter implements DatasetAdapter {
  private readonly sparqlEndpoint: string;
  private readonly httpFetch: HttpFetch;

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
