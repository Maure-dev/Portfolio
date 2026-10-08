import { describe, expect, it } from "vitest";
import cvEn from "../../cv/data.en.json";
import cvEs from "../../cv/data.es.json";
import en from "../i18n/locales/en/translation.json";
import es from "../i18n/locales/es/translation.json";

// Drift guard: the CVs in public/ are generated from cv/data.*.json, while the site reads
// translation.json. Both must tell the same story about dates, so this test fails when one
// side is edited without the other (then run `node cv/build-cv.mjs`).

type Dated = { period: string };
type Catalog = {
  about: {
    experiences: { company: string; items: Record<string, Dated> };
    education: { items: Record<string, Dated> };
  };
};

/** "Aug 2021 – Present" (en dash) and "Aug 2021 - Present" (hyphen) are the same period. */
const normalise = (value: string) =>
  value.replace(/[‒–—−-]/g, "-").replace(/\s+/g, " ").trim();

const cases = [
  { lang: "en", cv: cvEn, catalog: en as Catalog },
  { lang: "es", cv: cvEs, catalog: es as Catalog },
];

describe.each(cases)("CV data ($lang) stays in sync with the site", ({ cv, catalog }) => {
  it("uses the employer and role periods from about.experiences", () => {
    const [employer] = cv.experience;
    expect(employer.company).toBe(catalog.about.experiences.company);
    expect(employer.roles.length).toBeGreaterThan(0);
    for (const role of employer.roles) {
      const site = catalog.about.experiences.items[role.id];
      expect(site, `about.experiences.items.${role.id} is missing`).toBeDefined();
      expect(normalise(role.period)).toBe(normalise(site.period));
    }
  });

  it("uses the education periods from about.education", () => {
    expect(cv.education.length).toBeGreaterThan(0);
    for (const entry of cv.education) {
      const site = catalog.about.education.items[entry.id];
      expect(site, `about.education.items.${entry.id} is missing`).toBeDefined();
      expect(normalise(entry.period)).toBe(normalise(site.period));
    }
  });

  it("leaves no bracketed placeholder for the PDF", () => {
    expect(JSON.stringify(cv)).not.toMatch(/\[(confirm|provide|metric|todo|tbd)/i);
  });
});
