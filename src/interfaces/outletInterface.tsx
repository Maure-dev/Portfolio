import { Suspense, useContext, useEffect, useLayoutEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { OutletContext } from "../containers/contexts/outletContext";

export const OutletInterface = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const { menuOpen, handleSetMenuOpen } = useContext(OutletContext)!;
  const mainRef = useRef<HTMLElement>(null);
  const lastPath = useRef<string | null>(null);

  useLayoutEffect(() => {
    if (lastPath.current === pathname) return;
    const isInitialLoad = lastPath.current === null;
    lastPath.current = pathname;
    if (isInitialLoad) return;
    mainRef.current?.focus({ preventScroll: true });
  }, [pathname]);

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
