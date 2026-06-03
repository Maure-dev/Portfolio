import { CSSProperties, JSX, useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileArrowDown } from "@fortawesome/free-solid-svg-icons";
import { SidenavItemsType } from "../containers/entities/entities";
import { OutletContext } from "../containers/contexts/outletContext";
import { getCvUrl } from "../constants";
import { ThemeToggleInterface } from "./themeToggleInterface";
import { LanguageToggleInterface } from "./languageToggleInterface";

export const SidenavMobileInterface = ({
  headerItems,
}: SidenavItemsType): JSX.Element => {
  const { t, i18n } = useTranslation();
  const { menuOpen, handleSetMenuOpen } = useContext(OutletContext)!;

  // Close the menu with the Escape key while it is open.
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") handleSetMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen, handleSetMenuOpen]);

  return (
    <aside
      id="mobile-sidenav"
      inert={!menuOpen}
      className={`w-screen h-screen bg-background transition-all duration-500 transform z-80 fixed pt-32 ${menuOpen ? "" : "-translate-x-full"
        }`}
    >
      <ul className="flex flex-col justify-start items-center h-screen text-white">
        {headerItems.data.map((item, index) => {
          return (
            <NavLink
              key={item.id}
              onClick={() => {
                handleSetMenuOpen(false);
              }}
              to={item.router}
              className={`text-2xl hover:text-primary transition-all duration-300 &active:text-primary ${headerItems.data.length === index + 1 ? "" : "mb-16"
                }`}
              style={({ isActive }: { isActive: boolean }): CSSProperties => {
                return {
                  fontWeight: isActive ? 700 : 300,
                  color: isActive ? "var(--primary)" : "",
                };
              }}
            >
              <li>{t(`nav.${item.id}`)}</li>
            </NavLink>
          );
        })}
        <a
          href={getCvUrl(i18n.resolvedLanguage)}
          download
          onClick={() => handleSetMenuOpen(false)}
          className="inline-flex items-center gap-2 mt-8 border-2 border-primary text-primary rounded-lg px-6 py-2 text-xl font-semibold hover:bg-primary hover:text-white transition-colors duration-300"
        >
          <FontAwesomeIcon icon={faFileArrowDown} aria-hidden="true" />
          {t("common.downloadCv")}
        </a>
        <div className="flex items-center gap-10 mt-10 text-white">
          <ThemeToggleInterface className="text-2xl" />
          <LanguageToggleInterface className="text-lg" />
        </div>
      </ul>
    </aside>
  );
};
