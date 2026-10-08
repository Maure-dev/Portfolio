import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Reveal } from "../revealInterface";
import { SectionInterface } from "../sectionInterface";
import { SectionHeadingInterface } from "../sectionHeadingInterface";
import { TagInterface } from "../tagInterface";

const FACTS = ["years", "stack", "analysis", "languages"] as const;

export const SectionPresentationInterface = () => {
  const { t } = useTranslation();

  return (
    <SectionInterface
      id="about-teaser"
      band="secondary"
      labelledBy="presentation-title"
    >
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <SectionHeadingInterface
            id="presentation-title"
            align="left"
            title={t("home.presentation.title")}
          />
        </Reveal>

        <Reveal delayMs={80}>
          <p className="max-w-prose text-lg leading-relaxed text-pretty text-foreground">
            {t("home.presentation.body")}
          </p>
        </Reveal>

        <Reveal delayMs={160}>
          <ul className="mt-8 flex flex-wrap gap-2">
            {FACTS.map((fact) => (
              <TagInterface key={fact} as="li" tone="neutral" size="md">
                {t(`home.presentation.facts.${fact}`)}
              </TagInterface>
            ))}
          </ul>
        </Reveal>

        <Reveal delayMs={240}>
          <NavLink
            to="/about"
            className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-lg font-semibold text-accent underline-offset-4 hover:underline"
          >
            {t("home.presentation.moreAboutMe")}
            <FontAwesomeIcon
              icon={faArrowRight}
              aria-hidden="true"
              className="text-sm"
            />
          </NavLink>
        </Reveal>
      </div>
    </SectionInterface>
  );
};
