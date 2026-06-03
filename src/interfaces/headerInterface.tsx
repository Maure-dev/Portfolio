import { NavLink } from "react-router-dom";
import type { CSSProperties, JSX } from "react";
import type { HeaderItemsType } from "../containers/entities/entities";
import ProfileImage from "/profile-rounded.png";
import { SidenavMobileInterface } from "./sidenavMobileInterface";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark, faFileArrowDown } from "@fortawesome/free-solid-svg-icons";
import { OutletContext } from "../containers/contexts/outletContext";
import { ThemeToggleInterface } from "./themeToggleInterface";
import { LanguageToggleInterface } from "./languageToggleInterface";
import { getCvUrl } from "../constants";

const headerItems: HeaderItemsType = {
  data: [
    {
      id: "product",
      router: "/",
    },
    {
      id: "projects",
      router: "/projects",
    },
    {
      id: "about",
      router: "/about",
    },
    {
      id: "contact",
      router: "/contact",
    },
  ],
};

export const HeaderInterface = (): JSX.Element => {
  const { t, i18n } = useTranslation();
  const { menuOpen, handleSetMenuOpen } = useContext(OutletContext)!;

  return (
    <React.Fragment>
      <header
        className="h-20 w-full backdrop-blur-2xl fixed z-100 px-4 lg:px-48 py-7 flex items-center justify-center text-white"
        style={{ WebkitBackdropFilter: "blur(40px)" }}
      >
        <button
          type="button"
          aria-label={menuOpen ? t("common.closeMenu") : t("common.openMenu")}
          aria-expanded={menuOpen}
          aria-controls="mobile-sidenav"
          className="fixed flex left-4 lg:hidden text-2xl"
          onClick={() => {
            handleSetMenuOpen(!menuOpen);
          }}
        >
          <FontAwesomeIcon icon={menuOpen ? faXmark : faBars} aria-hidden="true" />
        </button>
        <NavLink
          to="/"
          className="lg:fixed lg:left-48 flex items-center transition-all duration-300"
        >
          <img
            className="w-12 mr-4 lg:mr-8"
            src={ProfileImage}
            alt={t("common.profilePhotoAlt")}
          />
          <h3 className="font-bold text-primary">{t("common.brand")}</h3>
        </NavLink>
        <ul className="hidden lg:flex">
          {headerItems.data.map((item, index) => {
            return (
              <NavLink
                key={item.id}
                to={item.router}
                className="text-xl hover:text-primary transition-all duration-300 &active:text-primary"
                style={({ isActive }: { isActive: boolean }): CSSProperties => {
                  return {
                    fontWeight: isActive ? 700 : 300,
                    color: isActive ? "var(--primary)" : "",
                  };
                }}
              >
                <li
                  className={
                    headerItems.data.length === index + 1 ? "" : "mr-8"
                  }
                >
                  {t(`nav.${item.id}`)}
                </li>
              </NavLink>
            );
          })}
        </ul>
        <div className="hidden lg:flex fixed right-48 items-center gap-6">
          <a
            href={getCvUrl(i18n.resolvedLanguage)}
            download
            className="inline-flex items-center gap-2 border-2 border-primary text-primary rounded-lg px-4 py-1.5 text-sm font-semibold hover:bg-primary hover:text-white transition-colors duration-300"
          >
            <FontAwesomeIcon icon={faFileArrowDown} aria-hidden="true" />
            {t("common.downloadCv")}
          </a>
          <LanguageToggleInterface />
          <ThemeToggleInterface />
        </div>
      </header>
      <SidenavMobileInterface headerItems={headerItems} />
    </React.Fragment>
  );
};
