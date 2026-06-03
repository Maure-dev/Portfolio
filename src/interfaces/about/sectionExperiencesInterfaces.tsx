import { useTranslation } from "react-i18next";
import { Reveal } from "../revealInterface";

const EXPERIENCE_ORDER = [
  "frontendDev",
  "businessAnalyst",
  "techLead",
  "fullStack",
] as const;

export const SectionExperiencesInterface = () => {
  const { t } = useTranslation();
  const company = t("about.experiences.company");

  return (
    <section className="min-h-screen w-full bg-background flex flex-col items-center justify-center px-4 lg:px-48 py-28 text-white">
      <Reveal className="w-full max-w-3xl">
        <h1 className="text-5xl lg:text-6xl mb-12 lg:mb-16 font-semibold text-center">
          {t("about.experiences.title")}
        </h1>
        <ol className="relative border-l-2 border-primary/40 ml-2">
          {EXPERIENCE_ORDER.map((id) => (
            <li key={id} className="relative pl-8 lg:pl-12 pb-12 last:pb-0">
              <span
                className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full bg-primary ring-4 ring-background"
                aria-hidden="true"
              />
              <p className="text-sm text-textDark mb-1">
                {t(`about.experiences.items.${id}.period`)}
              </p>
              <h3 className="text-xl lg:text-2xl font-semibold">
                {t(`about.experiences.items.${id}.role`)}
              </h3>
              <p className="text-primary font-medium mb-3">{company}</p>
              <p className="text-secondary leading-relaxed">
                {t(`about.experiences.items.${id}.description`)}
              </p>
            </li>
          ))}
        </ol>
      </Reveal>
    </section>
  );
};
