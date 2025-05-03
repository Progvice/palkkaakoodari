import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import en from "../lang/en";
import fi from "../lang/fi";


type PickableLanguages = "en" | "fi";

type LangContextType = {
  setLang: (lang: PickableLanguages) => void,
  t: (word: string, params?: (string|number)[]) => string
};

type Languages = {
  en: Record<string, string>
  fi: Record<string, string>
};

const LangContext = createContext<LangContextType|undefined>(undefined);;

const languages : Languages = {en: en, fi: fi};

export const LangProvider : React.FC<{children: ReactNode}> = ({children}) => {
  const [lang, setLang] = useState<PickableLanguages>((localStorage.getItem("lang") as PickableLanguages) || "fi");

  useEffect(() => {
    if (lang) localStorage.setItem("lang", lang);
  }, [lang])

  const t = useCallback((key: string, params: (string|number)[] = []) : string => {
    if (!languages || !lang) return `[${key}]`;
    if (!(key in languages[lang])) return `[${key}]`;

    let translation : string = languages[lang][key];
    if (params.length < 1) return translation;

    for (let count = 0; count < params.length; count++) {
      translation = translation.replace(`[$${(count + 1)}]`, String(params[count]));
    }

    return translation;
  }, [lang]);

  return (
    <LangContext.Provider value={{setLang, t}}>{children}</LangContext.Provider>
  )
}

export const useLang = () => {
  try {
    const ctx = useContext(LangContext);
    if (!ctx) throw new Error("Could not load LangContext");
    return ctx;
  }
  catch (err) {
    throw new Error("Could not load LangContext" + err);
  }
}

