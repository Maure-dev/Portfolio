import { OutletInterface } from "../interfaces/outletInterface";
import { OutletProvider } from "../containers/contexts/outletContext";
import { HeaderInterface } from "../interfaces/headerInterface";
import React from "react";

export const MainScreen = () => {
  return (
    <React.Fragment>
      <OutletProvider>
        <HeaderInterface />
        <OutletInterface />
      </OutletProvider>
    </React.Fragment>
  );
};
