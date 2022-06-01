import {FC, useCallback} from 'react';
import { Handle, Position } from 'react-flow-renderer';
import {Card, CardBody, CardTitle} from "reactstrap";
import {OntologyClass} from "../ontology/ontology-class";

export const ClassNode: FC<{data: OntologyClass}>= ({ data }) => {
  return (
    <Card>
      {/* Handles are needed for edges to work properly*/}
      <Handle type="target" position={Position.Top} style={{display: "none"}} />
      <Handle type="source" position={Position.Bottom} style={{display: "none"}} />

      <ul className="list-group list-group-flush">
        <li className="list-group-item text-center">
          <strong>{data.name?.["cs"]}</strong>
          <a
            href={data.iri}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="material-icons ps-2 align-bottom">open_in_new</i>
          </a>
        </li>
        <li className="list-group-item">
          {data.attributes?.map(attribute => <div key={attribute.iri}>{attribute.name?.["cs"]}</div>)}
        </li>
      </ul>
    </Card>
  );
}
