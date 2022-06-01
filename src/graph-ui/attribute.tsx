import {FC} from "react";
import {OntologyAttribute} from "../ontology/ontology-attribute";
import {useTranslate} from "../utils/use-translate";

export const Attribute: FC<{
  value: OntologyAttribute
}> = ({value}) => {
  const tr = useTranslate();

  return <div>
    <span title={tr(value.description)}>{tr(value.name)}</span>
  </div>
}
