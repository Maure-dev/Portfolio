import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileArrowDown, faEye } from "@fortawesome/free-solid-svg-icons";
import HomeAvatar from "../../assets/sectionHome/home-avatar.webp";
import { ButtonInterface } from "../buttonInterface";
import { getCvUrl } from "../../constants";

// CSS entrance animation, only applied when motion is allowed (motion-safe).
const reveal = "motion-safe:animate-[fade-up_0.6s_ease-out_both]";

export const SectionHomeInterface = () => {
  const { t, i18n } = useTranslation();
  const cvUrl = getCvUrl(i18n.resolvedLanguage);

  return (
    // min-h-dvh (never a fixed height) + pt-24 keeps the h1 clear of the fixed
    // header on every viewport; the section grows when the content is taller.
    <section className="flex min-h-dvh w-full flex-col items-center justify-center bg-background px-4 pt-24 pb-16 text-foreground sm:px-6 lg:px-8">
      <h1
        className={`mb-8 text-center text-4xl leading-tight text-balance sm:text-5xl lg:text-7xl lg:leading-tight ${reveal}`}
      >
        {t("home.hero.greeting")} <br /> <b className="text-primary">Mauro</b>
      </h1>
      <p
        className={`mb-10 text-center text-xl text-balance sm:text-2xl lg:text-3xl ${reveal}`}
        style={{ animationDelay: "0.1s" }}
      >
        {t("home.hero.subtitle")}
      </p>
      <div
        className={`mb-16 flex items-stretch gap-4 ${reveal}`}
        style={{ animationDelay: "0.2s" }}
      >
        <ButtonInterface
          href={cvUrl}
          download
          size="lg"
          icon={faFileArrowDown}
          description={t("common.downloadCv")}
        />
        <a
          href={cvUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t("common.viewCv")}
          title={t("common.viewCv")}
          className="flex aspect-square items-center justify-center rounded-lg border-2 border-accent text-xl text-accent motion-safe:transition-colors hover:border-primary hover:bg-primary hover:text-on-primary"
        >
          <FontAwesomeIcon icon={faEye} aria-hidden="true" />
          <span className="sr-only"> {t("common.newTab")}</span>
        </a>
      </div>
      <div
        className={`flex w-full items-center justify-center ${reveal}`}
        style={{ animationDelay: "0.3s" }}
      >
        <img
          className="w-1/2 max-w-[220px] sm:max-w-xs lg:w-1/6 lg:max-w-none"
          src={HomeAvatar}
          alt={t("home.hero.avatarAlt")}
          width={1344}
          height={1415}
          fetchPriority="high"
          decoding="async"
        />
      </div>
    </section>
  );
};
