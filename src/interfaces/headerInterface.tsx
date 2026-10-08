import { Fragment, useContext } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faXmark,
  faFileArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import { OutletContext } from "../containers/contexts/outletContext";
import { SidenavMobileInterface } from "./sidenavMobileInterface";
import { ThemeToggleInterface } from "./themeToggleInterface";
import { LanguageToggleInterface } from "./languageToggleInterface";
import { ButtonInterface } from "./buttonInterface";
import { getCvUrl, NAV_ITEMS } from "../constants";

const NAV_LINK =
  "relative inline-flex min-h-11 items-center rounded-lg px-2 text-sm font-medium whitespace-nowrap text-secondary motion-safe:transition-colors hover:text-foreground lg:px-3 lg:text-base aria-[current=page]:text-accent after:absolute after:inset-x-2 after:bottom-1.5 after:h-0.5 after:rounded-full after:bg-accent after:opacity-0 motion-safe:after:transition-opacity aria-[current=page]:after:opacity-100 lg:after:inset-x-3";

export const HeaderInterface = () => {
  const { t, i18n } = useTranslation();
  const { menuOpen, handleSetMenuOpen } = useContext(OutletContext)!;
  const cvUrl = getCvUrl(i18n.resolvedLanguage);

  return (
    <Fragment>
      <header className="fixed inset-x-0 top-0 z-100 h-16 border-b border-border bg-background/80 backdrop-blur-xl lg:h-20">
        <div className="mx-auto flex h-full w-full max-w-6xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
          <NavLink
            to="/"
            end
            inert={menuOpen}
            title={t("nav.home")}
            className="flex min-h-11 shrink-0 items-center gap-3 rounded-lg"
          >
            <img
              src="/profile-96.webp"
              srcSet="/profile-96.webp 1x, /profile-192.webp 2x"
              width={40}
              height={40}
              alt=""
              decoding="async"
              className="size-10 rounded-full bg-surface ring-1 ring-border"
            />
            <span className="text-base font-semibold text-accent lg:text-lg">
              {t("common.brand")}
            </span>
          </NavLink>

          <nav
            aria-label={t("nav.main")}
            inert={menuOpen}
            className="hidden md:block"
          >
            <ul className="flex items-center gap-0 lg:gap-1">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <NavLink
                    to={item.router}
                    end={item.router === "/"}
                    className={NAV_LINK}
                  >
                    {t(`nav.${item.id}`)}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">
            <div inert={menuOpen} className="flex items-center gap-1 sm:gap-2">
              <ButtonInterface
                variant="outline"
                href={cvUrl}
                download
                icon={faFileArrowDown}
                description={t("common.downloadCv")}
                labelClassName="hidden xl:inline"
                aria-label={t("common.downloadCv")}
                title={t("common.downloadCv")}
                className="max-md:hidden"
              />
              <LanguageToggleInterface className="max-md:hidden" />
              <ThemeToggleInterface />
            </div>
            <button
              id="menu-button"
              type="button"
              aria-label={menuOpen ? t("common.closeMenu") : t("common.openMenu")}
              aria-expanded={menuOpen}
              aria-controls="mobile-sidenav"
              onClick={() => handleSetMenuOpen(!menuOpen)}
              className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg text-xl text-foreground motion-safe:transition-colors hover:bg-foreground/5 md:hidden"
            >
              <FontAwesomeIcon
                icon={menuOpen ? faXmark : faBars}
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </header>
      <SidenavMobileInterface />
    </Fragment>
  );
};
