export const DatasetQuery = `
PREFIX dcat: <http://www.w3.org/ns/dcat#>
PREFIX dcterms: <http://purl.org/dc/terms/>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>

CONSTRUCT WHERE {
  %DATASET% a dcat:Dataset ;
    dcterms:title ?title ;
    dcterms:description ?description ;
    dcat:theme ?theme .
}
`;

// <https://data.gov.cz/zdroj/datové-sady/00007064/9c73b802263c5e0ccf5542f10fbc35bb>

/*
 ;
 dcterms:publisher ?publisher .

 ?publisher foaf:name ?name
 */
