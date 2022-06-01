import {FC} from "react";
import {OntologyAttribute} from "../ontology/ontology-attribute";

export const Attribute: FC<{
  value: OntologyAttribute
}> = ({value}) => {
  return <div>
    <span title={value.description?.["cs"]}>{value.name?.["cs"]}</span>
  </div>
}
