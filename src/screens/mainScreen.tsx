import { OutletInterface } from "../interfaces/outletInterface";
import { OutletProvider } from "../containers/contexts/outletContext";
import { HeaderInterface } from "../interfaces/headerInterface";
import { ScrollProgressInterface } from "../interfaces/scrollProgressInterface";
import { BackToTopInterface } from "../interfaces/backToTopInterface";
import React from "react";
import { useTranslation } from "react-i18next";

export const MainScreen = () => {
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <a
        href="#sectionContainer"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-200 focus:bg-primary focus:text-white focus:px-4 focus:py-2 focus:rounded-lg"
      >
        {t("common.skipToContent")}
      </a>
      <OutletProvider>
        <ScrollProgressInterface />
        <HeaderInterface />
        <OutletInterface />
        <BackToTopInterface />
      </OutletProvider>
    </React.Fragment>
  );
};
