import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faArrowUpRightFromSquare,
  faFileArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import avatar480 from "../../assets/sectionHome/home-avatar-480.webp";
import avatar720 from "../../assets/sectionHome/home-avatar-720.webp";
import avatar960 from "../../assets/sectionHome/home-avatar-960.webp";
import { ButtonInterface } from "../buttonInterface";
import { TagInterface } from "../tagInterface";
import { getCvUrl, GITHUB_URL, LINKEDIN_URL } from "../../constants";

const ENTER = "motion-safe:animate-[fade-up_0.5s_ease-out_both]";
const stagger = (ms: number) => ({ animationDelay: `${ms}ms` });

const SOCIAL_LINK =
  "inline-flex h-11 w-11 items-center justify-center rounded-lg text-xl text-secondary motion-safe:transition-colors hover:bg-foreground/5 hover:text-foreground";

export const SectionHomeInterface = () => {
  const { t, i18n } = useTranslation();
  const cvUrl = getCvUrl(i18n.resolvedLanguage);

  return (
    <section className="flex min-h-dvh w-full flex-col justify-center bg-background pt-24 pb-16 text-foreground">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-16 lg:px-8">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <TagInterface
            tone="neutral"
            size="md"
            className={`max-w-full text-center ${ENTER}`}
          >
            <span
              className="size-2.5 shrink-0 rounded-full bg-success"
              aria-hidden="true"
            />
            <span className="text-balance">{t("home.hero.availability")}</span>
          </TagInterface>

          <h1 className={`mt-6 text-display text-foreground ${ENTER}`}>
            {t("home.hero.greeting")}
            <br />
            <span lang="es" className="text-accent">
              {t("home.hero.name")}
            </span>
          </h1>

          <p
            className={`mt-4 text-xl font-medium text-pretty text-foreground sm:text-2xl ${ENTER}`}
            style={stagger(60)}
          >
            {t("home.hero.subtitle")}
          </p>

          <p
            className={`mt-4 max-w-xl text-lead text-pretty text-secondary ${ENTER}`}
            style={stagger(120)}
          >
            {t("home.hero.tagline")}
          </p>

          <div
            className={`mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center ${ENTER}`}
            style={stagger(180)}
          >
            <ButtonInterface
              to="/projects"
              size="lg"
              icon={faArrowRight}
              iconPosition="end"
              description={t("common.viewProjects")}
            />
            <ButtonInterface
              variant="outline"
              size="lg"
              href={cvUrl}
              download
              icon={faFileArrowDown}
              description={t("common.downloadCv")}
            />
          </div>

          <a
            href={cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`mt-3 inline-flex min-h-11 items-center gap-2 rounded-lg px-2 text-sm font-medium text-accent underline-offset-4 hover:underline ${ENTER}`}
            style={stagger(240)}
          >
            <FontAwesomeIcon
              icon={faArrowUpRightFromSquare}
              aria-hidden="true"
              className="text-xs"
            />
            {t("home.hero.viewCv")}
            <span className="sr-only"> {t("common.newTab")}</span>
          </a>

          <div
            className={`mt-6 flex items-center gap-1 ${ENTER}`}
            style={stagger(300)}
          >
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={SOCIAL_LINK}
            >
              <FontAwesomeIcon icon={faLinkedin} aria-hidden="true" />
              <span className="sr-only">
                {t("common.linkedin")} {t("common.newTab")}
              </span>
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={SOCIAL_LINK}
            >
              <FontAwesomeIcon icon={faGithub} aria-hidden="true" />
              <span className="sr-only">
                {t("common.github")} {t("common.newTab")}
              </span>
            </a>
          </div>
        </div>

        <div className={`flex justify-center ${ENTER}`} style={stagger(120)}>
          <img
            className="w-1/2 max-w-[220px] sm:max-w-xs lg:w-full lg:max-w-sm"
            src={avatar720}
            srcSet={`${avatar480} 480w, ${avatar720} 720w, ${avatar960} 960w`}
            sizes="(min-width: 1024px) 384px, (min-width: 640px) 320px, 50vw"
            alt={t("home.hero.avatarAlt")}
            width={960}
            height={1011}
            fetchPriority="high"
            decoding="async"
          />
        </div>
      </div>
    </section>
  );
};
