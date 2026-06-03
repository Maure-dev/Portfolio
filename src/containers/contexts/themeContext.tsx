import { createContext, useContext, useEffect, useState } from "react";
import type {
  ThemeContextType,
  ThemeContextPropsType,
  ThemeType,
} from "../entities/entities";

export const ThemeContext = createContext<ThemeContextType | null>(null);

// Trust the class the inline <head> script already put on <html> so React's
// initial state matches the pre-paint theme (no flash, no recompute).
const getInitialTheme = (): ThemeType =>
  document.documentElement.classList.contains("light") ? "light" : "dark";

export const ThemeProvider = ({ children }: ThemeContextPropsType) => {
  const [theme, setThemeState] = useState<ThemeType>(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.classList.toggle("light", theme === "light");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const setTheme = (option: ThemeType) => setThemeState(option);
  const toggleTheme = () =>
    setThemeState((prev) => (prev === "dark" ? "light" : "dark"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
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
