import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { SITE_URL } from "../constants";

type PageKey = "home" | "projects" | "about" | "contact";

const upsertMeta = (
  attr: "name" | "property",
  key: string,
  content: string
): HTMLMetaElement => {
  let tag = document.head.querySelector<HTMLMetaElement>(
    `meta[${attr}="${key}"]`
  );
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
  return tag;
};

const upsertLink = (rel: string, href: string) => {
  let tag = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!tag) {
    tag = document.createElement("link");
    tag.setAttribute("rel", rel);
    document.head.appendChild(tag);
  }
  tag.setAttribute("href", href);
};

/** Absolute canonical URL for a router pathname (no trailing slash except "/"). */
export const canonicalUrlFor = (pathname: string): string => {
  const clean = pathname.replace(/\/+$/, "");
  return clean ? `${SITE_URL}${clean}` : `${SITE_URL}/`;
};

/**
 * Adds/updates `<meta name="robots">` while a component is mounted (404 and
 * error pages must not be indexed). Returns a cleanup that removes it.
 */
export const applyRobots = (content: string): (() => void) => {
  const tag = upsertMeta("name", "robots", content);
  return () => tag.remove();
};

/**
 * Sets the document title, description, canonical, OG/Twitter meta and
 * og:locale for the current route. Re-runs on language change so metadata
 * stays localized. Used because react-router-dom 7's `meta` export is only
 * available in framework mode, not in this client-only SPA.
 */
export const usePageMeta = (page: PageKey) => {
  const { t, i18n } = useTranslation();
  const { pathname } = useLocation();

  useEffect(() => {
    const title = t(`meta.${page}.title`);
    const description = t(`meta.${page}.description`);
    const url = canonicalUrlFor(pathname);
    const isSpanish = i18n.resolvedLanguage === "es";

    document.title = title;
    upsertMeta("name", "description", description);
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:locale", isSpanish ? "es_AR" : "en_US");
    upsertMeta("property", "og:locale:alternate", isSpanish ? "en_US" : "es_AR");
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
    upsertLink("canonical", url);
  }, [t, i18n.resolvedLanguage, page, pathname]);
};
