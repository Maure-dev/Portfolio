export type SkillGroupId =
  | "frontend"
  | "backend"
  | "languages"
  | "databases"
  | "tooling";

export const SKILL_GROUPS: readonly SkillGroupId[] = [
  "frontend",
  "backend",
  "languages",
  "databases",
  "tooling",
];

export type Skill = {
  name: string;
  group: SkillGroupId;
};

export const skills: readonly Skill[] = [
  { name: "HTML5", group: "frontend" },
  { name: "CSS3", group: "frontend" },
  { name: "React", group: "frontend" },
  { name: "React Router", group: "frontend" },
  { name: "Angular", group: "frontend" },
  { name: "Angular Material", group: "frontend" },
  { name: "Tailwind CSS", group: "frontend" },
  { name: "i18next", group: "frontend" },
  { name: "Vite", group: "frontend" },
  { name: "Node.js", group: "backend" },
  { name: ".NET / ASP.NET", group: "backend" },
  { name: "REST APIs", group: "backend" },
  { name: "Firebase (Auth, Firestore, Security Rules)", group: "backend" },
  { name: "Vercel Functions", group: "backend" },
  { name: "Cloudinary", group: "backend" },
  { name: "Mercado Pago API", group: "backend" },
  { name: "Resend", group: "backend" },
  { name: "TypeScript", group: "languages" },
  { name: "JavaScript", group: "languages" },
  { name: "C#", group: "languages" },
  { name: "Java", group: "languages" },
  { name: "Python", group: "languages" },
  { name: "SQL", group: "databases" },
  { name: "MySQL", group: "databases" },
  { name: "MongoDB", group: "databases" },
  { name: "Firestore", group: "databases" },
  { name: "Git & GitHub", group: "tooling" },
  { name: "GitHub Actions (CI)", group: "tooling" },
  { name: "Vitest + Testing Library", group: "tooling" },
  { name: "ESLint", group: "tooling" },
  { name: "Lighthouse / axe", group: "tooling" },
  { name: "Scrum (BA / PO)", group: "tooling" },
  { name: "Docker", group: "tooling" },
  { name: "Kubernetes", group: "tooling" },
];

export const skillsByGroup = (group: SkillGroupId): readonly Skill[] =>
  skills.filter((skill) => skill.group === group);

export const SPOKEN_LANGUAGES = ["es", "en"] as const;
