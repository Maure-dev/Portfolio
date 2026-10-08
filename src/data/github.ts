import { GITHUB_URL } from "../constants";

export const GITHUB_USER = "Maure-dev";

export const FEATURED_REPOS = ["Abril-Vet", "carilidesign", "Portfolio"] as const;
export type FeaturedRepoName = (typeof FEATURED_REPOS)[number];

export type RepoDescriptionKey =
  | "projects.items.abrilVet.subtitle"
  | "projects.items.carili.subtitle"
  | "github.fallback.portfolio";

export type GithubRepo = {
  name: string;
  description: string | null;
  descriptionKey?: RepoDescriptionKey;
  htmlUrl: string;
  homepage: string | null;
  language: string | null;
  stars: number;
  forks: number;
  pushedAt: string | null;
};

const FEATURED_DESCRIPTIONS: Record<FeaturedRepoName, RepoDescriptionKey> = {
  "Abril-Vet": "projects.items.abrilVet.subtitle",
  carilidesign: "projects.items.carili.subtitle",
  Portfolio: "github.fallback.portfolio",
};

export const FALLBACK_REPOS: readonly GithubRepo[] = [
  {
    name: "Abril-Vet",
    description: null,
    descriptionKey: "projects.items.abrilVet.subtitle",
    htmlUrl: `${GITHUB_URL}/Abril-Vet`,
    homepage: "https://abril-vet.vercel.app",
    language: "TypeScript",
    stars: 0,
    forks: 0,
    pushedAt: null,
  },
  {
    name: "carilidesign",
    description: null,
    descriptionKey: "projects.items.carili.subtitle",
    htmlUrl: `${GITHUB_URL}/carilidesign`,
    homepage: "https://carilidesign.vercel.app",
    language: "TypeScript",
    stars: 0,
    forks: 0,
    pushedAt: null,
  },
  {
    name: "Portfolio",
    description: null,
    descriptionKey: "github.fallback.portfolio",
    htmlUrl: `${GITHUB_URL}/Portfolio`,
    homepage: "https://maure-dev.vercel.app",
    language: "TypeScript",
    stars: 0,
    forks: 0,
    pushedAt: null,
  },
];

export const REPO_LIMIT = 6;
const API_URL = `https://api.github.com/users/${GITHUB_USER}/repos?sort=pushed&per_page=30`;
const TIMEOUT_MS = 8_000;
const CACHE_KEY = "gh-repos-v1";
const CACHE_TTL_MS = 3_600_000;

const GITHUB_REPO_PREFIX = `${GITHUB_URL}/`;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const isHttpsUrl = (value: unknown): value is string =>
  typeof value === "string" && /^https:\/\/[^\s"'<>]+$/.test(value);

const isRepoUrl = (value: unknown): value is string =>
  isHttpsUrl(value) && value.startsWith(GITHUB_REPO_PREFIX);

const asCount = (value: unknown): number =>
  typeof value === "number" && Number.isFinite(value) && value > 0
    ? Math.floor(value)
    : 0;

const asText = (value: unknown): string | null =>
  typeof value === "string" && value.trim() ? value.trim() : null;

const isFeatured = (name: string): name is FeaturedRepoName =>
  (FEATURED_REPOS as readonly string[]).includes(name);

const toRepo = (raw: unknown): GithubRepo | null => {
  if (!isRecord(raw)) return null;
  if (raw.fork === true || raw.archived === true) return null;
  const name = asText(raw.name);
  if (!name || !isRepoUrl(raw.html_url)) return null;
  const pushedAt =
    typeof raw.pushed_at === "string" && !Number.isNaN(Date.parse(raw.pushed_at))
      ? raw.pushed_at
      : null;
  return {
    name,
    description: asText(raw.description),
    descriptionKey: isFeatured(name) ? FEATURED_DESCRIPTIONS[name] : undefined,
    htmlUrl: raw.html_url,
    homepage: isHttpsUrl(raw.homepage) ? raw.homepage : null,
    language: asText(raw.language),
    stars: asCount(raw.stargazers_count),
    forks: asCount(raw.forks_count),
    pushedAt,
  };
};

const featuredRank = (name: string): number => {
  const index = (FEATURED_REPOS as readonly string[]).indexOf(name);
  return index === -1 ? FEATURED_REPOS.length : index;
};

export const selectRepos = (raw: unknown, limit = REPO_LIMIT): GithubRepo[] => {
  if (!Array.isArray(raw)) return [];
  const repos = raw.map(toRepo).filter((repo): repo is GithubRepo => repo !== null);
  return repos
    .sort(
      (a, b) =>
        featuredRank(a.name) - featuredRank(b.name) ||
        (b.pushedAt ? Date.parse(b.pushedAt) : 0) -
          (a.pushedAt ? Date.parse(a.pushedAt) : 0)
    )
    .slice(0, limit);
};

const readCache = (): GithubRepo[] | null => {
  try {
    const cached = JSON.parse(sessionStorage.getItem(CACHE_KEY) ?? "null") as {
      at?: unknown;
      repos?: unknown;
    } | null;
    if (!cached || typeof cached.at !== "number") return null;
    if (Date.now() - cached.at > CACHE_TTL_MS) return null;
    if (!Array.isArray(cached.repos) || cached.repos.length === 0) return null;
    const valid = cached.repos.every(
      (repo) => isRecord(repo) && isRepoUrl(repo.htmlUrl) && typeof repo.name === "string"
    );
    return valid ? (cached.repos as GithubRepo[]) : null;
  } catch {
    return null;
  }
};

const writeCache = (repos: GithubRepo[]): boolean => {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), repos }));
    return true;
  } catch {
    return false;
  }
};

export const fetchRepos = async (signal?: AbortSignal): Promise<GithubRepo[]> => {
  const cached = readCache();
  if (cached) return cached;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  const abort = () => controller.abort();
  signal?.addEventListener("abort", abort, { once: true });

  try {
    const response = await fetch(API_URL, {
      headers: { Accept: "application/vnd.github+json" },
      signal: controller.signal,
    });
    if (!response.ok) throw new Error(`GitHub API responded ${response.status}`);
    const repos = selectRepos(await response.json());
    if (repos.length === 0) throw new Error("GitHub API returned no usable repositories");
    writeCache(repos);
    return repos;
  } finally {
    clearTimeout(timer);
    signal?.removeEventListener("abort", abort);
  }
};
