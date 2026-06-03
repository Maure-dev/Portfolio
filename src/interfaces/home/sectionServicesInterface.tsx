import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCode,
  faMagnifyingGlassChart,
  faLayerGroup,
} from "@fortawesome/free-solid-svg-icons";
import { Reveal } from "../revealInterface";

const SERVICES = [
  { id: "frontend", icon: faCode },
  { id: "analysis", icon: faMagnifyingGlassChart },
  { id: "platforms", icon: faLayerGroup },
] as const;

export const SectionServicesInterface = () => {
  const { t } = useTranslation();

  return (
    <section className="min-h-screen w-full bg-background flex flex-col items-center justify-center px-4 lg:px-48 py-28 text-white">
      <Reveal className="w-full max-w-5xl flex flex-col items-center">
        <h1 className="text-5xl lg:text-6xl mb-12 lg:mb-16 font-semibold text-center">
          {t("home.services.title")}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className="bg-backgroundSecondary rounded-xl p-8 text-center transition-transform duration-300 hover:-translate-y-2"
            >
              <FontAwesomeIcon
                icon={service.icon}
                className="text-primary text-4xl mb-5"
                aria-hidden="true"
              />
              <h3 className="text-xl font-semibold mb-3">
                {t(`home.services.items.${service.id}.title`)}
              </h3>
              <p className="text-secondary leading-relaxed">
                {t(`home.services.items.${service.id}.description`)}
              </p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
};
