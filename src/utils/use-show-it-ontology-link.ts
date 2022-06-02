import {useCallback} from "react";

/**
 * React hook that exposes function to create links for IRIs in the ontology,
 * for example to specific exploration tool.
 */
export function useShowItOntologyLink() {
  return useCallback((iri: string) => {
    console.log(process.env);
    const url = new URL(process.env.REACT_APP_SHOW_IT_URL);
    url.searchParams.set("iri", iri);
    return url.href;
  }, []);
}
