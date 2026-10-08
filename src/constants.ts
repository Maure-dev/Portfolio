import type { NavItemType, ThemeType } from "./containers/entities/entities";

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

// Primary navigation, shared by the header, the mobile menu and the footer.
export const NAV_ITEMS: NavItemType[] = [
  { id: "home", router: "/" },
  { id: "projects", router: "/projects" },
  { id: "about", router: "/about" },
  { id: "contact", router: "/contact" },
];

export const LINKEDIN_URL = "https://www.linkedin.com/in/mauro-gerardi";
export const GITHUB_URL = "https://github.com/Maure-dev";
export const EMAIL = "alegerardi.00@gmail.com";

// Browser UI colour per theme (meta[name=theme-color]); mirrors --bg in main.css.
export const THEME_COLORS: Record<ThemeType, string> = {
  dark: "#1E1E1E",
  light: "#FFFFFF",
};
