import React, {useContext} from "react";
import {NavItem, NavLink,} from "reactstrap";
import {LanguageContext} from "../utils/language-context";

export default function LanguageSelector() {
  const [lang, setLang] = useContext(LanguageContext);

  const languages: Record<string, string> = {
    "cs": "Čeština",
    "en": "English",
  };
  const otherLanguage = Object.keys(languages).filter(key => key !== lang)[0];

  return (
    <NavItem>
      <NavLink onClick={() => setLang(otherLanguage)} href="#">
        {languages[otherLanguage]}
      </NavLink>
    </NavItem>
  );
}
