import {OntologyGraph} from "../ontology/ontology-graph";
import {Edge, Node} from 'react-flow-renderer';
import {OntologyClass} from "../ontology/ontology-class";
import {OntologyAssociation} from "../ontology/ontology-association";

/**
 * Converts {@link OntologyGraph} to representation for React Flow
 * @param ontologyGraph
 */
export function reactFlowAdapter(ontologyGraph: OntologyGraph): {
  nodes: Node<OntologyClass>[],
  edges: (Edge<OntologyAssociation[]>|Edge<void>)[]
} {
  const classes = Object.values(ontologyGraph.classes);

  const nodes = classes.map((cls, i) => ({
    id: cls.iri,
    position: {
      x: 100*classes.length*Math.sin(i/classes.length * 2 * Math.PI),
      y: 100*classes.length*Math.cos(i/classes.length * 2 * Math.PI),
    },
    data: cls,
    type: "classNode",
  } as Node<OntologyClass>));

  const ext = Object.values(ontologyGraph.classes).flatMap(child => child.extends.map(parentIri => ({
    id: `extends ${child.iri} ${parentIri}`,
    source: child.iri,
    target: parentIri,
    type: 'floating',
    markerEnd: "extendsArrow",
  } as Edge<void>)));

  const associations: Record<string, Edge<OntologyAssociation[]>> = {};

  for (const association of Object.values(ontologyGraph.associations)) {
    const id = `association ${association.ends[0]} ${association.ends[1]}`;
    let edge:Edge<OntologyAssociation[]>|undefined = associations[id];
    if (!edge) {
      edge = {
        id,
        source: association.ends[0],
        target: association.ends[1],
        type: 'floating',
        markerEnd: "associationArrow",
        data: []
      };
      associations[id] = edge;
    }

    edge.data?.push(association)
  }

  return {
    nodes,
    edges: [...ext, ...Object.values(associations)],
  }
}
