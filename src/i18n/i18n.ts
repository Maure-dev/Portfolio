import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en/translation.json";
import es from "./locales/es/translation.json";

const getStoredLanguage = (): string | null => {
  try {
    return localStorage.getItem("lang");
  } catch {
    return null;
  }
};

void i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    es: { translation: es },
  },
  lng: getStoredLanguage() ?? "en",
  fallbackLng: "en",
  supportedLngs: ["en", "es"],
  interpolation: { escapeValue: false },
  react: { useSuspense: false },
});

const applyLanguage = (lng: string) => {
  try {
    localStorage.setItem("lang", lng);
  } catch {
    /* ignore: storage may be unavailable */
  }
  document.documentElement.lang = lng;
};

applyLanguage(i18n.resolvedLanguage ?? "en");
i18n.on("languageChanged", applyLanguage);

export default i18n;
