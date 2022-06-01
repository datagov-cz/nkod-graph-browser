import {FC} from 'react';
import {Handle, Position} from 'react-flow-renderer';
import {Card} from "reactstrap";
import {OntologyClass} from "../ontology/ontology-class";
import {Attribute} from "./attribute";

export const ClassNode: FC<{data: OntologyClass}>= ({ data }) => {
  return (
    <Card style={{maxWidth: "8cm"}}>
      {/* Handles are needed for edges to work properly*/}
      <Handle type="target" position={Position.Top} style={{display: "none"}} />
      <Handle type="source" position={Position.Bottom} style={{display: "none"}} />

      <ul className="list-group list-group-flush">
        <li className="list-group-item text-center" title={data.description?.["cs"]}>
          <strong>{data.name?.["cs"]}</strong>
          <a
            href={data.iri}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="material-icons ps-2 align-bottom">open_in_new</i>
          </a>
        </li>
        {data.attributes.length > 0 &&
          <li className="list-group-item">
            {data.attributes.map(attribute =>
              <Attribute key={attribute.iri} value={attribute} />
            )}
          </li>
        }
      </ul>
    </Card>
  );
}
