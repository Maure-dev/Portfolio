import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { SITE_URL } from "../constants";

type PageKey = "home" | "projects" | "about" | "contact";
type MetaAttr = "name" | "property";

const metaSelector = (attr: MetaAttr, key: string) => `meta[${attr}="${key}"]`;
const linkSelector = (rel: string) => `link[rel="${rel}"]`;

export const upsertMeta = (
  attr: MetaAttr,
  key: string,
  content: string
): HTMLMetaElement => {
  let tag = document.head.querySelector<HTMLMetaElement>(metaSelector(attr, key));
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
  return tag;
};

export const upsertLink = (rel: string, href: string): HTMLLinkElement => {
  let tag = document.head.querySelector<HTMLLinkElement>(linkSelector(rel));
  if (!tag) {
    tag = document.createElement("link");
    tag.setAttribute("rel", rel);
    document.head.appendChild(tag);
  }
  tag.setAttribute("href", href);
  return tag;
};

export const removeMeta = (attr: MetaAttr, key: string) => {
  document.head.querySelector(metaSelector(attr, key))?.remove();
};

export const removeLink = (rel: string) => {
  document.head.querySelector(linkSelector(rel))?.remove();
};

export const canonicalUrlFor = (pathname: string): string => {
  const clean = pathname.replace(/\/+$/, "");
  return clean ? `${SITE_URL}${clean}` : `${SITE_URL}/`;
};

export const applyRobots = (content: string): (() => void) => {
  const tag = upsertMeta("name", "robots", content);
  return () => tag.remove();
};

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
