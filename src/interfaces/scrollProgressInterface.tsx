import { useContext, useEffect, useRef } from "react";
import { OutletContext } from "../containers/contexts/outletContext";

export const ScrollProgressInterface = () => {
  const { menuOpen } = useContext(OutletContext)!;
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      bar.style.transform = `scaleX(${progress})`;
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(schedule)
        : null;
    resizeObserver?.observe(document.body);
    schedule();
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      resizeObserver?.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      className={[
        "pointer-events-none fixed inset-x-0 top-0 z-200 h-1 motion-safe:transition-opacity motion-safe:duration-200",
        menuOpen ? "opacity-0" : "opacity-100",
      ].join(" ")}
      aria-hidden="true"
    >
      <div
        ref={barRef}
        className="h-full w-full origin-left bg-primary motion-safe:transition-transform motion-safe:duration-150 motion-safe:ease-out"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
};
