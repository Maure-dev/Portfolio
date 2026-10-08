import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../containers/contexts/themeContext";

export const ThemeToggleInterface = ({ className }: { className?: string }) => {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  const isDark = theme === "dark";
  const hint = isDark ? t("common.switchToLight") : t("common.switchToDark");

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-pressed={isDark}
      aria-label={t("common.themeDark")}
      title={hint}
      className={[
        "inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg text-xl text-secondary motion-safe:transition-colors hover:bg-foreground/5 hover:text-foreground",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <FontAwesomeIcon icon={isDark ? faMoon : faSun} aria-hidden="true" />
    </button>
  );
};
