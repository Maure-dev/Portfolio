import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../containers/contexts/themeContext";

export const ThemeToggleInterface = ({ className }: { className?: string }) => {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  const isDark = theme === "dark";
  const label = isDark ? t("common.switchToLight") : t("common.switchToDark");

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className={`text-xl hover:text-primary transition-colors duration-300 cursor-pointer ${
        className ?? ""
      }`}
    >
      <FontAwesomeIcon icon={isDark ? faSun : faMoon} aria-hidden="true" />
    </button>
  );
};
