import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { OutletContext } from "../containers/contexts/outletContext";

export const BackToTopInterface = () => {
  const { t } = useTranslation();
  const context = useContext(OutletContext);
  const visible = (context?.scrollTop ?? 0) > 400;

  const handleClick = () => {
    const element = document.getElementById("sectionContainer");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    element?.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={t("common.backToTop")}
      title={t("common.backToTop")}
      className={`fixed bottom-6 right-6 z-100 h-12 w-12 flex items-center justify-center rounded-full bg-primary text-white shadow-lg transition-all duration-300 hover:bg-primary/80 cursor-pointer ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <FontAwesomeIcon icon={faArrowUp} aria-hidden="true" />
    </button>
  );
};
