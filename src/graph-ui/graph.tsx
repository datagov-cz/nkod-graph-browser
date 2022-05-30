import {FC, useEffect, useMemo} from "react";
import ReactFlow, {
    addEdge,
    Background,
    useNodesState,
    useEdgesState,
    MarkerType,
    Connection,
    Edge, EdgeTypes, ConnectionLineComponent,
} from 'react-flow-renderer';

import FloatingEdge from './FloatingEdge.js';
import FloatingConnectionLine from './FloatingConnectionLine.js';
import {createNodesAndEdges} from './utils.js';
import {ClassNode} from "./class-node";

import "./marker-symbols";
import ReactDOM from "react-dom/client";
import {renderToString} from "react-dom/server";

const {nodes: initialNodes, edges: initialEdges} = createNodesAndEdges();

const edgeTypes = {
    floating: FloatingEdge,
} as EdgeTypes;

function getArker() {
  return <>
    <marker id="markerCircle" markerWidth="8" markerHeight="8" refX="5" refY="5">
      <circle cx="5" cy="5" r="3" style={{stroke: "none", fill: "#000000"}}/>
    </marker>
  </>;
}

export const Graph: FC = () => {
    const nodeTypes = useMemo(() => ({ classNode: ClassNode }), []);

    const [nodes, , onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onConnect = (params: Edge<any> | Connection) =>
      setEdges((eds) =>
        addEdge({ ...params, type: 'floating', markerEnd: { type: MarkerType.Arrow } }, eds)
      );

    useEffect(() => {
      for (const svg of document.getElementsByClassName("react-flow__background")) {
        if (svg.getElementsByClassName("custom__defs").length == 0) {
          const wrapper = document.createElementNS("http://www.w3.org/2000/svg", "defs");
          wrapper.classList.add("custom__defs");
          ReactDOM.createRoot(wrapper).render(<>
            <marker id="markerCircle" markerWidth="8" markerHeight="8" refX="5" refY="5">
              <circle cx="5" cy="5" r="3" style={{stroke: "none", fill: "#000000"}}/>
            </marker>
          </>);
          svg.append(wrapper);
        }
      };
    }, []);

    return (
      <div className="floatingedges" style={{flexGrow: 1}}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
            edgeTypes={edgeTypes}
            connectionLineComponent={FloatingConnectionLine as ConnectionLineComponent}
            nodeTypes={nodeTypes}
          >
          </ReactFlow>
      </div>
    );
}
