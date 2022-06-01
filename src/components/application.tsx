import {FC} from "react";
import {Container, Navbar, NavbarBrand,} from "reactstrap";
import {DatasetHeader} from "./dataset-header";
import "../index.css";
import {Graph} from "../graph-ui/graph";
import {SetIri} from "./set-iri";
import {NkodDatasetAdapter} from "../nkod/nkod-dataset-adapter";
import {httpFetch} from "../io/fetch/fetch-browser";
import {useDataset} from "../processing/use-dataset";
import {SgovOntologyAdapter} from "../nkod/sgov-ontology-adapter";
import {useFetchedGraphFromDataset} from "../processing/use-fetched-graph-from-dataset";

// Process URL parameters
const urlParams = new URLSearchParams(window.location.search);
const datasetIri = urlParams.get("iri");

// Setup adapters
const nkodAdapter = new NkodDatasetAdapter("https://dev.nkod.opendata.cz/sparql", httpFetch);
const sgovAdapter = new SgovOntologyAdapter("https://xn--slovnk-7va.gov.cz/sparql", httpFetch);

export const Application: FC = () => {
  const [dataset, datasetLoading] = useDataset(datasetIri, nkodAdapter);
  const [graph, graphLoading] = useFetchedGraphFromDataset(dataset ?? undefined, sgovAdapter);

  if (graph) console.log(graph);

  return <>
    <div>
      <Navbar light expand="md" container="lg">
        <NavbarBrand href="/">
          <img
            width="174" height="30"
            alt={"sdf"}
            className="d-inline-block align-top"
            src="https://dev.nkod.opendata.cz/assets/images/opendata-logo.png"
          />
        </NavbarBrand>
      </Navbar>
      <Container>
        {!dataset ?
          <SetIri /> :
          <>
            <DatasetHeader dataset={dataset} />
            <hr/>
          </>
        }
      </Container>
    </div>
    {graph && <Graph graph={graph} />}
  </>;
}
