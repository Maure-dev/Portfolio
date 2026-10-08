import { useEffect, useId, useRef, useState } from "react";
import type {
  KeyboardEvent as ReactKeyboardEvent,
  MouseEvent as ReactMouseEvent,
} from "react";
import type { TFunction } from "i18next";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faArrowUpRightFromSquare,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { PROJECT_FILTERS, projects, projectsByFilter } from "../../data/projects";
import type { Project, ProjectFilter, ProjectId } from "../../data/projects";
import { SectionInterface } from "../sectionInterface";
import { SectionHeadingInterface } from "../sectionHeadingInterface";
import { CardInterface } from "../cardInterface";
import { TagInterface } from "../tagInterface";
import { ButtonInterface } from "../buttonInterface";
import { Reveal } from "../revealInterface";

const CARD_SIZES = "(min-width: 1024px) 384px, (min-width: 640px) 50vw, 100vw";
const DIALOG_SIZES = "(min-width: 704px) 672px, 100vw";
const EAGER_IMAGES = 2;

const FILTER_CHIP =
  "inline-flex h-11 cursor-pointer items-center rounded-full border px-4 text-sm font-semibold select-none motion-safe:transition-colors";
const FILTER_ACTIVE = "border-primary bg-primary text-on-primary";
const FILTER_INACTIVE =
  "border-border bg-surface text-secondary hover:border-primary/40 hover:text-foreground";

const SUBHEADING = "mt-6 text-sm font-semibold tracking-widest text-accent uppercase";

const srcSetFor = (project: Project) =>
  `${project.image.src600} 600w, ${project.image.src1200} 1200w`;

const formatYears = (project: Project, t: TFunction): string | null => {
  if (!project.year) return null;
  if (!project.yearEnd) return String(project.year);
  const end = project.yearEnd === "present" ? t("projects.present") : project.yearEnd;
  return `${project.year} – ${end}`;
};

const highlightsFor = (id: ProjectId, t: TFunction): string[] => {
  const raw: unknown = t(`projects.items.${id}.highlights`, { returnObjects: true });
  return Array.isArray(raw)
    ? raw.filter((item): item is string => typeof item === "string")
    : [];
};

