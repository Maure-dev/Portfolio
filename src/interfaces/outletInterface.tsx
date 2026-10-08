import { Suspense, useContext, useEffect, useLayoutEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { OutletContext } from "../containers/contexts/outletContext";
import { RouteFallbackInterface } from "./routeFallbackInterface";

export const OutletInterface = () => {
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
      <Suspense fallback={<RouteFallbackInterface />}>
        <Outlet />
      </Suspense>
    </main>
  );
};
