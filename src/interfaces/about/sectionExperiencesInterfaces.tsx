import { useTranslation } from "react-i18next";
import { Reveal } from "../revealInterface";
import { SectionInterface } from "../sectionInterface";
import { SectionHeadingInterface } from "../sectionHeadingInterface";
import { TagInterface } from "../tagInterface";

const EXPERIENCE_ORDER = [
  "frontendDev",
  "businessAnalyst",
  "techLead",
  "fullStack",
] as const;
const CURRENT_ROLE = "frontendDev";

export const SectionExperiencesInterface = () => {
  const { t } = useTranslation();

  return (
    <SectionInterface id="experience" labelledBy="experience-title">
      <Reveal>
        <SectionHeadingInterface
          id="experience-title"
          title={t("about.experiences.title")}
        />
      </Reveal>

      <div className="mx-auto max-w-3xl">
        <Reveal>
          <div className="mb-8 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
            <p className="text-lg font-semibold text-accent">
              {t("about.experiences.company")}
            </p>
            <p className="text-sm text-muted">
              {t("about.experiences.companyMeta")}
            </p>
          </div>
        </Reveal>

        <ol className="relative ml-1.5 border-l border-border">
          {EXPERIENCE_ORDER.map((id, index) => (
            <li
              key={id}
              className="relative pb-10 pl-8 last:pb-0 sm:pl-10"
            >
              <span
                className="absolute top-1.5 -left-[7px] size-3 rounded-full bg-primary ring-4 ring-background"
                aria-hidden="true"
              />
              <Reveal delayMs={index * 80}>
                <p className="text-sm text-muted">
                  {t(`about.experiences.items.${id}.period`)}
                </p>
                <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-2">
                  <h3 className="text-card-title text-foreground">
                    {t(`about.experiences.items.${id}.role`)}
                  </h3>
                  {id === CURRENT_ROLE && (
                    <TagInterface tone="success">{t("common.current")}</TagInterface>
                  )}
                </div>
                <p className="mt-3 leading-relaxed text-pretty text-secondary">
                  {t(`about.experiences.items.${id}.description`)}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </SectionInterface>
  );
};
