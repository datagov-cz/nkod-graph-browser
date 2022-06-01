import { useCallback } from 'react';
import {useStore, getBezierPath, EdgeText} from 'react-flow-renderer';
import {OntologyAssociation} from "../ontology/ontology-association";
import { getEdgeParams } from './utils.js';

function FloatingEdge({ id, source, target, markerEnd, markerStart, style, data }) {
    const sourceNode = useStore(useCallback((store) => store.nodeInternals.get(source), [source]));
    const targetNode = useStore(useCallback((store) => store.nodeInternals.get(target), [target]));

    if (!sourceNode || !targetNode) {
        return null;
    }

    const { sx, sy, tx, ty, sourcePos, targetPos } = getEdgeParams(sourceNode, targetNode);

    const d = `M${sx},${sy} ${tx},${ty}`;

    return (
        <g className="react-flow__connection">
            <path id={id} className="react-flow__edge-path" d={d} markerEnd={markerEnd} markerStart={markerStart} style={style} />
            {data &&
                <EdgeText
                    x={(2*sx+tx)/3}
                    y={(2*sy+ty)/3}
                    label={data?.map(association => association.name?.["cs"]).join(", ")}
                    labelStyle={{ fill: 'black' }}
                />
            }
        </g>
    );
}

export default FloatingEdge;
