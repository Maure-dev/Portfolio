import type { SectionInterfaceType } from "../containers/entities/entities";

/**
 * Page section: natural height, `py-20 lg:py-28`, optional secondary band,
 * and the shared max-width container (`max-w-6xl px-4 sm:px-6 lg:px-8`).
 */
export const SectionInterface = ({
  id,
  band = "default",
  className,
  containerClassName,
  labelledBy,
  children,
}: SectionInterfaceType) => (
  <section
    id={id}
    aria-labelledby={labelledBy}
    className={[
      "w-full py-20 lg:py-28",
      band === "secondary" ? "bg-backgroundSecondary" : "bg-background",
      className,
    ]
      .filter(Boolean)
      .join(" ")}
  >
    <div
      className={["mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8", containerClassName]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  </section>
);
