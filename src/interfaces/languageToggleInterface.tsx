import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLanguage } from "@fortawesome/free-solid-svg-icons";

export const LanguageToggleInterface = ({
  className,
}: {
  className?: string;
}) => {
  const { i18n, t } = useTranslation();
  const current = i18n.resolvedLanguage === "es" ? "es" : "en";
  const next = current === "en" ? "es" : "en";

  return (
    <button
      type="button"
      onClick={() => void i18n.changeLanguage(next)}
      aria-label={t("common.language")}
      title={t("common.language")}
      className={`flex items-center gap-1.5 font-semibold hover:text-primary transition-colors duration-300 cursor-pointer ${
        className ?? ""
      }`}
    >
      <FontAwesomeIcon
        icon={faLanguage}
        className="text-xl"
        aria-hidden="true"
      />
      <span className="uppercase">{next}</span>
    </button>
  );
};
