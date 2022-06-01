import {FC, useEffect, useMemo} from "react";
import ReactFlow, {ConnectionLineComponent, EdgeTypes, useEdgesState, useNodesState} from 'react-flow-renderer';
import FloatingEdge from './FloatingEdge.js';
import FloatingConnectionLine from './FloatingConnectionLine.js';
import {ClassNode} from "./class-node";
import "./marker-symbols";
import ReactDOM from "react-dom/client";
import {OntologyGraph} from "../ontology/ontology-graph";
import {reactFlowAdapter} from "../processing/react-flow-adapter";

const edgeTypes = {
    floating: FloatingEdge,
} as EdgeTypes;

export const Graph: FC<{
  graph: OntologyGraph
}> = ({graph}) => {
    const nodeTypes = useMemo(() => ({ classNode: ClassNode }), []);

    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    
    useEffect(() => {
      const {nodes, edges} = reactFlowAdapter(graph);
      setNodes(nodes);
      setEdges(edges);
    }, [graph, setEdges, setNodes]);

    useEffect(() => {
      for (const svg of document.getElementsByClassName("react-flow__edges")) {
        if (svg.getElementsByClassName("custom__defs").length === 0) {
          const wrapper = document.createElementNS("http://www.w3.org/2000/svg", "defs");
          wrapper.classList.add("custom__defs");
          ReactDOM.createRoot(wrapper).render(<>
            <marker id="extendsArrow" markerWidth="40" markerHeight="40" refX="35" refY="20" orient="auto">
              <polyline points="5,5 35,20 5,35 5,5"/>
            </marker>
            <marker id="associationArrow" markerWidth="40" markerHeight="40" refX="35" refY="20" orient="auto">
              <polyline points="5,5 35,20 5,35"/>
            </marker>
          </>);
          svg.append(wrapper);
        }
      }
    }, [nodes, edges]);

    return (
      <div style={{flexGrow: 1}}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            fitView
            edgeTypes={edgeTypes}
            connectionLineComponent={FloatingConnectionLine as ConnectionLineComponent}
            nodeTypes={nodeTypes}
          >
          </ReactFlow>
      </div>
    );
}
