import {Edge, Node} from "react-flow-renderer";
import {OntologyClass} from "../ontology/ontology-class";
import {OntologyAssociation} from "../ontology/ontology-association";
import {adaptor} from "webcola";

interface NodesEdges {
  nodes: Node<OntologyClass>[];
  edges: (Edge<OntologyAssociation[]>|Edge<void>)[];
}

const BFS_SHIFT_MULTIPLIER = 500;
function BFS({nodes, edges}: NodesEdges) {
  let shiftCounter = 0;
  let processQueue = [] as Node<OntologyClass>[];
  let nextProcessQueue = [] as Node<OntologyClass>[];
  const visited = new Set<Node<OntologyClass>>();
  while (true) {
    // Find not processed node
    const node = nodes.find(n => !visited.has(n));
    if (!node) {
      break;
    }

    // Add node to queue
    processQueue.push(node);
    let yShiftCounter = 0;
    while (true) {
      const nodeToProcess = processQueue.shift();
      if (!nodeToProcess) {
        break;
      }
      if (visited.has(nodeToProcess)) {
        continue;
      }

      visited.add(nodeToProcess);
      const otherNodes = [
        ...edges.filter(e => e.source === nodeToProcess.id).map(e => e.target).map(id => nodes.find(n => n.id === id)),
        ...edges.filter(e => e.target === nodeToProcess.id).map(e => e.source).map(id => nodes.find(n => n.id === id)),
      ].filter(n => n) as Node<OntologyClass>[];
      nextProcessQueue.push(...otherNodes);

      nodeToProcess.position.x = shiftCounter * BFS_SHIFT_MULTIPLIER;
      nodeToProcess.position.y = yShiftCounter * BFS_SHIFT_MULTIPLIER;
      yShiftCounter++;
    }
    processQueue = nextProcessQueue;
    nextProcessQueue = [];
    shiftCounter++;
  }
}

export function layout({nodes, edges}: NodesEdges): NodesEdges {
  BFS({nodes, edges});

  const colaNodes = nodes.map((node, index) => ({ref: node, ...node.position, index}));
  const colaNodesDictionary = Object.fromEntries(colaNodes.map(n => [n.ref.id, n]));
  const links = edges.map((edge, i) => ({
    source: colaNodesDictionary[edge.source],
    target: colaNodesDictionary[edge.target],
    length: edge.id.startsWith("extends ") ? 220 : 500,
    weight: edge.id.startsWith("extends ") ? 1 : .1,
  })).filter(edge => edge.source && edge.target);
  const a = adaptor({}).nodes(colaNodes).links(links);
  // @ts-ignore
  a.linkDistance(d => d.length);
  a.start(
    100,
    0,
    0,
    0,
    false,
    true,
  );

  colaNodes.forEach(colaNode => {
    colaNode.ref.position.x = colaNode.x;
    colaNode.ref.position.y = colaNode.y;
  });

  return {nodes, edges};
}
