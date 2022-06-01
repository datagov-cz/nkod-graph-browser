export const OntologyQuery = `DEFINE sql:signal-void-variables 0
PREFIX z: <https://slovník.gov.cz/základní/pojem/>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX dcterms: <http://purl.org/dc/terms/>

CONSTRUCT {
  ?node a ?type ;
    dcterms:title ?label ;
    dcterms:description ?definition ;
    rdfs:subClassOf ?ancestor ;
    rdfs:domain ?domain ;
    rdfs:range ?range .
} WHERE {

# Classes
{
  ?node a z:typ-objektu .

  OPTIONAL {?node rdfs:subClassOf ?ancestor. ?ancestor a z:typ-objektu }

  ?entity rdfs:subClassOf* ?node.
  BIND(z:typ-objektu as ?type)
} UNION

# Attributes
{
  ?node a z:typ-vlastnosti .

  {
    ?node rdfs:subClassOf [
      owl:allValuesFrom ?domain ;
      owl:onProperty z:je-vlastností
    ] .
  } UNION {
    ?domain rdfs:subClassOf [
      owl:allValuesFrom  ?node ;
      owl:onProperty z:má-vlastnost
    ] .
  }

  BIND(z:typ-vlastnosti as ?type)
  BIND(?node as ?entity)
} UNION

# Associations
{
  ?node a z:typ-vztahu .

  {
    ?node rdfs:subClassOf [
      owl:allValuesFrom ?domain ;
      owl:onProperty z:má-vztažený-prvek-1
    ]
  }

  {
    ?node rdfs:subClassOf [
      owl:allValuesFrom ?range ;
      owl:onProperty z:má-vztažený-prvek-2
    ]
  }

  BIND(z:typ-vztahu as ?type)
  BIND(?node as ?entity)
}

  OPTIONAL {?node skos:prefLabel ?label}
  OPTIONAL {?node skos:definition ?definition}
  OPTIONAL {?node skos:scopeNote ?definition}

  FILTER (?entity IN %IRIs%)
}
`;
