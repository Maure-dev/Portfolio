import { describe, it, expect } from "vitest";
import en from "../i18n/locales/en/translation.json";
import es from "../i18n/locales/es/translation.json";
import { normalizeLanguage } from "../i18n/i18n";

type Catalog = { [key: string]: string | Catalog };

const flatten = (obj: Catalog, prefix = ""): Record<string, string> =>
  Object.entries(obj).reduce<Record<string, string>>((acc, [key, value]) => {
    const path = prefix ? `${prefix}.${key}` : key;
    if (typeof value === "string") acc[path] = value;
    else Object.assign(acc, flatten(value, path));
    return acc;
  }, {});

const placeholders = (value: string) =>
  [...value.matchAll(/{{\s*(\w+)\s*}}/g)].map((m) => m[1]).sort();

describe("i18n catalogs", () => {
  const flatEn = flatten(en as Catalog);
  const flatEs = flatten(es as Catalog);

  it("have identical key sets in EN and ES", () => {
    expect(Object.keys(flatEs).sort()).toEqual(Object.keys(flatEn).sort());
  });

  it("have no empty strings", () => {
    for (const [key, value] of Object.entries({ ...flatEn, ...flatEs })) {
      expect(value.trim(), key).not.toBe("");
    }
  });

  it("use the same interpolation variables per key", () => {
    for (const key of Object.keys(flatEn)) {
      expect(placeholders(flatEs[key]), key).toEqual(placeholders(flatEn[key]));
    }
  });
});

describe("normalizeLanguage", () => {
  it("maps stored and browser values to a supported language", () => {
    expect(normalizeLanguage("es")).toBe("es");
    expect(normalizeLanguage("es-AR")).toBe("es");
    expect(normalizeLanguage("EN")).toBe("en");
    expect(normalizeLanguage("en-US")).toBe("en");
    expect(normalizeLanguage("fr")).toBeNull();
    expect(normalizeLanguage(null)).toBeNull();
    expect(normalizeLanguage("")).toBeNull();
  });
});
