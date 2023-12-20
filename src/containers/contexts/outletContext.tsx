import type {
  OutletContextPropsType,
  OutletContextType,
} from "../entities/entities";
import { createContext, useState } from "react";

export const OutletContext = createContext<OutletContextType | null>(null);

export const OutletProvider = ({ children }: OutletContextPropsType) => {
  const [scrollTop, setScrollTop] = useState<number>(0);

  const handleScroll = (event: React.UIEvent<HTMLElement>) => {
    setScrollTop(event.currentTarget.scrollTop);
  };

  return (
    <OutletContext.Provider
      value={{
        scrollTop,
        handleScroll,
      }}
    >
      {children}
    </OutletContext.Provider>
  );
};
