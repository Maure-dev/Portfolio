import type { TagInterfaceType, TagTone } from "../containers/entities/entities";

type TagSize = "sm" | "md";

const TONES: Record<TagTone, string> = {
  accent: "bg-primary/10 text-accent",
  success: "bg-success/10 text-success",
  neutral: "border border-border bg-surface text-secondary",
};

const SIZES: Record<TagSize, string> = {
  sm: "gap-1.5 px-2.5 py-0.5 text-xs",
  md: "gap-2 px-3 py-1 text-sm",
};

export const TagInterface = ({
  children,
  className,
  tone = "accent",
  size = "sm",
  as: Tag = "span",
}: TagInterfaceType & { size?: TagSize }) => (
  <Tag
    className={[
      "inline-flex items-center rounded-full font-medium",
      SIZES[size],
      TONES[tone],
      className,
    ]
      .filter(Boolean)
      .join(" ")}
  >
    {children}
  </Tag>
);
