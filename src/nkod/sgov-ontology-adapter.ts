import {OntologyAdapter} from "../ontology/ontology-adapter";
import {HttpFetch} from "../io/fetch/fetch-api";
import {OntologyQuery} from "./ontology-query";
import {SparqlQueryRdfSource} from "../io/rdf/sparql/sparql-query-rdf-source";
import {OntologyClass} from "../ontology/ontology-class";
import {OntologyGraph} from "../ontology/ontology-graph";
import {RdfSourceWrap} from "../core/rdf";
import {RDF, RDFS} from "../utils/vocabularies";
import {rdfDataToEntity} from "../utils/rdf-data-to-entity";
import {OntologyAttribute} from "../ontology/ontology-attribute";
import {OntologyAssociation} from "../ontology/ontology-association";

const Z = {
  typObjektu: "https://slovník.gov.cz/základní/pojem/typ-objektu",
  typVlastnosti: "https://slovník.gov.cz/základní/pojem/typ-vlastnosti",
  typVztahu: "https://slovník.gov.cz/základní/pojem/typ-vztahu",
};

/**
 * Adapter for slovník.gov.cz sparql endpoint based on UFO-A ontology.
 */
export class SgovOntologyAdapter implements OntologyAdapter {
  private readonly sparqlEndpoint: string;
  private readonly httpFetch: HttpFetch;

  constructor(sparqlEndpoint: string, httpFetch: HttpFetch) {
    this.sparqlEndpoint = sparqlEndpoint;
    this.httpFetch = httpFetch;
  }

  async getGraphForResources(iris: string[]): Promise<OntologyGraph> {
    const graph = new OntologyGraph();

    const query = OntologyQuery.replace(/%IRIs%/g, `(${iris.map(i => `<${i}>`).join(",")})`);
    const source = new SparqlQueryRdfSource(
      this.httpFetch,
      this.sparqlEndpoint,
      query
    );
    await source.query();

    // Classes and attributes
    const rdfClasses = await source.reverseProperty(RDF.type, Z.typObjektu);
    for (const rdfClass of rdfClasses) {
      // classes
      const cls = new OntologyClass(rdfClass.value);
      const rdfWrap = RdfSourceWrap.forIri(rdfClass.value, source);
      await rdfDataToEntity(rdfWrap, cls);
      cls.extends = (await rdfWrap.property(RDFS.subClassOf)).map(o => o.value);
      graph.classes[cls.iri] = cls;

      // attributes
      const rdfAttributes = await rdfWrap.reverseProperty(RDFS.domain);
      for (const rdfAttribute of rdfAttributes) {
        const rdfWrap = RdfSourceWrap.forIri(rdfAttribute.value, source);
        if ((await rdfWrap.property(RDF.type)).every(o => o.value !== Z.typVlastnosti)) {
          continue;
        }

        const attribute = new OntologyAttribute(rdfAttribute.value);
        await rdfDataToEntity(rdfWrap, attribute);
        cls.attributes.push(attribute);
      }
    }

    // Associations
    const rdfAssociations = await source.reverseProperty(RDF.type, Z.typVztahu);
    for (const rdfAssociation of rdfAssociations) {
      const rdfWrap = RdfSourceWrap.forIri(rdfAssociation.value, source);
      const association = new OntologyAssociation(
        rdfAssociation.value,
        [
          (await rdfWrap.property(RDFS.domain))[0].value,
          (await rdfWrap.property(RDFS.range))[0].value,
        ]
      );
      await rdfDataToEntity(rdfWrap, association);

      graph.associations[association.iri] = association;
    }

    return graph;
  }
}
