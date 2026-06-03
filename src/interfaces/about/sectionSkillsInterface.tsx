import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faCuttlefish,
  faPython,
  faHtml5,
  faCss3Alt,
  faJava,
  faAngular,
  faNodeJs,
  faSquareJs,
  faReact,
  faDocker,
} from "@fortawesome/free-brands-svg-icons";
import {
  faLaptopCode,
  faDatabase,
  faFire,
  faCube,
} from "@fortawesome/free-solid-svg-icons";
import { Reveal } from "../revealInterface";

type SkillGroup = "frontend" | "languages" | "databases" | "tooling";

const GROUPS: SkillGroup[] = ["frontend", "languages", "databases", "tooling"];

const skills: { text: string; icon: IconProp; group: SkillGroup }[] = [
  // Frontend
  { text: "HTML / HTML5", icon: faHtml5, group: "frontend" },
  { text: "CSS / CSS3", icon: faCss3Alt, group: "frontend" },
  { text: "JavaScript", icon: faSquareJs, group: "frontend" },
  { text: "TypeScript", icon: faSquareJs, group: "frontend" },
  { text: "ReactJS", icon: faReact, group: "frontend" },
  { text: "Angular JS", icon: faAngular, group: "frontend" },
  { text: "Angular Material", icon: faAngular, group: "frontend" },
  { text: "Tailwind CSS", icon: faCss3Alt, group: "frontend" },
  { text: "Node JS", icon: faNodeJs, group: "frontend" },
  // Languages
  { text: "C", icon: faCuttlefish, group: "languages" },
  { text: "C#", icon: faCuttlefish, group: "languages" },
  { text: "C++", icon: faCuttlefish, group: "languages" },
  { text: "Java", icon: faJava, group: "languages" },
  { text: "Python", icon: faPython, group: "languages" },
  { text: "Visual Basic", icon: faLaptopCode, group: "languages" },
  { text: ".NET", icon: faLaptopCode, group: "languages" },
  { text: "ASP.NET", icon: faLaptopCode, group: "languages" },
  // Databases
  { text: "SQL", icon: faDatabase, group: "databases" },
  { text: "MySQL", icon: faDatabase, group: "databases" },
  { text: "MongoDB", icon: faDatabase, group: "databases" },
  { text: "Google Firebase", icon: faFire, group: "databases" },
  // Tooling
  { text: "Docker", icon: faDocker, group: "tooling" },
  { text: "Kubernetes", icon: faCube, group: "tooling" },
];

export const SectionSkillsInterface = () => {
  const { t } = useTranslation();

  return (
    <section className="min-h-screen w-full bg-background flex flex-col items-center justify-center px-4 lg:px-48 py-28 text-white">
      <Reveal className="w-full max-w-5xl">
        <h1 className="text-5xl lg:text-6xl font-semibold text-center mb-3">
          {t("about.skills.title")}
        </h1>
        <p className="text-lg text-secondary text-center mb-12 lg:mb-16">
          {t("about.skills.subtitle")}
        </p>
        <div className="flex flex-col gap-10">
          {GROUPS.map((group) => (
            <div key={group}>
              <h3 className="text-sm font-semibold text-primary uppercase tracking-widest mb-4">
                {t(`about.skills.groups.${group}`)}
              </h3>
              <ul className="flex flex-wrap gap-3">
                {skills
                  .filter((skill) => skill.group === group)
                  .map((skill) => (
                    <li
                      key={skill.text}
                      className="inline-flex items-center gap-2.5 bg-backgroundSecondary rounded-lg px-4 py-2.5 text-sm font-medium transition-transform duration-300 hover:-translate-y-1"
                    >
                      <FontAwesomeIcon
                        icon={skill.icon}
                        className="text-primary text-base"
                        aria-hidden="true"
                      />
                      {skill.text}
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
};
