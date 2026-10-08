import type { TagInterfaceType, TagTone } from "../containers/entities/entities";

const TONES: Record<TagTone, string> = {
  accent: "bg-primary/10 text-accent",
  success: "bg-success/10 text-success",
  neutral: "bg-foreground/10 text-secondary",
};

/** Small pill for stack chips, categories and status ("Current", availability). */
export const TagInterface = ({
  children,
  className,
  tone = "accent",
  as: Tag = "span",
}: TagInterfaceType) => (
  <Tag
    className={[
      "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium",
      TONES[tone],
      className,
    ]
      .filter(Boolean)
      .join(" ")}
  >
    {children}
  </Tag>
);
