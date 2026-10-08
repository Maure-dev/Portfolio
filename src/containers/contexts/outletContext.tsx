import { createContext, useCallback, useMemo, useState } from "react";
import type {
  OutletContextPropsType,
  OutletContextType,
} from "../entities/entities";

export const OutletContext = createContext<OutletContextType | null>(null);

/**
 * Shell state shared by the header, mobile menu, outlet and back-to-top
 * button. Scroll position is deliberately NOT React state: the progress bar
 * and back-to-top read `window` scroll inside requestAnimationFrame.
 */
export const OutletProvider = ({ children }: OutletContextPropsType) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const handleSetMenuOpen = useCallback((option: boolean) => {
    setMenuOpen(option);
  }, []);

  const value = useMemo(
    () => ({ menuOpen, handleSetMenuOpen }),
    [menuOpen, handleSetMenuOpen]
  );

  return (
    <OutletContext.Provider value={value}>{children}</OutletContext.Provider>
  );
};
