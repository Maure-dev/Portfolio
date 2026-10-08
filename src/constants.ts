import type { NavItemType, ThemeType } from "./containers/entities/entities";

const CV_URLS: Record<string, string> = {
  en: "/Mauro-Gerardi-CV-EN.pdf",
  es: "/Mauro-Gerardi-CV-ES.pdf",
};

export const getCvUrl = (language?: string): string =>
  CV_URLS[language ?? "en"] ?? CV_URLS.en;

export const SITE_URL = "https://maure-dev.vercel.app";

export const NAV_ITEMS: NavItemType[] = [
  { id: "home", router: "/" },
  { id: "projects", router: "/projects" },
  { id: "about", router: "/about" },
  { id: "contact", router: "/contact" },
];

export const LINKEDIN_URL = "https://www.linkedin.com/in/mauro-gerardi";
export const GITHUB_URL = "https://github.com/Maure-dev";
export const EMAIL = "alegerardi.00@gmail.com";

export const THEME_COLORS: Record<ThemeType, string> = {
  dark: "#1E1E1E",
  light: "#FFFFFF",
};
