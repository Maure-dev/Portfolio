import { Suspense, useContext, useEffect, useLayoutEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { OutletContext } from "../containers/contexts/outletContext";

/**
 * The page content landmark. The window is the scroll container (no inner
 * scroller): `<ScrollRestoration/>` in MainScreen resets/restores the scroll
 * position per navigation, and this component moves focus to <main> on every
 * route change so keyboard and screen-reader users land on the new page.
 */
export const OutletInterface = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const { menuOpen, handleSetMenuOpen } = useContext(OutletContext)!;
  const mainRef = useRef<HTMLElement>(null);
  const isFirstRender = useRef(true);

  useLayoutEffect(() => {
    if (isFirstRender.current) {
      // Initial load: let the browser keep its own focus/scroll behaviour.
      isFirstRender.current = false;
      return;
    }
    mainRef.current?.focus({ preventScroll: true });
  }, [pathname]);

  // A navigation (menu link, back/forward) always closes the mobile menu.
  useEffect(() => {
    handleSetMenuOpen(false);
  }, [pathname, handleSetMenuOpen]);

  return (
    <main
      id="main"
      ref={mainRef}
      tabIndex={-1}
      inert={menuOpen}
      className="outline-none"
    >
      <Suspense
        fallback={
          <div
            className="min-h-dvh pt-16 lg:pt-20"
            role="status"
            aria-busy="true"
            aria-live="polite"
          >
            <span className="sr-only">{t("common.loading")}</span>
          </div>
        }
      >
        <Outlet />
      </Suspense>
    </main>
  );
};
