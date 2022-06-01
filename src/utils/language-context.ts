import {createContext} from "react";

export const LanguageContext = createContext<[string, (value: string) => void]>(null as any);
