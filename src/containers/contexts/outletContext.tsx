import type {
  OutletContextPropsType,
  OutletContextType,
} from "../entities/entities";
import { createContext, useState } from "react";

export const OutletContext = createContext<OutletContextType | null>(null);

export const OutletProvider = ({ children }: OutletContextPropsType) => {
  const [scrollTop, setScrollTop] = useState<number>(0);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const handleScroll = (event: React.UIEvent<HTMLElement>) => {
    const element = event.currentTarget;
    setScrollTop(element.scrollTop);
    const max = element.scrollHeight - element.clientHeight;
    setScrollProgress(max > 0 ? (element.scrollTop / max) * 100 : 0);
  };

  const handleSetMenuOpen = (option: boolean) => {
    setMenuOpen(option);
  };

  return (
    <OutletContext.Provider
      value={{
        scrollTop,
        scrollProgress,
        handleScroll,
        menuOpen,
        handleSetMenuOpen,
      }}
    >
      {children}
    </OutletContext.Provider>
  );
};
