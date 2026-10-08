import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { getStats } from "../../data/stats";
import { SectionInterface } from "../sectionInterface";
import { prefersReducedMotion } from "../../hooks/motion";

const DURATION_MS = 1200;

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

    let startTs: number | null = null;
    let raf = 0;
    const tick = (ts: number) => {
      if (startTs === null) startTs = ts;
      const progress = Math.min((ts - startTs) / DURATION_MS, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setN(Math.round(eased * value));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, value]);

  return (
    <>
      <span aria-hidden="true">
        {n}
        {suffix}
      </span>
      <span className="sr-only">
        {value}
        {suffix}
      </span>
    </>
  );
};

export const SectionStatsInterface = () => {
  const { t } = useTranslation();
  const stats = useMemo(() => getStats(), []);
  const listRef = useRef<HTMLDListElement>(null);
  const [started, setStarted] = useState(prefersReducedMotion);

  useEffect(() => {
    if (started) return;
    const el = listRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setStarted(true);
      return;
    }
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
      { root: null, threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  return (
    <SectionInterface band="secondary" labelledBy="stats-title">
      <h2 id="stats-title" className="sr-only">
        {t("home.stats.title")}
      </h2>
      <dl
        ref={listRef}
        className="mx-auto grid max-w-5xl grid-cols-2 gap-10 lg:grid-cols-4 lg:gap-16"
      >
        {stats.map((stat) => (
          <div key={stat.id} className="flex flex-col-reverse items-center text-center">
            <dt className="mt-3 text-base text-secondary lg:text-lg">
              {t(`home.stats.${stat.id}`)}
            </dt>
            <dd className="text-5xl font-bold text-accent tabular-nums lg:text-6xl">
              <Counter value={stat.value} suffix={stat.suffix} start={started} />
            </dd>
          </div>
        ))}
      </dl>
    </SectionInterface>
  );
};
