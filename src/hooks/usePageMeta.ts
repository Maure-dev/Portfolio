import { useEffect } from "react";
import { useTranslation } from "react-i18next";

type PageKey = "home" | "projects" | "about" | "contact";

const setMeta = (selector: string, attr: string, value: string) => {
  let tag = document.head.querySelector<HTMLMetaElement>(selector);
  if (!tag) {
    tag = document.createElement("meta");
    const [name, val] = selector.includes("property=")
      ? ["property", selector.match(/property="([^"]+)"/)?.[1] ?? ""]
      : ["name", selector.match(/name="([^"]+)"/)?.[1] ?? ""];
    tag.setAttribute(name, val);
    document.head.appendChild(tag);
  }
  tag.setAttribute(attr, value);
};

/**
 * Sets the document title and description/OG/Twitter meta for the current
 * route. Re-runs on language change so metadata stays localized. Used because
 * react-router-dom 7's `meta` export is only available in framework mode, not
 * in this client-only createBrowserRouter SPA.
 */
export const usePageMeta = (page: PageKey) => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const title = t(`meta.${page}.title`);
    const description = t(`meta.${page}.description`);

    document.title = title;
    setMeta('meta[name="description"]', "content", description);
    setMeta('meta[property="og:title"]', "content", title);
    setMeta('meta[property="og:description"]', "content", description);
    setMeta('meta[name="twitter:title"]', "content", title);
    setMeta('meta[name="twitter:description"]', "content", description);
  }, [t, i18n.language, page]);
};
