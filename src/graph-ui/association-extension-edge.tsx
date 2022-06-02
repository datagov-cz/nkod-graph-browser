import {useCallback} from 'react';
import {Edge, useStore} from 'react-flow-renderer';
import {getEdgeParams} from './get-edge-params';
import {OntologyAssociation} from "../ontology/ontology-association";
import {useTranslate} from "../utils/use-translate";
import {useShowItOntologyLink} from "../utils/use-show-it-ontology-link";

function AssociationExtensionEdge({ id, source, target, markerEnd, markerStart, style, data }: Edge<OntologyAssociation[]>|Edge<void>) {
    const sourceNode = useStore(useCallback((store) => store.nodeInternals.get(source), [source]));
    const targetNode = useStore(useCallback((store) => store.nodeInternals.get(target), [target]));
    const tr = useTranslate();
    const link = useShowItOntologyLink();

    if (!sourceNode || !targetNode) {
        return null;
    }

    const {sx, sy, tx, ty} = getEdgeParams(sourceNode, targetNode);
    const d = `M${sx},${sy} ${tx},${ty}`;
    return (
        // @ts-ignore bad typing
        <g className="react-flow__connection">
            <path id={id} className="react-flow__edge-path" d={d} markerEnd={markerEnd as string} markerStart={markerStart as string} style={style} />
            {!!data &&
                <foreignObject
                  width={300}
                  height={500}
                  x={(1.5*sx+tx)/2.5-150}
                  y={(1.5*sy+ty)/2.5-(37/2)*data.length} // vertical shift
                  requiredExtensions="http://www.w3.org/1999/xhtml"
                  style={{textAlign: "center"}}
                >
                    <div className="edge-node" style={{display: "inline-block", pointerEvents: "all"}}>
                        {data?.map(association => <div
                          key={association.iri}
                          className="association-row"
                          title={tr(association.description)}
                        >
                            {tr(association.name)}
                            <a
                              href={link(association.iri)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="association-link"
                            >
                                <i className="material-icons ps-2 align-bottom">open_in_new</i>
                            </a>
                        </div>)}
                    </div>
                </foreignObject>
            }
        </g>
    );
}

export default AssociationExtensionEdge;
