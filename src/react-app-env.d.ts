/// <reference types="react-scripts" />
declare namespace NodeJS {
  interface ProcessEnv {
    /**
     * SPARQL endpoint URL to obtain the dataset info
     */
    REACT_APP_DATASETS_SPARQL_URL: string;
    /**
     * URL to SGOV ShowIt browser
     */
    REACT_APP_SHOW_IT_URL: string;
    /**
     * SPARQL endpoint URL to obtain information about SGOV entities
     */
    REACT_APP_SGOV_SPARQL_URL: string;
  }
}
