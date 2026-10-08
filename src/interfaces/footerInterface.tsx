import { NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faEnvelope, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { ButtonInterface } from "./buttonInterface";
import { EMAIL, GITHUB_URL, LINKEDIN_URL, NAV_ITEMS } from "../constants";

const FOOTER_LINK =
  "inline-flex min-h-11 items-center rounded-lg px-2 text-sm font-medium text-secondary motion-safe:transition-colors hover:text-foreground aria-[current=page]:text-accent";

export const FooterInterface = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const year = new Date().getFullYear();
  const onContactPage = pathname === "/contact";

  const scrollToTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    document.getElementById("main")?.focus({ preventScroll: true });
  };

  return (
    <footer className="w-full border-t border-border bg-backgroundSecondary py-16">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-title text-foreground">{t("footer.title")}</h2>
          <p className="mt-3 max-w-xl text-lead text-pretty text-secondary">
            {t("footer.subtitle")}
          </p>
          <div className="mt-8 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center sm:justify-center">
            {onContactPage ? (
              <ButtonInterface
                href={`mailto:${EMAIL}`}
                icon={faEnvelope}
                description={EMAIL}
              />
            ) : (
              <ButtonInterface
                to="/contact"
                icon={faPaperPlane}
                description={t("common.contactMe")}
              />
            )}
            <ButtonInterface
              href={LINKEDIN_URL}
              target="_blank"
              variant="outline"
              icon={faLinkedin}
              description="LinkedIn"
            />
            <ButtonInterface
              href={GITHUB_URL}
              target="_blank"
              variant="outline"
              icon={faGithub}
              description="GitHub"
            />
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center gap-4 border-t border-border pt-6 text-sm text-secondary md:flex-row md:justify-between">
          <nav aria-label={t("nav.footer")}>
            <ul className="flex flex-wrap items-center justify-center gap-x-1 gap-y-1">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <NavLink
                    to={item.router}
                    end={item.router === "/"}
                    className={FOOTER_LINK}
                  >
                    {t(`nav.${item.id}`)}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <p className="text-center">{t("footer.copyright", { year })}</p>
          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-lg px-2 text-sm font-medium text-secondary motion-safe:transition-colors hover:text-foreground"
          >
            <FontAwesomeIcon icon={faArrowUp} aria-hidden="true" />
            {t("footer.backToTop")}
          </button>
        </div>
      </div>
    </footer>
  );
};
