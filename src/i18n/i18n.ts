import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en/translation.json";
import es from "./locales/es/translation.json";

export type AppLanguage = "en" | "es";

/** Maps any BCP-47-ish value ("es-AR", "EN", "en_US") to a supported language. */
export const normalizeLanguage = (
  value: string | null | undefined
): AppLanguage | null => {
  if (!value) return null;
  const lower = value.toLowerCase();
  if (lower.startsWith("es")) return "es";
  if (lower.startsWith("en")) return "en";
  return null;
};

const getStoredLanguage = (): AppLanguage | null => {
  try {
    return normalizeLanguage(localStorage.getItem("lang"));
  } catch {
    return null;
  }
};

/** First visit: the first browser language we support, else English. */
const detectBrowserLanguage = (): AppLanguage => {
  if (typeof navigator === "undefined") return "en";
  const candidates = navigator.languages?.length
    ? navigator.languages
    : [navigator.language];
  for (const candidate of candidates) {
    const supported = normalizeLanguage(candidate);
    if (supported) return supported;
  }
  return "en";
};

void i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    es: { translation: es },
  },
  lng: getStoredLanguage() ?? detectBrowserLanguage(),
  fallbackLng: "en",
  supportedLngs: ["en", "es"],
  interpolation: { escapeValue: false },
  react: { useSuspense: false },
});

const applyLanguage = (lng: string) => {
  const safe = normalizeLanguage(lng) ?? "en";
  try {
    localStorage.setItem("lang", safe);
  } catch {
    /* ignore: storage may be unavailable */
  }
  document.documentElement.lang = safe;
};

applyLanguage(i18n.resolvedLanguage ?? "en");
i18n.on("languageChanged", applyLanguage);

export default i18n;
