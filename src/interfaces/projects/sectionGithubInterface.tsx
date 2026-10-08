import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faCodeFork,
  faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FALLBACK_REPOS, fetchRepos } from "../../data/github";
import type { GithubRepo } from "../../data/github";
import { GITHUB_URL } from "../../constants";
import { SectionInterface } from "../sectionInterface";
import { SectionHeadingInterface } from "../sectionHeadingInterface";
import { CardInterface } from "../cardInterface";
import { ButtonInterface } from "../buttonInterface";
import { Reveal } from "../revealInterface";

type Status = "loading" | "live" | "fallback";

const SKELETON_CARDS = [0, 1, 2];
const GRID = "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3";
const META_ITEM = "inline-flex items-center gap-1.5";

const formatMonth = (iso: string, language: string | undefined) =>
  new Intl.DateTimeFormat(language === "es" ? "es-AR" : "en-US", {
    month: "short",
    year: "numeric",
  }).format(new Date(iso));

export const SectionGithubInterface = () => {
  const { t, i18n } = useTranslation();
  const [repos, setRepos] = useState<readonly GithubRepo[]>([]);
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    const controller = new AbortController();
    fetchRepos(controller.signal)
      .then((live) => {
        if (controller.signal.aborted) return;
        setRepos(live);
        setStatus("live");
      })
      .catch(() => {
        if (controller.signal.aborted) return;
        setRepos(FALLBACK_REPOS);
        setStatus("fallback");
      });
    return () => controller.abort();
  }, []);

  return (
    <SectionInterface band="secondary" labelledBy="github-title">
      <Reveal>
        <SectionHeadingInterface
          id="github-title"
          title={t("github.title")}
          subtitle={t("github.subtitle")}
        />
      </Reveal>

      {status === "loading" ? (
        <div role="status" aria-busy="true" aria-live="polite">
          <span className="sr-only">{t("common.loading")}</span>
          <ul className={GRID} aria-hidden="true">
            {SKELETON_CARDS.map((index) => (
              <li key={index}>
                <CardInterface className="min-h-44 motion-safe:animate-pulse">
                  <div className="h-5 w-2/3 rounded bg-foreground/10" />
                  <div className="mt-4 h-3.5 w-full rounded bg-foreground/10" />
                  <div className="mt-2 h-3.5 w-5/6 rounded bg-foreground/10" />
                  <div className="mt-8 h-3 w-1/2 rounded bg-foreground/10" />
                </CardInterface>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <ul className={GRID} aria-labelledby="github-title">
          {repos.map((repo, index) => {
            const description = repo.descriptionKey
              ? t(repo.descriptionKey)
              : repo.description;
            return (
              <li key={repo.htmlUrl} className="flex">
                <Reveal delayMs={Math.min(index, 5) * 60} className="flex w-full">
                  <CardInterface
                    as="article"
                    interactive
                    className="group relative flex w-full flex-col"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="min-w-0 text-card-title text-foreground">
                        <a
                          href={repo.htmlUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="break-words after:absolute after:inset-0 group-hover:text-accent motion-safe:transition-colors"
                        >
                          {repo.name}
                          <span className="sr-only"> {t("common.newTab")}</span>
                        </a>
                      </h3>
                      <FontAwesomeIcon
                        icon={faGithub}
                        aria-hidden="true"
                        className="mt-0.5 shrink-0 text-xl text-secondary"
                      />
                    </div>
                    {description && (
                      <p className="mt-2 text-sm leading-relaxed text-secondary">
                        {description}
                      </p>
                    )}
                    <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 pt-5 text-xs text-muted">
                      {repo.language && (
                        <span className={META_ITEM}>
                          <span
                            className="size-2.5 rounded-full bg-accent"
                            aria-hidden="true"
                          />
                          {repo.language}
                        </span>
                      )}
                      {repo.stars > 0 && (
                        <span className={META_ITEM}>
                          <FontAwesomeIcon icon={faStar} aria-hidden="true" />
                          {repo.stars}
                          <span className="sr-only"> {t("github.stars")}</span>
                        </span>
                      )}
                      {repo.forks > 0 && (
                        <span className={META_ITEM}>
                          <FontAwesomeIcon icon={faCodeFork} aria-hidden="true" />
                          {repo.forks}
                          <span className="sr-only"> {t("github.forks")}</span>
                        </span>
                      )}
                      {repo.pushedAt && (
                        <time dateTime={repo.pushedAt}>
                          {t("github.updated", {
                            date: formatMonth(repo.pushedAt, i18n.resolvedLanguage),
                          })}
                        </time>
                      )}
                      {repo.homepage && (
                        <a
                          href={repo.homepage}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="relative z-10 -my-2 -mr-2 ml-auto inline-flex min-h-11 items-center gap-1.5 rounded-lg px-2 text-sm font-semibold text-accent underline-offset-4 hover:underline"
                        >
                          <FontAwesomeIcon
                            icon={faArrowUpRightFromSquare}
                            aria-hidden="true"
                            className="text-xs"
                          />
                          {t("github.live")}
                          <span className="sr-only"> {t("common.newTab")}</span>
                        </a>
                      )}
                    </div>
                  </CardInterface>
                </Reveal>
              </li>
            );
          })}
        </ul>
      )}

      {status === "fallback" && (
        <p className="mt-6 text-center text-sm text-muted">{t("github.error")}</p>
      )}

      <div className="mt-10 flex justify-center lg:mt-14">
        <ButtonInterface
          href={GITHUB_URL}
          target="_blank"
          variant="outline"
          icon={faGithub}
          description={t("github.viewProfile")}
        />
      </div>
    </SectionInterface>
  );
};
