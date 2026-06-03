// Localized CV files, served from public/ at the site root.
const CV_URLS: Record<string, string> = {
  en: "/Mauro-Gerardi-CV-EN.pdf",
  es: "/Mauro-Gerardi-CV-ES.pdf",
};

/** Returns the CV download URL for the active language (falls back to English). */
export const getCvUrl = (language?: string): string =>
  CV_URLS[language ?? "en"] ?? CV_URLS.en;

// Production origin (also referenced in index.html, sitemap.xml and robots.txt).
export const SITE_URL = "https://maure-dev.vercel.app";
