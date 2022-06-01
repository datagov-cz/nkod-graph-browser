import {FC} from "react";
import {useTranslate} from "../utils/use-translate";

export const SetIri: FC = () => {
  const tr = useTranslate();

  return <form>
    <h1>{tr({
      en: "NKOD graph browser",
      cs: "NKOD grafový prohlížeč",
    })}</h1>
    <p>{tr({
      en: "Insert dataset IRI to show its graph.",
      cs: "Zadejte IRI datasetu, který chcete zobrazit.",
    })}</p>
    <hr/>
    <div style={{margin: "0 auto", maxWidth: "10cm"}}>
      <div className="mb-3">
        <input type="text" name="iri" className="form-control"/>
      </div>
      <button type="submit" className="btn btn-primary">{tr({
        en: "Show graph",
        cs: "Zobrazit graf",
      })}</button>
    </div>
  </form>
};
