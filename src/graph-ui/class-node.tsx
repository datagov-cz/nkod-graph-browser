import {FC, useCallback} from 'react';
import { Handle, Position } from 'react-flow-renderer';
import {Card, CardBody, CardTitle} from "reactstrap";

const handleStyle = { left: 10 };

interface ClassNodeData {
  name: string;
  attributes: string[];
}

export const ClassNode: FC<{data: ClassNodeData}>= ({ data }) => {
  const onChange = useCallback((evt: any) => {
    console.log(evt.target.value);
  }, []);

  return (
    <Card>
      <Handle type="target" position={Position.Top} style={{display: "none"}} />
      <Handle type="source" position={Position.Bottom} style={{display: "none"}} />
      <CardBody>
        <CardTitle tag="h5" className="text-center">
          Special Title Treatment <a href="sezna.cz">sdf</a>
        </CardTitle>
      </CardBody>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          First attribute
          <br/>
          Second
          <br/>
          Third
        </li>
      </ul>
    </Card>
  );
}
