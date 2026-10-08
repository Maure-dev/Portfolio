import { useTranslation } from "react-i18next";
import type { AppLanguage } from "../i18n/i18n";

type LanguageToggleProps = {
  className?: string;
  size?: "md" | "lg";
};

export const LanguageToggleInterface = ({
  className,
  size = "md",
}: LanguageToggleProps) => {
  const { i18n, t } = useTranslation();
  const current: AppLanguage = i18n.resolvedLanguage === "es" ? "es" : "en";
  const options: { code: AppLanguage; label: string }[] = [
    { code: "en", label: t("common.switchToEnglish") },
    { code: "es", label: t("common.switchToSpanish") },
  ];
  const optionSize = size === "lg" ? "h-11 min-w-12 px-3" : "h-11 min-w-11 px-2.5";

  return (
    <div
      role="group"
      aria-label={t("common.currentLanguage", { lang: current.toUpperCase() })}
      className={[
        "inline-flex items-center rounded-lg border border-border bg-surface p-0.5",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {options.map(({ code, label }) => {
        const active = code === current;
        return (
          <button
            key={code}
            type="button"
            lang={code}
            aria-pressed={active}
            aria-label={label}
            title={label}
            onClick={() => {
              if (!active) void i18n.changeLanguage(code);
            }}
            className={[
              "inline-flex cursor-pointer items-center justify-center rounded-md text-sm font-semibold uppercase motion-safe:transition-colors",
              optionSize,
              active
                ? "bg-primary text-on-primary"
                : "text-secondary hover:text-foreground",
            ].join(" ")}
          >
            {code}
          </button>
        );
      })}
    </div>
  );
};
