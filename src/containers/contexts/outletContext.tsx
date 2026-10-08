import { createContext, useCallback, useMemo, useState } from "react";
import type {
  OutletContextPropsType,
  OutletContextType,
} from "../entities/entities";

export const OutletContext = createContext<OutletContextType | null>(null);

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
