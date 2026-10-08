import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { OutletContext } from "../containers/contexts/outletContext";

const SHOW_AFTER_PX = 400;

/**
 * Floating "back to top" button. Reads the window scroll position inside
 * requestAnimationFrame (passive listener) and only re-renders when the
 * visible/hidden boolean flips. Leaves the tab order while hidden.
 */
export const BackToTopInterface = () => {
  const { t } = useTranslation();
  const { menuOpen } = useContext(OutletContext)!;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const next = window.scrollY > SHOW_AFTER_PX;
      setVisible((prev) => (prev === next ? prev : next));
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", schedule, { passive: true });
    schedule();
    return () => {
      window.removeEventListener("scroll", schedule);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const shown = visible && !menuOpen;

  const handleClick = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    document.getElementById("main")?.focus({ preventScroll: true });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={t("common.backToTop")}
      title={t("common.backToTop")}
      tabIndex={shown ? 0 : -1}
      aria-hidden={!shown}
      className={[
        "fixed right-4 bottom-[calc(1.5rem+env(safe-area-inset-bottom))] z-80 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-primary text-on-primary shadow-lg motion-safe:transition-[opacity,transform,background-color] motion-safe:duration-300 hover:bg-primary/90 sm:right-6",
        shown
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0",
      ].join(" ")}
    >
      <FontAwesomeIcon icon={faArrowUp} aria-hidden="true" />
    </button>
  );
};
