import translationEn from "./locales/en.json";
import trasnslationES from "./locales/es.json";
import * as Localization from "expo-localization";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  "es-CO": { translation: trasnslationES },
  "en-US": { translation: translationEn },
};

const initI18n = async () => {
  let savedLanguage = "es-CO";

  if (!savedLanguage) {
    savedLanguage = Localization.getLocales()[0].languageCode as string;
  }

  i18n.use(initReactI18next).init({
    compatibilityJSON: "v3",
    resources,
    lng: savedLanguage,
    fallbackLng: "en-US",
    interpolation: {
      escapeValue: false,
    },
  });
};

initI18n();

export default i18n;
