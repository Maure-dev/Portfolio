import { describe, expect, it } from "vitest";
import en from "../i18n/locales/en/translation.json";
import es from "../i18n/locales/es/translation.json";
import {
  PROJECT_CATEGORIES,
  PROJECT_FILTERS,
  featuredProjects,
  projects,
  projectsByFilter,
} from "../data/projects";
import { SKILL_GROUPS, SPOKEN_LANGUAGES, skills, skillsByGroup } from "../data/skills";
import { CAREER_START_YEAR, getStats } from "../data/stats";
import { FALLBACK_REPOS, FEATURED_REPOS, REPO_LIMIT, selectRepos } from "../data/github";

type ProjectCopy = {
  subtitle?: string;
  description?: string;
  role?: string;
  roleShort?: string;
  highlights?: unknown;
};

type Catalog = {
  projects: {
    filters: Record<string, string>;
    categories: Record<string, string>;
    items: Record<string, ProjectCopy | undefined>;
  };
  about: { skills: { groups: Record<string, string> } };
  meta: Record<string, { title: string; description: string }>;
};

const lookup = (catalog: unknown, path: string): unknown =>
  path.split(".").reduce<unknown>(
    (node, key) =>
      node && typeof node === "object" ? (node as Record<string, unknown>)[key] : undefined,
    catalog
  );

const cases = [
  { lang: "en", catalog: en as unknown as Catalog },
  { lang: "es", catalog: es as unknown as Catalog },
];

