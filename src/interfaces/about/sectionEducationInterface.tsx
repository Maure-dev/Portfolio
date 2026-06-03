import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import { Reveal } from "../revealInterface";

const EDUCATION_IDS = ["uner", "technical"] as const;

export const SectionEducationInterface = () => {
  const { t } = useTranslation();

  return (
    <section className="min-h-screen w-full bg-backgroundSecondary flex flex-col items-center justify-center px-4 lg:px-48 py-28 text-white">
      <Reveal className="w-full max-w-4xl">
        <h1 className="text-5xl lg:text-6xl mb-12 lg:mb-16 font-semibold text-center">
          {t("about.education.title")}
        </h1>
        <div className="flex flex-col gap-6">
          {EDUCATION_IDS.map((id, index) => (
            <div
              key={id}
              className="flex gap-5 bg-background rounded-xl p-6 lg:p-8 transition-transform duration-300 hover:-translate-y-1"
            >
              <FontAwesomeIcon
                icon={faGraduationCap}
                className="text-primary text-3xl mt-1 shrink-0"
                aria-hidden="true"
              />
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-xl lg:text-2xl font-semibold">
                    {t(`about.education.items.${id}.degree`)}
                  </h3>
                  {index === 0 && (
                    <span className="text-xs font-semibold uppercase tracking-wide bg-primary text-white rounded-full px-3 py-1">
                      {t("about.education.status")}
                    </span>
                  )}
                </div>
                <p className="text-secondary mt-1">
                  {t(`about.education.items.${id}.institution`)}
                </p>
                <p className="text-textDark mt-1 text-sm">
                  {t(`about.education.items.${id}.period`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
};
