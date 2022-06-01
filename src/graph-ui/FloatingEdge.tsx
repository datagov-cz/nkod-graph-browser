import {useCallback} from 'react';
import {EdgeText, useStore, Edge} from 'react-flow-renderer';
import {getEdgeParams} from './get-edge-params';
import {OntologyAssociation} from "../ontology/ontology-association";
import {useTranslate} from "../utils/use-translate";

function FloatingEdge({ id, source, target, markerEnd, markerStart, style, data }: Edge<OntologyAssociation[]>|Edge<void>) {
    const sourceNode = useStore(useCallback((store) => store.nodeInternals.get(source), [source]));
    const targetNode = useStore(useCallback((store) => store.nodeInternals.get(target), [target]));
    const tr = useTranslate();

    if (!sourceNode || !targetNode) {
        return null;
    }

    const {sx, sy, tx, ty} = getEdgeParams(sourceNode, targetNode);
    const d = `M${sx},${sy} ${tx},${ty}`;
    return (
        // @ts-ignore bad typing
        <g className="react-flow__connection">
            <path id={id} className="react-flow__edge-path" d={d} markerEnd={markerEnd as string} markerStart={markerStart as string} style={style} />
            {data &&
                <EdgeText
                    x={(2*sx+tx)/3}
                    y={(2*sy+ty)/3}
                    label={<>
                        {data?.map((association, index) => <tspan key={association.iri} x="0" dy={data.length === 1 ? undefined : (index ? "1.2em" : "-0.3em")}>{tr(association.name)}</tspan>)}
                    </>}
                />
            }
        </g>
    );
}

export default FloatingEdge;
