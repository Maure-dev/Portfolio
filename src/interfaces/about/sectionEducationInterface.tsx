import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import { Reveal } from "../revealInterface";
import { SectionInterface } from "../sectionInterface";
import { SectionHeadingInterface } from "../sectionHeadingInterface";
import { CardInterface } from "../cardInterface";
import { TagInterface } from "../tagInterface";

const EDUCATION = [
  { id: "uner", graduate: true, lang: undefined },
  { id: "technical", graduate: false, lang: "es" },
] as const;

export const SectionEducationInterface = () => {
  const { t } = useTranslation();

  return (
    <SectionInterface
      id="education"
      band="secondary"
      labelledBy="education-title"
    >
      <Reveal>
        <SectionHeadingInterface
          id="education-title"
          title={t("about.education.title")}
        />
      </Reveal>

      <ul className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
        {EDUCATION.map((entry, index) => (
          <li key={entry.id}>
            <Reveal delayMs={index * 80} className="h-full">
              <CardInterface className="flex h-full gap-4">
                <span
                  className="inline-flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-accent"
                  aria-hidden="true"
                >
                  <FontAwesomeIcon icon={faGraduationCap} className="text-xl" />
                </span>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    <h3 className="text-card-title text-foreground">
                      {t(`about.education.items.${entry.id}.degree`)}
                    </h3>
                    {entry.graduate && (
                      <TagInterface tone="success">
                        {t("about.education.status")}
                      </TagInterface>
                    )}
                  </div>
                  <p className="mt-2 text-secondary" lang={entry.lang}>
                    {t(`about.education.items.${entry.id}.institution`)}
                  </p>
                  <p className="mt-1 text-sm text-muted">
                    {t(`about.education.items.${entry.id}.period`)}
                  </p>
                </div>
              </CardInterface>
            </Reveal>
          </li>
        ))}
      </ul>
    </SectionInterface>
  );
};
