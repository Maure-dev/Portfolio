import { projects } from "./projects";
import { skills, SPOKEN_LANGUAGES } from "./skills";

export const CAREER_START_YEAR = 2021;

export type StatId = "experience" | "projects" | "technologies" | "languages";

export type Stat = {
  id: StatId;
  value: number;
  suffix: string;
};

export const getStats = (year = new Date().getFullYear()): Stat[] => [
  {
    id: "experience",
    value: Math.max(1, year - CAREER_START_YEAR),
    suffix: "+",
  },
  { id: "projects", value: projects.length, suffix: "" },
  { id: "technologies", value: skills.length, suffix: "" },
  { id: "languages", value: SPOKEN_LANGUAGES.length, suffix: "" },
];
