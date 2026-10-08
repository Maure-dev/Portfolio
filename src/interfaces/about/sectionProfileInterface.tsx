import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpRightFromSquare,
  faFileArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import { Reveal } from "../revealInterface";
import { SectionInterface } from "../sectionInterface";
import { SectionHeadingInterface } from "../sectionHeadingInterface";
import { ButtonInterface } from "../buttonInterface";
import { getCvUrl } from "../../constants";

type ProfileFact = {
  id: string;
  label: string;
  values: string[];
  wide?: boolean;
};

export const SectionProfileInterface = () => {
  const { t, i18n } = useTranslation();
  const cvUrl = getCvUrl(i18n.resolvedLanguage);
  const name = t("home.hero.name");

  const facts: ProfileFact[] = [
    {
      id: "location",
      label: t("about.profile.locationLabel"),
      values: [t("about.profile.location")],
    },
    {
      id: "availability",
      label: t("about.profile.availabilityLabel"),
      values: [t("about.profile.availability")],
    },
    {
      id: "languages",
      label: t("about.profile.languagesLabel"),
      values: [
        t("about.profile.languages.spanish"),
        t("about.profile.languages.english"),
      ],
    },
    {
      id: "education",
      label: t("about.profile.educationLabel"),
      values: [t("about.education.items.uner.degree")],
    },
    {
      id: "openTo",
      label: t("about.profile.openToLabel"),
      values: [t("about.profile.openTo")],
    },
    {
      id: "objectives",
      label: t("about.profile.objectivesLabel"),
      values: [t("about.profile.objectives")],
      wide: true,
    },
    {
      id: "aptitudes",
      label: t("about.profile.aptitudesLabel"),
      values: [t("about.profile.aptitudes")],
      wide: true,
    },
  ];

  return (
    <SectionInterface
      id="profile"
      labelledBy="profile-title"
      className="pt-28 lg:pt-36"
    >
      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16">
        <div>
          <Reveal>
            <SectionHeadingInterface
              as="h1"
              id="profile-title"
              align="left"
              eyebrow={name}
              title={t("about.profile.title")}
              subtitle={t("home.hero.subtitle")}
            />
          </Reveal>

          <Reveal delayMs={80}>
            <p className="max-w-prose text-lg leading-relaxed text-pretty text-foreground">
              {t("home.presentation.body")}
            </p>
          </Reveal>

          <Reveal delayMs={160}>
            <dl className="mt-10 grid gap-x-8 gap-y-5 sm:grid-cols-2">
              {facts.map((fact) => (
                <div key={fact.id} className={fact.wide ? "sm:col-span-2" : undefined}>
                  <dt className="text-sm font-medium text-muted">{fact.label}</dt>
                  {fact.values.map((value) => (
                    <dd
                      key={value}
                      className={[
                        "mt-1 text-foreground",
                        fact.wide ? "max-w-prose leading-relaxed text-pretty" : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      {value}
                    </dd>
                  ))}
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delayMs={240}>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ButtonInterface
                href={cvUrl}
                download
                icon={faFileArrowDown}
                description={t("common.downloadCv")}
              />
              <a
                href={cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-lg px-2 text-sm font-medium text-accent underline-offset-4 hover:underline"
              >
                <FontAwesomeIcon
                  icon={faArrowUpRightFromSquare}
                  aria-hidden="true"
                  className="text-xs"
                />
                {t("home.hero.viewCv")}
                <span className="sr-only"> {t("common.newTab")}</span>
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal
          delayMs={120}
          className="order-first flex justify-center lg:order-none lg:justify-end"
        >
          <img
            src="/photo.webp"
            alt={t("common.photoOf", { name })}
            width={205}
            height={205}
            decoding="async"
            className="size-32 rounded-full bg-surface object-cover ring-1 ring-border sm:size-40 lg:size-48"
          />
        </Reveal>
      </div>
    </SectionInterface>
  );
};
