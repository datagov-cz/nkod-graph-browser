import {FC} from "react";
import {OntologyAttribute} from "../ontology/ontology-attribute";
import {useTranslate} from "../utils/use-translate";
import {useShowItOntologyLink} from "../utils/use-show-it-ontology-link";

export const Attribute: FC<{
  value: OntologyAttribute
}> = ({value}) => {
  const tr = useTranslate();
  const link = useShowItOntologyLink();

  return <div className="d-flex justify-content-between attribute-row">
    <div>
      <div title={tr(value.description)} className="attribute-text">{tr(value.name)}</div>
    </div>
    <div className="attribute-link">
      <a
        href={link(value.iri)}
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="material-icons ps-2 align-bottom">open_in_new</i>
      </a>
    </div>
  </div>
}
