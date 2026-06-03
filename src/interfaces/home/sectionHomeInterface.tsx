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
    <section className="h-full w-full bg-background flex flex-col items-center px-4 lg:px-48 justify-center text-white">
      <h1
        className={`text-5xl lg:text-7xl text-center mb-8 leading-tight lg:leading-tight ${reveal}`}
      >
        {t("home.hero.greeting")} <br /> <b className="text-primary">Mauro</b>
      </h1>
      <p
        className={`text-2xl lg:text-3xl mb-10 text-center ${reveal}`}
        style={{ animationDelay: "0.1s" }}
      >
        {t("home.hero.subtitle")}
      </p>
      <div
        className={`flex items-stretch gap-4 mb-16 ${reveal}`}
        style={{ animationDelay: "0.2s" }}
      >
        <ButtonInterface
          primary
          href={cvUrl}
          download
          icon={faFileArrowDown}
          description={t("common.downloadCv")}
          className="text-lg lg:text-2xl cursor-pointer"
        />
        <a
          href={cvUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t("common.viewCv")}
          title={t("common.viewCv")}
          className="flex aspect-square items-center justify-center rounded-lg border-4 border-primary text-primary text-xl hover:bg-primary hover:text-white transition-colors"
        >
          <FontAwesomeIcon icon={faEye} aria-hidden="true" />
        </a>
      </div>
      <div
        className={`flex w-full items-center justify-center ${reveal}`}
        style={{ animationDelay: "0.3s" }}
      >
        <img
          className="w-2/3 lg:w-1/6"
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
