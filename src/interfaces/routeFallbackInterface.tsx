import { useTranslation } from "react-i18next";

export const RouteFallbackInterface = () => {
  const { t } = useTranslation();
  return (
    <div
      className="min-h-dvh pt-16 lg:pt-20"
      role="status"
      aria-busy="true"
      aria-live="polite"
    >
      <span className="sr-only">{t("common.loading")}</span>
    </div>
  );
};