describe.each(cases)("catalog ($lang) covers the data", ({ lang, catalog }) => {
  it("has subtitle, description, role, roleShort and highlights for every project", () => {
    for (const project of projects) {
      const copy = catalog.projects.items[project.id];
      expect(copy, `projects.items.${project.id}`).toBeDefined();
      for (const field of ["subtitle", "description", "role", "roleShort"] as const) {
        expect(copy?.[field], `projects.items.${project.id}.${field}`).toMatch(/\S/);
      }
      expect(Array.isArray(copy?.highlights), `projects.items.${project.id}.highlights`).toBe(
        true
      );
      const highlights = copy?.highlights as unknown[];
      expect(highlights.length).toBeGreaterThanOrEqual(2);
      for (const item of highlights) expect(item).toMatch(/\S/);
    }
  });

  it("labels every filter, category and skill group", () => {
    for (const filter of PROJECT_FILTERS) {
      expect(catalog.projects.filters[filter], `projects.filters.${filter}`).toMatch(/\S/);
    }
    for (const category of PROJECT_CATEGORIES) {
      expect(catalog.projects.categories[category], `projects.categories.${category}`).toMatch(
        /\S/
      );
    }
    for (const group of SKILL_GROUPS) {
      expect(catalog.about.skills.groups[group], `about.skills.groups.${group}`).toMatch(/\S/);
    }
  });

  it("has a curated description for every fallback repository", () => {
    for (const repo of FALLBACK_REPOS) {
      expect(repo.descriptionKey, repo.name).toBeDefined();
      expect(typeof lookup(catalog, repo.descriptionKey as string), repo.name).toBe("string");
    }
  });

  it("ships no placeholders, grades or retired terminology", () => {
    const json = JSON.stringify(catalog);
    expect(json).not.toMatch(/\[(confirm|verify|describe|adjust|todo|tbd|metric)/i);
    expect(json).not.toMatch(/semi-senior/i);
    expect(json).not.toMatch(/Technical Leader/);
    if (lang === "es") expect(json).not.toMatch(/Analista de Negocios/);
  });

  it("keeps meta descriptions within 160 characters", () => {
    for (const [page, meta] of Object.entries(catalog.meta)) {
      expect(meta.description.length, `meta.${page}.description`).toBeLessThanOrEqual(160);
      expect(meta.title, `meta.${page}.title`).toMatch(/Mauro Gerardi/);
    }
  });
});

describe("projects data", () => {
  it("lists the two 2026 products first, flagged as featured", () => {
    expect(projects.slice(0, 2).map((project) => project.id)).toEqual(["abrilVet", "carili"]);
    expect(featuredProjects.map((project) => project.id)).toEqual(["abrilVet", "carili"]);
    for (const project of featuredProjects) {
      expect(project.category).toBe("freelance");
      expect(project.year).toBe(2026);
      expect(project.repoUrl).toMatch(/^https:\/\/github\.com\/Maure-dev\//);
    }
  });

  it("has unique ids, https links and 16:10 images", () => {
    const ids = projects.map((project) => project.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const project of projects) {
      expect(project.urlSite).toMatch(/^https:\/\//);
      expect(project.image.width / project.image.height).toBeCloseTo(1.6);
      expect(project.image.src1200).not.toBe(project.image.src600);
      expect(project.stack.length).toBeGreaterThan(0);
    }
  });

  it("filters by category and 'all' returns everything", () => {
    expect(PROJECT_FILTERS[0]).toBe("all");
    expect(projectsByFilter("all")).toHaveLength(projects.length);
    for (const category of PROJECT_CATEGORIES) {
      const subset = projectsByFilter(category);
      expect(subset.length).toBeGreaterThan(0);
      expect(subset.every((project) => project.category === category)).toBe(true);
    }
  });
});

describe("skills data", () => {
  it("assigns every skill to a known group and every group has skills", () => {
    for (const skill of skills) expect(SKILL_GROUPS).toContain(skill.group);
    for (const group of SKILL_GROUPS) expect(skillsByGroup(group).length).toBeGreaterThan(0);
    expect(new Set(skills.map((skill) => skill.name)).size).toBe(skills.length);
  });
});

describe("stats", () => {
  it("derive from the projects and skills data", () => {
    const byId = Object.fromEntries(getStats(2026).map((stat) => [stat.id, stat]));
    expect(byId.projects.value).toBe(projects.length);
    expect(projects.length).toBe(10);
    expect(byId.technologies.value).toBe(skills.length);
    expect(byId.languages.value).toBe(SPOKEN_LANGUAGES.length);
    expect(byId.experience).toEqual({ id: "experience", value: 2026 - CAREER_START_YEAR, suffix: "+" });
    expect(getStats(2021).find((stat) => stat.id === "experience")?.value).toBe(1);
  });
});

describe("github data", () => {
  it("puts featured repos first, then the rest by push date, dropping forks and foreign urls", () => {
    const raw = [
      {
        name: "Trabajo-DAW",
        html_url: "https://github.com/Maure-dev/Trabajo-DAW",
        pushed_at: "2026-09-01T00:00:00Z",
        stargazers_count: 0,
        forks_count: 0,
      },
      { name: "Portfolio", html_url: "https://github.com/Maure-dev/Portfolio", pushed_at: "2026-01-01T00:00:00Z" },
      { name: "evil", html_url: "javascript:alert(1)", pushed_at: "2026-09-02T00:00:00Z" },
      { name: "elsewhere", html_url: "https://example.com/Maure-dev/x", pushed_at: "2026-09-02T00:00:00Z" },
      { name: "forked", html_url: "https://github.com/Maure-dev/forked", fork: true },
      {
        name: "carilidesign",
        html_url: "https://github.com/Maure-dev/carilidesign",
        pushed_at: "2026-07-01T00:00:00Z",
        homepage: "https://carilidesign.vercel.app",
        stargazers_count: 2,
        forks_count: -1,
        language: "TypeScript",
      },
      { name: "Old", html_url: "https://github.com/Maure-dev/Old", pushed_at: "2025-01-01T00:00:00Z" },
      "junk",
    ];
    const repos = selectRepos(raw);
    expect(repos.map((repo) => repo.name)).toEqual(["carilidesign", "Portfolio", "Trabajo-DAW", "Old"]);
    expect(repos[0]).toMatchObject({
      homepage: "https://carilidesign.vercel.app",
      stars: 2,
      forks: 0,
      language: "TypeScript",
      descriptionKey: "projects.items.carili.subtitle",
    });
    expect(repos[1].descriptionKey).toBe("github.fallback.portfolio");
    expect(repos[2].descriptionKey).toBeUndefined();
    expect(selectRepos("not an array")).toEqual([]);
    expect(selectRepos(raw, 2)).toHaveLength(2);
  });

  it("ships a static fallback for every featured repo with safe links", () => {
    expect(FALLBACK_REPOS.map((repo) => repo.name)).toEqual([...FEATURED_REPOS]);
    expect(FALLBACK_REPOS.length).toBeLessThanOrEqual(REPO_LIMIT);
    for (const repo of FALLBACK_REPOS) {
      expect(repo.htmlUrl).toMatch(/^https:\/\/github\.com\/Maure-dev\//);
      expect(repo.homepage).toMatch(/^https:\/\//);
    }
  });
});
