import { useContext, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faFileArrowDown } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { OutletContext } from "../containers/contexts/outletContext";
import { EMAIL, getCvUrl, GITHUB_URL, LINKEDIN_URL, NAV_ITEMS } from "../constants";
import { ButtonInterface } from "./buttonInterface";
import { ThemeToggleInterface } from "./themeToggleInterface";
import { LanguageToggleInterface } from "./languageToggleInterface";

// Must match the `md:` breakpoint where the inline nav replaces the menu.
const DESKTOP_QUERY = "(min-width: 768px)";

const MENU_LINK =
  "flex min-h-14 items-center rounded-lg px-3 py-3 text-2xl font-semibold text-foreground motion-safe:transition-colors hover:bg-foreground/5 aria-[current=page]:text-accent";

const ICON_LINK =
  "inline-flex h-11 w-11 items-center justify-center rounded-lg text-xl text-secondary motion-safe:transition-colors hover:bg-foreground/5 hover:text-foreground";

/**
 * Full-screen mobile menu (below `md`). Dialog-like: focus moves in on open
 * and back to the toggle on close, the page behind is inert (see
 * HeaderInterface/OutletInterface), body scroll is locked and Escape closes.
 */
export const SidenavMobileInterface = () => {
  const { t, i18n } = useTranslation();
  const { menuOpen, handleSetMenuOpen } = useContext(OutletContext)!;
  const panelRef = useRef<HTMLElement>(null);

  // Escape closes the menu while it is open.
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") handleSetMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen, handleSetMenuOpen]);

  // Close when the viewport grows into the desktop layout (inline nav).
  useEffect(() => {
    if (!menuOpen) return;
    const mql = window.matchMedia(DESKTOP_QUERY);
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) handleSetMenuOpen(false);
    };
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [menuOpen, handleSetMenuOpen]);

  // Scroll lock + focus management.
  useEffect(() => {
    if (!menuOpen) return;
    const html = document.documentElement;
    const body = document.body;
    const previous = { html: html.style.overflow, body: body.style.overflow };
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    const openedAtPath = window.location.pathname;

    panelRef.current
      ?.querySelector<HTMLElement>("a, button")
      ?.focus({ preventScroll: true });

    return () => {
      html.style.overflow = previous.html;
      body.style.overflow = previous.body;
      // Restore focus to the toggle, unless the menu closed because the
      // route changed (then OutletInterface moves focus to <main>).
      if (window.location.pathname === openedAtPath) {
        document.getElementById("menu-button")?.focus({ preventScroll: true });
      }
    };
  }, [menuOpen]);

  const closeMenu = () => handleSetMenuOpen(false);

  return (
    <nav
      id="mobile-sidenav"
      ref={panelRef}
      aria-label={t("nav.mobileMenu")}
      inert={!menuOpen}
      aria-hidden={!menuOpen}
      className={[
        "fixed inset-x-0 top-0 z-90 h-dvh overflow-y-auto overscroll-contain bg-background pt-16 md:hidden motion-safe:transition-[transform,opacity] motion-safe:duration-300 motion-safe:ease-out",
        menuOpen
          ? "translate-x-0 opacity-100"
          : "pointer-events-none -translate-x-full opacity-0",
      ].join(" ")}
    >
      <div className="mx-auto flex min-h-full w-full max-w-6xl flex-col px-4 pb-[calc(2rem+env(safe-area-inset-bottom))] sm:px-6">
        <ul className="flex flex-col gap-1 py-6">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <NavLink
                to={item.router}
                end={item.router === "/"}
                onClick={closeMenu}
                className={MENU_LINK}
              >
                {t(`nav.${item.id}`)}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-5 border-t border-border py-6">
          <ButtonInterface
            variant="outline"
            size="lg"
            href={getCvUrl(i18n.resolvedLanguage)}
            download
            icon={faFileArrowDown}
            description={t("common.downloadCv")}
            onClick={closeMenu}
            className="w-full"
          />
          <div className="flex items-center justify-between gap-4">
            <LanguageToggleInterface size="lg" />
            <ThemeToggleInterface />
          </div>
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-2 border-t border-border pt-6">
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={ICON_LINK}
          >
            <FontAwesomeIcon icon={faLinkedin} aria-hidden="true" />
            <span className="sr-only">
              {t("common.linkedin")} {t("common.newTab")}
            </span>
          </a>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={ICON_LINK}
          >
            <FontAwesomeIcon icon={faGithub} aria-hidden="true" />
            <span className="sr-only">
              {t("common.github")} {t("common.newTab")}
            </span>
          </a>
          <a
            href={`mailto:${EMAIL}`}
            className="inline-flex min-h-11 items-center gap-2 rounded-lg px-2 text-sm text-secondary motion-safe:transition-colors hover:bg-foreground/5 hover:text-foreground"
          >
            <FontAwesomeIcon icon={faEnvelope} aria-hidden="true" />
            <span className="sr-only">{t("common.email")}: </span>
            {EMAIL}
          </a>
        </div>
      </div>
    </nav>
  );
};
