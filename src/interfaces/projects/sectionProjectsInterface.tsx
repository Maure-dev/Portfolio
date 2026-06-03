import saasMoorea from "../../assets/sectionProjects/saasMoorea.webp";
import moorea from "../../assets/sectionProjects/moorea.webp";
import leafnoise from "../../assets/sectionProjects/leafnoise.webp";
import comprar from "../../assets/sectionProjects/comprar.webp";
import contratar from "../../assets/sectionProjects/contratar.webp";
import libreta from "../../assets/sectionProjects/libreta.webp";
import certificado from "../../assets/sectionProjects/certificado.webp";
import portal from "../../assets/sectionProjects/portal.webp";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import { Reveal } from "../revealInterface";

type ProjectId =
  | "saasMoorea"
  | "moorea"
  | "leafnoise"
  | "comprar"
  | "contratar"
  | "libretas"
  | "certificados"
  | "portal";

type ProjectCategory = "saas" | "government";

type Project = {
  id: ProjectId;
  title: string;
  urlSite: string;
  image: string;
  category: ProjectCategory;
  stack: string[];
};

const REACT_STACK = ["React", "TypeScript", "Tailwind CSS"];
const DOTNET_STACK = [".NET", "Angular Material", "SQL"];

const projects: Project[] = [
  { id: "saasMoorea", title: "SaaS Moorea.io", urlSite: "https://saas.moorea.io/", image: saasMoorea, category: "saas", stack: REACT_STACK },
  { id: "moorea", title: "Moorea.io", urlSite: "https://moorea.io/", image: moorea, category: "saas", stack: REACT_STACK },
  { id: "leafnoise", title: "Leafnoise", urlSite: "https://leafnoise.io/", image: leafnoise, category: "saas", stack: REACT_STACK },
  { id: "comprar", title: "COMPR.AR", urlSite: "https://comprar.gob.ar/", image: comprar, category: "government", stack: DOTNET_STACK },
  { id: "contratar", title: "CONTRAT.AR", urlSite: "https://contratar.gob.ar/", image: contratar, category: "government", stack: DOTNET_STACK },
  { id: "libretas", title: "Libretas AUH", urlSite: "https://www.anses.gob.ar/hijos/libreta-de-asignacion-universal", image: libreta, category: "government", stack: DOTNET_STACK },
  { id: "certificados", title: "Certificados Escolares", urlSite: "https://www.anses.gob.ar/educacion/ayuda-escolar-anual", image: certificado, category: "government", stack: DOTNET_STACK },
  { id: "portal", title: "Portal de Trámites", urlSite: "https://www.santafe.gov.ar/tramites", image: portal, category: "government", stack: REACT_STACK },
];

const FILTERS = ["all", "saas", "government"] as const;
type Filter = (typeof FILTERS)[number];

export const SectionProjectsInterface = () => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<Filter>("all");
  const [selected, setSelected] = useState<Project | null>(null);

  const visible =
    filter === "all"
      ? projects
      : projects.filter((p) => p.category === filter);

  useEffect(() => {
    if (!selected) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selected]);

  return (
    <section className="min-h-screen w-full bg-background flex flex-col items-center justify-center px-4 lg:px-48 py-28 text-white">
      <Reveal className="w-full max-w-6xl flex flex-col items-center">
        <h1 className="text-5xl lg:text-6xl font-semibold text-center mb-3">
          {t("projects.title")}
        </h1>
        <p className="text-lg text-secondary text-center mb-10">
          {t("projects.subtitle")}
        </p>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors cursor-pointer ${
                filter === f
                  ? "bg-primary text-white"
                  : "bg-backgroundSecondary text-secondary hover:text-white"
              }`}
            >
              {t(`projects.filters.${f}`)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full">
          {visible.map((project) => (
            <button
              key={project.id}
              type="button"
              onClick={() => setSelected(project)}
              aria-label={`${project.title} — ${t("projects.viewDetails")}`}
              className="group text-left bg-backgroundSecondary rounded-xl overflow-hidden transition-transform duration-300 hover:-translate-y-2 focus-visible:-translate-y-2 cursor-pointer"
            >
              <div className="aspect-[16/10] overflow-hidden bg-background">
                <img
                  src={project.image}
                  alt={`${project.title} — ${t("common.projectPreviewAlt")}`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h3 className="text-lg font-semibold">{project.title}</h3>
                  <span className="text-xs uppercase tracking-wide text-primary border border-primary/50 rounded-full px-2 py-0.5 shrink-0">
                    {t(`projects.categories.${project.category}`)}
                  </span>
                </div>
                <p className="text-sm text-secondary">
                  {t(`projects.items.${project.id}.subtitle`)}
                </p>
              </div>
            </button>
          ))}
        </div>
      </Reveal>

      {selected && (
        <div
          className="fixed inset-0 z-200 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={selected.title}
          onClick={() => setSelected(null)}
        >
          <div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-backgroundSecondary rounded-2xl text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelected(null)}
              aria-label={t("projects.close")}
              className="absolute top-3 right-3 z-10 h-9 w-9 flex items-center justify-center rounded-full bg-background/80 hover:text-primary cursor-pointer"
            >
              <FontAwesomeIcon icon={faXmark} aria-hidden="true" />
            </button>
            <div className="aspect-[16/9] overflow-hidden bg-background rounded-t-2xl">
              <img
                src={selected.image}
                alt={`${selected.title} — ${t("common.projectPreviewAlt")}`}
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="p-6 lg:p-8">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h2 className="text-2xl font-bold">{selected.title}</h2>
                <span className="text-xs uppercase tracking-wide text-primary border border-primary/50 rounded-full px-2 py-0.5">
                  {t(`projects.categories.${selected.category}`)}
                </span>
              </div>
              <p className="text-primary mb-4">
                {t(`projects.items.${selected.id}.subtitle`)}
              </p>
              <p className="text-secondary leading-relaxed mb-6">
                {t(`projects.items.${selected.id}.description`)}
              </p>
              <p className="text-sm font-semibold mb-2">
                {t("projects.stackLabel")}
              </p>
              <ul className="flex flex-wrap gap-2 mb-8">
                {selected.stack.map((tech) => (
                  <li
                    key={tech}
                    className="text-sm bg-background rounded-full px-3 py-1 text-secondary"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
              <a
                href={selected.urlSite}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary text-white rounded-lg px-6 py-3 font-semibold hover:bg-primary/80 transition-colors"
              >
                <FontAwesomeIcon
                  icon={faArrowUpRightFromSquare}
                  aria-hidden="true"
                />
                {t("projects.visitSite")}
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
