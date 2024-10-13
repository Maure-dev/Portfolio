import type {
  OutletContextPropsType,
  OutletContextType,
} from "../entities/entities";
import { createContext, useState } from "react";

export const OutletContext = createContext<OutletContextType | null>(null);

export const OutletProvider = ({ children }: OutletContextPropsType) => {
  const [scrollTop, setScrollTop] = useState<number>(0);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [language, setLanguage] = useState(() => {
    if (navigator.language.includes("es")) {
      return sessionStorage.getItem("language") || "es";
    }
    return sessionStorage.getItem("language") || "en";
  });

  const handleScroll = (event: React.UIEvent<HTMLElement>) => {
    setScrollTop(event.currentTarget.scrollTop);
  };

  const handleSetMenuOpen = (option: boolean) => {
    setMenuOpen(option);
  };

  const handleSetLanguage = (e: string) => {
    setLanguage(e);
    sessionStorage.setItem("language", e);
  };

  return (
    <OutletContext.Provider
      value={{
        scrollTop,
        handleScroll,
        menuOpen,
        handleSetMenuOpen,
        language,
        handleSetLanguage,
      }}
    >
      {children}
    </OutletContext.Provider>
  );
};
