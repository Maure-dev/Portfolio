import { NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faCopyright } from "@fortawesome/free-regular-svg-icons";

export const FooterInterface = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const getYear = (): number => {
    const Year: Date = new Date();
    return Year.getFullYear();
  };
  return (
    <footer className="h-screen w-full bg-background flex flex-col items-center px-4 lg:px-20 justify-center text-center text-white relative">
      <h1 className="text-4xl lg:text-7xl font-medium">{t("footer.title")}</h1>
      <div className="flex flex-row items-center mt-16">
        <a
          href="https://www.linkedin.com/in/mauro-gerardi"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t("common.linkedin")}
          className="flex items-center mr-8 lg:mr-24"
        >
          <FontAwesomeIcon
            icon={faLinkedin}
            className="text-8xl hover:text-primary transition-colors"
            aria-hidden="true"
          />
        </a>
        {location.pathname != "/contact" && (
          <NavLink
            to="/contact"
            aria-label={t("common.goToContact")}
            className="flex mr-8 lg:mr-24"
          >
            <FontAwesomeIcon
              icon={faEnvelope}
              className="text-8xl hover:text-primary transition-colors"
              aria-hidden="true"
            />
          </NavLink>
        )}
        <a
          href="https://github.com/Maure-dev"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t("common.github")}
          className="flex items-center"
        >
          <FontAwesomeIcon
            icon={faGithub}
            className="text-8xl hover:text-primary transition-colors"
            aria-hidden="true"
          />
        </a>
      </div>
      <p className="font-semibold absolute bottom-8 flex items-center">
        <FontAwesomeIcon icon={faCopyright} className="mr-2" aria-hidden="true" />
        <span>{t("footer.copyright", { year: getYear() })}</span>
      </p>
    </footer>
  );
};
