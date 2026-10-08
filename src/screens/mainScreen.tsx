import { useContext } from "react";
import { ScrollRestoration } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { OutletInterface } from "../interfaces/outletInterface";
import {
  OutletContext,
  OutletProvider,
} from "../containers/contexts/outletContext";
import { HeaderInterface } from "../interfaces/headerInterface";
import { ScrollProgressInterface } from "../interfaces/scrollProgressInterface";
import { BackToTopInterface } from "../interfaces/backToTopInterface";

const SkipLink = () => {
  const { t } = useTranslation();
  const { menuOpen } = useContext(OutletContext)!;
  return (
    <a
      href="#main"
      inert={menuOpen}
      className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-200 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:font-semibold focus:text-on-primary"
    >
      {t("common.skipToContent")}
    </a>
  );
};

export const MainScreen = () => (
  <OutletProvider>
    <SkipLink />
    <ScrollProgressInterface />
    <HeaderInterface />
    <OutletInterface />
    <BackToTopInterface />
    <ScrollRestoration />
  </OutletProvider>
);
