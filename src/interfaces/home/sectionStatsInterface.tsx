import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const Counter = ({
  value,
  suffix,
  start,
}: {
  value: number;
  suffix: string;
  start: boolean;
}) => {
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!start) return;

    if (prefersReducedMotion()) {
      const id = requestAnimationFrame(() => setN(value));
      return () => cancelAnimationFrame(id);
    }

    const duration = 1200;
    let startTs: number | null = null;
    let raf = 0;
    const tick = (ts: number) => {
      if (startTs === null) startTs = ts;
      const progress = Math.min((ts - startTs) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setN(Math.round(eased * value));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, value]);

  return (
    <span>
      {n}
      {suffix}
    </span>
  );
};

export const SectionStatsInterface = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const [started, setStarted] = useState(prefersReducedMotion);

  const stats: {
    key: "experience" | "projects" | "technologies" | "languages";
    value: number;
    suffix: string;
  }[] = [
    { key: "experience", value: new Date().getFullYear() - 2021, suffix: "+" },
    { key: "projects", value: 8, suffix: "" },
    { key: "technologies", value: 23, suffix: "+" },
    { key: "languages", value: 2, suffix: "" },
  ];

  useEffect(() => {
    if (started) return;
    const el = sectionRef.current;
    if (!el) return;
    const root = document.getElementById("sectionContainer");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setStarted(true);
            observer.disconnect();
            break;
          }
        }
      },
      { root, threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen w-full bg-backgroundSecondary flex items-center justify-center px-4 lg:px-48 py-24 text-white"
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16 w-full max-w-5xl">
        {stats.map((stat) => (
          <div key={stat.key} className="flex flex-col items-center text-center">
            <span className="text-5xl lg:text-7xl font-bold text-primary">
              <Counter value={stat.value} suffix={stat.suffix} start={started} />
            </span>
            <span className="mt-3 text-base lg:text-lg text-secondary">
              {t(`home.stats.${stat.key}`)}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};