export const SectionProjectsInterface = () => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<ProjectFilter>("all");
  const [selected, setSelected] = useState<Project | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const titleId = useId();
  const dialogTitleId = useId();

  const visible = projectsByFilter(filter);

  const openProject = (project: Project, trigger: HTMLElement) => {
    triggerRef.current = trigger;
    setSelected(project);
  };

  const handleClose = () => {
    setSelected(null);
    const trigger = triggerRef.current;
    triggerRef.current = null;
    trigger?.focus();
  };

  const requestClose = () => {
    const dialog = dialogRef.current;
    if (dialog?.open && typeof dialog.close === "function") dialog.close();
    else handleClose();
  };

  const handleBackdropClick = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) requestClose();
  };

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLDialogElement>) => {
    if (event.key !== "Tab") return;
    const focusable = event.currentTarget.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length === 0) return;
    const index = Array.prototype.indexOf.call(focusable, document.activeElement);
    if (event.shiftKey && index <= 0) {
      event.preventDefault();
      focusable[focusable.length - 1].focus();
    } else if (!event.shiftKey && index === focusable.length - 1) {
      event.preventDefault();
      focusable[0].focus();
    }
  };

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (selected) {
      if (dialog.open) return;
      if (typeof dialog.showModal === "function") dialog.showModal();
      else dialog.setAttribute("open", "");
    } else if (dialog.open) {
      if (typeof dialog.close === "function") dialog.close();
      else dialog.removeAttribute("open");
    }
  }, [selected]);

  useEffect(() => {
    if (!selected) return;
    const { documentElement: html, body } = document;
    const previous = { html: html.style.overflow, body: body.style.overflow };
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    return () => {
      html.style.overflow = previous.html;
      body.style.overflow = previous.body;
    };
  }, [selected]);

  const selectedYears = selected ? formatYears(selected, t) : null;
  const selectedHighlights = selected ? highlightsFor(selected.id, t) : [];

  return (
    <SectionInterface labelledBy={titleId}>
      <Reveal>
        <SectionHeadingInterface
          as="h1"
          id={titleId}
          title={t("projects.title")}
          subtitle={t("projects.subtitle")}
        />
      </Reveal>

      <div
        role="group"
        aria-label={t("projects.filterLabel")}
        className="mb-4 flex flex-wrap justify-center gap-2"
      >
        {PROJECT_FILTERS.map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={filter === item}
            onClick={() => setFilter(item)}
            className={`${FILTER_CHIP} ${filter === item ? FILTER_ACTIVE : FILTER_INACTIVE}`}
          >
            {t(`projects.filters.${item}`)}
          </button>
        ))}
      </div>
      <p className="mb-8 text-center text-sm text-muted" aria-live="polite">
        {t("projects.showing", { count: visible.length, total: projects.length })}
      </p>

      <ul
        aria-labelledby={titleId}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {visible.map((project, index) => {
          const cardTitleId = `project-${project.id}-title`;
          const years = formatYears(project, t);
          const role = t(`projects.items.${project.id}.roleShort`);
          return (
            <li key={project.id} className="flex">
              <Reveal delayMs={Math.min(index, 5) * 60} className="flex w-full">
                <CardInterface
                  as="article"
                  interactive
                  className="group relative flex w-full flex-col overflow-hidden p-0"
                >
                  <img
                    src={project.image.src600}
                    srcSet={srcSetFor(project)}
                    sizes={CARD_SIZES}
                    width={project.image.width}
                    height={project.image.height}
                    alt=""
                    loading={index < EAGER_IMAGES ? "eager" : "lazy"}
                    decoding="async"
                    className="aspect-[16/10] w-full border-b border-border object-cover"
                  />
                  <div className="flex grow flex-col p-6">
                    <TagInterface className="w-fit">
                      {t(`projects.categories.${project.category}`)}
                    </TagInterface>
                    <h2
                      id={cardTitleId}
                      lang={project.titleLang}
                      className="mt-3 text-card-title text-foreground"
                    >
                      {project.title}
                    </h2>
                    <p className="mt-1 text-sm leading-relaxed text-secondary">
                      {t(`projects.items.${project.id}.subtitle`)}
                    </p>
                    <p className="mt-2 text-sm text-muted">
                      {years ? `${years} · ${role}` : role}
                    </p>
                    <div className="mt-auto flex items-center justify-between gap-3 pt-4">
                      <button
                        type="button"
                        onClick={(event) => openProject(project, event.currentTarget)}
                        aria-describedby={cardTitleId}
                        className="inline-flex min-h-11 cursor-pointer items-center gap-1.5 rounded-lg text-sm font-semibold text-accent underline-offset-4 after:absolute after:inset-0 hover:underline"
                      >
                        {t("projects.viewDetails")}
                        <FontAwesomeIcon
                          icon={faArrowRight}
                          aria-hidden="true"
                          className="text-xs motion-safe:transition-transform group-hover:translate-x-0.5"
                        />
                      </button>
                      <a
                        href={project.urlSite}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative z-10 -mr-2 inline-flex min-h-11 items-center gap-1.5 rounded-lg px-2 text-sm font-medium text-secondary motion-safe:transition-colors hover:text-foreground"
                      >
                        <FontAwesomeIcon
                          icon={faArrowUpRightFromSquare}
                          aria-hidden="true"
                          className="text-xs"
                        />
                        {t("projects.live")}
                        <span className="sr-only"> {t("common.newTab")}</span>
                      </a>
                    </div>
                  </div>
                </CardInterface>
              </Reveal>
            </li>
          );
        })}
      </ul>

      <dialog
        ref={dialogRef}
        onClose={handleClose}
        onKeyDown={handleKeyDown}
        aria-labelledby={dialogTitleId}
        className="m-0 h-dvh max-h-none w-full max-w-none border-0 bg-transparent p-0 text-foreground backdrop:bg-black/70 backdrop:backdrop-blur-sm"
      >
        {selected && (
          <div
            className="flex h-full touch-none items-end justify-center sm:items-center sm:p-4"
            onClick={handleBackdropClick}
          >
            <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto overscroll-contain rounded-t-2xl border border-border bg-surface shadow-2xl supports-[height:1dvh]:max-h-[90dvh] sm:rounded-2xl">
              <div className="sticky top-0 z-10 h-0">
                <div className="flex justify-end p-3">
                  <button
                    type="button"
                    onClick={requestClose}
                    aria-label={t("projects.close")}
                    className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-border bg-surface/90 text-lg text-foreground backdrop-blur-md motion-safe:transition-colors hover:bg-surface hover:text-accent"
                  >
                    <FontAwesomeIcon icon={faXmark} aria-hidden="true" />
                  </button>
                </div>
              </div>
              <img
                src={selected.image.src1200}
                srcSet={srcSetFor(selected)}
                sizes={DIALOG_SIZES}
                width={selected.image.width}
                height={selected.image.height}
                alt=""
                decoding="async"
                className="aspect-[16/10] w-full border-b border-border object-cover"
              />
              <div className="p-6 sm:p-8">
                <TagInterface>{t(`projects.categories.${selected.category}`)}</TagInterface>
                <h2
                  id={dialogTitleId}
                  lang={selected.titleLang}
                  className="mt-3 text-2xl font-semibold text-balance text-foreground sm:text-3xl"
                >
                  {selected.title}
                </h2>
                <p className="mt-2 text-lead text-pretty text-secondary">
                  {t(`projects.items.${selected.id}.subtitle`)}
                </p>
                <dl className="mt-5 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-[auto_1fr]">
                  <dt className="font-semibold text-foreground">{t("projects.roleLabel")}</dt>
                  <dd className="text-secondary">
                    {t(`projects.items.${selected.id}.role`)}
                  </dd>
                  {selectedYears && (
                    <>
                      <dt className="font-semibold text-foreground">{t("projects.year")}</dt>
                      <dd className="text-secondary">{selectedYears}</dd>
                    </>
                  )}
                </dl>
                <p className="mt-5 leading-relaxed text-pretty text-secondary">
                  {t(`projects.items.${selected.id}.description`)}
                </p>
                {selectedHighlights.length > 0 && (
                  <>
                    <h3 className={SUBHEADING}>{t("projects.highlightsLabel")}</h3>
                    <ul className="mt-3 list-disc space-y-2 pl-5 text-secondary marker:text-accent">
                      {selectedHighlights.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </>
                )}
                <h3 className={SUBHEADING}>{t("projects.stackLabel")}</h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {selected.stack.map((tech) => (
                    <TagInterface key={tech} as="li">
                      {tech}
                    </TagInterface>
                  ))}
                </ul>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <ButtonInterface
                    href={selected.urlSite}
                    target="_blank"
                    icon={faArrowUpRightFromSquare}
                    description={t("projects.visitSite")}
                  />
                  {selected.repoUrl && (
                    <ButtonInterface
                      href={selected.repoUrl}
                      target="_blank"
                      variant="outline"
                      icon={faGithub}
                      description={t("projects.viewCode")}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </SectionInterface>
  );
};
