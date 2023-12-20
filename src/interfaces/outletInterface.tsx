import { Suspense, useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { OutletContext } from "../containers/contexts/outletContext";
import { useLocation } from "react-router-dom";

export const OutletInterface = () => {
  const outletContext = useContext(OutletContext);
  const handleScroll = outletContext ? outletContext.handleScroll : undefined;
  const { pathname } = useLocation();

  useEffect(() => {
    const sectionContainer = document.getElementById("sectionContainer");
    if (sectionContainer) {
      sectionContainer.scrollTop = 0;
    }
  }, [pathname]);

  return (
    <div
      id="sectionContainer"
      className="w-screen h-screen overflow-y-scroll"
      onScroll={handleScroll}
    >
      <Suspense>
        <Outlet />
      </Suspense>
    </div>
  );
};
