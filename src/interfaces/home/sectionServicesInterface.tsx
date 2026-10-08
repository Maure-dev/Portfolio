import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCode,
  faMagnifyingGlassChart,
  faLayerGroup,
} from "@fortawesome/free-solid-svg-icons";
import { Reveal } from "../revealInterface";
import { SectionInterface } from "../sectionInterface";
import { SectionHeadingInterface } from "../sectionHeadingInterface";
import { CardInterface } from "../cardInterface";

const SERVICES = [
  { id: "frontend", icon: faCode },
  { id: "analysis", icon: faMagnifyingGlassChart },
  { id: "platforms", icon: faLayerGroup },
] as const;

export const SectionServicesInterface = () => {
  const { t } = useTranslation();

  return (
    <SectionInterface id="services" labelledBy="services-title">
      <Reveal>
        <SectionHeadingInterface
          id="services-title"
          title={t("home.services.title")}
        />
      </Reveal>

      <ul className="grid gap-6 md:grid-cols-3">
        {SERVICES.map((service, index) => (
          <li key={service.id}>
            <Reveal delayMs={index * 80} className="h-full">
              <CardInterface className="h-full">
                <span
                  className="inline-flex size-12 items-center justify-center rounded-lg bg-primary/10 text-accent"
                  aria-hidden="true"
                >
                  <FontAwesomeIcon icon={service.icon} className="text-xl" />
                </span>
                <h3 className="mt-5 text-card-title text-foreground">
                  {t(`home.services.items.${service.id}.title`)}
                </h3>
                <p className="mt-2 leading-relaxed text-pretty text-secondary">
                  {t(`home.services.items.${service.id}.description`)}
                </p>
              </CardInterface>
            </Reveal>
          </li>
        ))}
      </ul>
    </SectionInterface>
  );
};
