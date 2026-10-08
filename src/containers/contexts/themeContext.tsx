import { createContext, useContext, useEffect, useState } from "react";
import type {
  ThemeContextType,
  ThemeContextPropsType,
  ThemeType,
} from "../entities/entities";
import { THEME_COLORS } from "../../constants";

export const ThemeContext = createContext<ThemeContextType | null>(null);

const getInitialTheme = (): ThemeType =>
  document.documentElement.classList.contains("light") ? "light" : "dark";

const persistTheme = (theme: ThemeType): boolean => {
  try {
    localStorage.setItem("theme", theme);
    return true;
  } catch {
    return false;
  }
};

export const ThemeProvider = ({ children }: ThemeContextPropsType) => {
  const [theme, setThemeState] = useState<ThemeType>(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.classList.toggle("light", theme === "light");
    root.style.colorScheme = theme;

    let meta = document.head.querySelector<HTMLMetaElement>(
      'meta[name="theme-color"]'
    );
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "theme-color";
      document.head.appendChild(meta);
    }
    meta.content = THEME_COLORS[theme];
    persistTheme(theme);
  }, [theme]);

  const toggleTheme = () =>
    setThemeState((prev) => (prev === "dark" ? "light" : "dark"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
