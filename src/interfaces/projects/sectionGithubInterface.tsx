import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faCodeFork,
  faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { Reveal } from "../revealInterface";

const GITHUB_USER = "Maure-dev";

type Repo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
  updated_at: string;
};

export const SectionGithubInterface = () => {
  const { t } = useTranslation();
  const [repos, setRepos] = useState<Repo[]>([]);
  const [state, setState] = useState<"loading" | "done" | "error">("loading");

  useEffect(() => {
    let active = true;
    fetch(
      `https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=100`
    )
      .then((response) =>
        response.ok ? response.json() : Promise.reject(new Error("github"))
      )
      .then((data: Repo[]) => {
        if (!active) return;
        const top = data
          .filter((repo) => !repo.fork)
          .sort(
            (a, b) =>
              b.stargazers_count - a.stargazers_count ||
              Date.parse(b.updated_at) - Date.parse(a.updated_at)
          )
          .slice(0, 6);
        setRepos(top);
        setState("done");
      })
      .catch(() => {
        if (active) setState("error");
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="min-h-screen w-full bg-backgroundSecondary flex flex-col items-center justify-center px-4 lg:px-48 py-28 text-white">
      <Reveal className="w-full max-w-6xl flex flex-col items-center">
        <h1 className="text-5xl lg:text-6xl font-semibold text-center mb-3">
          {t("github.title")}
        </h1>
        <p className="text-lg text-secondary text-center mb-10">
          {t("github.subtitle")}
        </p>

        {state === "error" && (
          <p className="text-secondary mb-10">{t("github.error")}</p>
        )}

        {state === "done" && repos.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full mb-12">
            {repos.map((repo) => (
              <a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-background rounded-xl p-6 flex flex-col gap-3 transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-semibold truncate group-hover:text-primary transition-colors">
                    {repo.name}
                  </span>
                  <FontAwesomeIcon
                    icon={faArrowUpRightFromSquare}
                    className="text-secondary text-sm shrink-0"
                    aria-hidden="true"
                  />
                </div>
                <p className="text-sm text-secondary line-clamp-3 grow">
                  {repo.description ?? ""}
                </p>
                <div className="flex items-center gap-4 text-xs text-textDark">
                  {repo.language && <span>{repo.language}</span>}
                  <span className="flex items-center gap-1">
                    <FontAwesomeIcon icon={faStar} aria-hidden="true" />
                    {repo.stargazers_count}
                  </span>
                  <span className="flex items-center gap-1">
                    <FontAwesomeIcon icon={faCodeFork} aria-hidden="true" />
                    {repo.forks_count}
                  </span>
                </div>
              </a>
            ))}
          </div>
        )}

        <a
          href={`https://github.com/${GITHUB_USER}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 border-2 border-primary text-primary rounded-lg px-6 py-3 font-semibold hover:bg-primary hover:text-white transition-colors duration-300"
        >
          <FontAwesomeIcon icon={faGithub} aria-hidden="true" />
          {t("github.viewProfile")}
        </a>
      </Reveal>
    </section>
  );
};
