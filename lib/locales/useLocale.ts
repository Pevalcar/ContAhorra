import englih from "./english.json";
import spanish from "./spanish.json";
import { type localization } from "@/Types/types";
import { getLocales } from "expo-localization";
import { I18n } from "i18n-js";
import React from "react";

const translationss = {
  es: spanish,
  en: englih,
};

export const useLocale = () => {
  const [locale, setLocale] = React.useState(new I18n(translationss));
  const translations = new I18n(translationss);

  React.useEffect(() => {
    translations.locale = getLocales()[0].languageCode ?? "es";
    setLocale(translations);
  }, []);

  const changeLocale = (newLocale: localization) => {
    translations.locale = newLocale;
    setLocale(translations);
  };

  return {
    changeLocale,
    translations: locale,
  };
};
