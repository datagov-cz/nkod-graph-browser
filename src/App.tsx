import React from 'react';
import { Application } from './components/application';
import {useLocalStorage} from "./utils/use-local-storage";
import {LanguageContext} from "./utils/language-context";
function App() {
  const language = useLocalStorage("language", "cs");
  return (
    <LanguageContext.Provider value={language}>
      <Application />
    </LanguageContext.Provider>
  );
}

export default App;
