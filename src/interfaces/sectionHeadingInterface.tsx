import type { SectionHeadingInterfaceType } from "../containers/entities/entities";

/** Eyebrow + title (h2 by default, h1 for the page title) + optional subtitle. */
export const SectionHeadingInterface = ({
  title,
  eyebrow,
  subtitle,
  as: Heading = "h2",
  align = "center",
  id,
  className,
}: SectionHeadingInterfaceType) => {
  const centered = align === "center";
  return (
    <div
      className={["mb-10 lg:mb-14", centered ? "text-center" : "text-left", className]
        .filter(Boolean)
        .join(" ")}
    >
      {eyebrow && (
        <p className="mb-3 text-sm font-semibold tracking-widest text-accent uppercase">
          {eyebrow}
        </p>
      )}
      <Heading id={id} className="text-title text-foreground">
        {title}
      </Heading>
      {subtitle && (
        <p
          className={[
            "mt-4 max-w-2xl text-lead text-pretty text-secondary",
            centered ? "mx-auto" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};
