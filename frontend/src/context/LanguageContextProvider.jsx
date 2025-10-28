import React, { useState } from "react";
import en from "../locales/en.json";
import hi from "../locales/hi.json";
import { LanguageContext } from "./LanguageContext.js";

const translations = { en, hi };

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState("en");
  const t = (key) => translations[lang][key] || key;

  return (
    <LanguageContext.Provider value={{ t, lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
};
