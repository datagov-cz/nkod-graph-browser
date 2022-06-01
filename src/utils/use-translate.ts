import {useCallback, useContext} from "react";
import {LanguageContext} from "./language-context";
import {LanguageString} from "../core/language-string";

export function useTranslate() {
  const [language] = useContext(LanguageContext);
  return useCallback((languageString: LanguageString) => {
    if (Object.hasOwn(languageString, language)) {
      return languageString[language];
    }
    return Object.values(languageString)[0];
  }, [language]);
}
