import type { CardInterfaceType } from "../containers/entities/entities";

const INTERACTIVE =
  "motion-safe:transition-[transform,border-color,box-shadow] motion-safe:duration-300 hover:-translate-y-1 hover:border-primary/40 focus-within:border-primary/40 light:hover:shadow-md";

export const CardInterface = ({
  as: Tag = "div",
  interactive = false,
  className,
  children,
  id,
  lang,
}: CardInterfaceType) => (
  <Tag
    id={id}
    lang={lang}
    className={[
      "rounded-xl border border-border bg-surface p-6 light:shadow-sm",
      interactive ? INTERACTIVE : "",
      className,
    ]
      .filter(Boolean)
      .join(" ")}
  >
    {children}
  </Tag>
);
