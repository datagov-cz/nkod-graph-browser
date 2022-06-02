import {FC} from "react";
import {Dataset} from "../dataset/dataset";

export const DatasetHeader: FC<{
  dataset: Dataset
}> = ({dataset}) => {
  return <>
    <h1>
      {dataset.name?.["cs"]}
      <a
        href={dataset.iri}
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="material-icons ps-2">open_in_new</i>
      </a>
    </h1>
    {/*<p className="h2">*/}
    {/*  <a href="#">{dataset.publisher?.name?.["cs"]}</a>*/}
    {/*</p>*/}
    <p>{dataset.description?.["cs"]}</p>
  </>;
}
