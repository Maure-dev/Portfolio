import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { featuredProjects } from "../../data/projects";
import { SectionInterface } from "../sectionInterface";
import { CardInterface } from "../cardInterface";
import { TagInterface } from "../tagInterface";
import { ButtonInterface } from "../buttonInterface";
import { Reveal } from "../revealInterface";

const IMAGE_SIZES = "(min-width: 1024px) 528px, 100vw";
const STACK_CHIPS = 4;

export const SectionLatestProjectsInterface = () => {
  const { t } = useTranslation();

  return (
    <SectionInterface labelledBy="latest-projects-title">
      <Reveal>
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between lg:mb-14">
          <div>
            <h2 id="latest-projects-title" className="text-title text-foreground">
              {t("home.latestProjects.title")}
            </h2>
            <p className="mt-4 max-w-2xl text-lead text-pretty text-secondary">
              {t("home.latestProjects.subtitle")}
            </p>
          </div>
          <NavLink
            to="/projects"
            className="-mx-2 inline-flex min-h-11 shrink-0 items-center gap-2 rounded-lg px-2 text-base font-semibold text-accent underline-offset-4 hover:underline sm:mb-1"
          >
            {t("home.latestProjects.viewAll")}
            <FontAwesomeIcon icon={faArrowRight} aria-hidden="true" className="text-sm" />
          </NavLink>
        </div>
      </Reveal>

      <ul className="grid gap-8 lg:grid-cols-2">
        {featuredProjects.map((project, index) => (
          <li key={project.id} className="flex">
            <Reveal delayMs={index * 120} className="flex w-full">
              <CardInterface
                as="article"
                interactive
                className="flex w-full flex-col overflow-hidden p-0"
              >
                <img
                  src={project.image.src600}
                  srcSet={`${project.image.src600} 600w, ${project.image.src1200} 1200w`}
                  sizes={IMAGE_SIZES}
                  width={project.image.width}
                  height={project.image.height}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="aspect-[16/10] w-full border-b border-border object-cover"
                />
                <div className="flex grow flex-col p-6">
                  <h3 lang={project.titleLang} className="text-card-title text-foreground">
                    {project.title}
                  </h3>
                  <p className="mt-1 leading-relaxed text-secondary">
                    {t(`projects.items.${project.id}.subtitle`)}
                  </p>
                  <ul
                    className="mt-4 flex flex-wrap gap-2"
                    aria-label={t("projects.stackLabel")}
                  >
                    {project.stack.slice(0, STACK_CHIPS).map((tech) => (
                      <TagInterface key={tech} as="li">
                        {tech}
                      </TagInterface>
                    ))}
                  </ul>
                  <div className="mt-auto flex flex-col gap-3 pt-6 sm:flex-row">
                    <ButtonInterface
                      href={project.urlSite}
                      target="_blank"
                      icon={faArrowUpRightFromSquare}
                      description={t("common.liveSite")}
                    />
                    {project.repoUrl && (
                      <ButtonInterface
                        href={project.repoUrl}
                        target="_blank"
                        variant="outline"
                        icon={faGithub}
                        description={t("common.viewCode")}
                      />
                    )}
                  </div>
                </div>
              </CardInterface>
            </Reveal>
          </li>
        ))}
      </ul>
    </SectionInterface>
  );
};
