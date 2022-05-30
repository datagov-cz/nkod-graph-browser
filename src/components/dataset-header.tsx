import {FC} from "react";
import {Dataset} from "../dataset/dataset";

export const DatasetHeader: FC<{
  dataset: Dataset
}> = ({dataset}) => {
  return <>
    <h1>
      {dataset.name?.["cs"]}
    </h1>
    {/*<p className="h2">*/}
    {/*  <a href="#">{dataset.publisher?.name?.["cs"]}</a>*/}
    {/*</p>*/}
    <p>{dataset.description?.["cs"]}</p>
  </>;
}
