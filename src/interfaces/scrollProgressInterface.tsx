import { useContext } from "react";
import { OutletContext } from "../containers/contexts/outletContext";

export const ScrollProgressInterface = () => {
  const context = useContext(OutletContext);
  const progress = context?.scrollProgress ?? 0;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-200 h-1 pointer-events-none"
      aria-hidden="true"
    >
      <div
        className="h-full bg-primary transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};
