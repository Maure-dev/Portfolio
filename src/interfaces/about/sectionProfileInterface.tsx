import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBullseye,
  faStar,
  faClock,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";
import { Reveal } from "../revealInterface";

export const SectionProfileInterface = () => {
  const { t } = useTranslation();

  const cards = [
    {
      icon: faBullseye,
      label: t("about.profile.objectivesLabel"),
      body: t("about.profile.objectives"),
    },
    {
      icon: faStar,
      label: t("about.profile.aptitudesLabel"),
      body: t("about.profile.aptitudes"),
    },
    {
      icon: faClock,
      label: t("about.profile.availabilityLabel"),
      body: t("about.profile.availability"),
    },
  ];

  return (
    <section className="min-h-screen w-full bg-background flex flex-col items-center justify-center px-4 lg:px-48 py-28 text-white">
      <Reveal className="w-full max-w-5xl">
        <h1 className="text-5xl lg:text-6xl mb-12 lg:mb-16 font-semibold text-center">
          {t("about.profile.title")}
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {cards.map((card) => (
            <div
              key={card.label}
              className="bg-backgroundSecondary rounded-xl p-6 lg:p-8 transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center gap-3 mb-3 text-primary">
                <FontAwesomeIcon
                  icon={card.icon}
                  className="text-2xl"
                  aria-hidden="true"
                />
                <h3 className="text-xl font-semibold text-white">
                  {card.label}
                </h3>
              </div>
              <p className="text-secondary leading-relaxed">{card.body}</p>
            </div>
          ))}
          <div className="bg-backgroundSecondary rounded-xl p-6 lg:p-8 transition-transform duration-300 hover:-translate-y-1">
            <div className="flex items-center gap-3 mb-3 text-primary">
              <FontAwesomeIcon
                icon={faGlobe}
                className="text-2xl"
                aria-hidden="true"
              />
              <h3 className="text-xl font-semibold text-white">
                {t("about.profile.languagesLabel")}
              </h3>
            </div>
            <ul className="space-y-2 text-secondary">
              <li>{t("about.profile.languages.spanish")}</li>
              <li>{t("about.profile.languages.english")}</li>
            </ul>
          </div>
        </div>
      </Reveal>
    </section>
  );
};
