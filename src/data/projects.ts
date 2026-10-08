import abrilVet1200 from "../assets/sectionProjects/abrilVet-1200.webp";
import abrilVet600 from "../assets/sectionProjects/abrilVet-600.webp";
import carili1200 from "../assets/sectionProjects/carili-1200.webp";
import carili600 from "../assets/sectionProjects/carili-600.webp";
import saasMoorea1200 from "../assets/sectionProjects/saasMoorea-1200.webp";
import saasMoorea600 from "../assets/sectionProjects/saasMoorea-600.webp";
import moorea1200 from "../assets/sectionProjects/moorea-1200.webp";
import moorea600 from "../assets/sectionProjects/moorea-600.webp";
import leafnoise1200 from "../assets/sectionProjects/leafnoise-1200.webp";
import leafnoise600 from "../assets/sectionProjects/leafnoise-600.webp";
import comprar1200 from "../assets/sectionProjects/comprar-1200.webp";
import comprar600 from "../assets/sectionProjects/comprar-600.webp";
import contratar1200 from "../assets/sectionProjects/contratar-1200.webp";
import contratar600 from "../assets/sectionProjects/contratar-600.webp";
import libretas1200 from "../assets/sectionProjects/libretas-1200.webp";
import libretas600 from "../assets/sectionProjects/libretas-600.webp";
import certificados1200 from "../assets/sectionProjects/certificados-1200.webp";
import certificados600 from "../assets/sectionProjects/certificados-600.webp";
import portal1200 from "../assets/sectionProjects/portal-1200.webp";
import portal600 from "../assets/sectionProjects/portal-600.webp";


export type ProjectId =
  | "abrilVet"
  | "carili"
  | "saasMoorea"
  | "moorea"
  | "leafnoise"
  | "comprar"
  | "contratar"
  | "libretas"
  | "certificados"
  | "portal";

export type ProjectCategory = "freelance" | "saas" | "government";

export const PROJECT_CATEGORIES: readonly ProjectCategory[] = [
  "freelance",
  "saas",
  "government",
];

export const PROJECT_FILTERS = ["all", ...PROJECT_CATEGORIES] as const;
export type ProjectFilter = (typeof PROJECT_FILTERS)[number];

export type ProjectImage = {
  src1200: string;
  src600: string;
  width: 1200;
  height: 750;
};

export type Project = {
  id: ProjectId;
  title: string;
  titleLang?: "es";
  urlSite: string;
  repoUrl?: string;
  image: ProjectImage;
  category: ProjectCategory;
  year?: number;
  yearEnd?: number | "present";
  stack: string[];
  featured?: boolean;
};

const image = (src1200: string, src600: string): ProjectImage => ({
  src1200,
  src600,
  width: 1200,
  height: 750,
});

const REACT_STACK = ["React", "TypeScript", "Tailwind CSS"];
const DOTNET_STACK = [".NET", "Angular Material", "SQL"];

export const projects: readonly Project[] = [
  {
    id: "abrilVet",
    title: "Abril Vet",
    urlSite: "https://abril-vet.vercel.app",
    repoUrl: "https://github.com/Maure-dev/Abril-Vet",
    image: image(abrilVet1200, abrilVet600),
    category: "freelance",
    year: 2026,
    stack: [
      "React 19",
      "TypeScript",
      "Vite",
      "Tailwind CSS v4",
      "Firebase",
      "Vercel Functions",
      "Cloudinary",
      "Resend",
    ],
    featured: true,
  },
  {
    id: "carili",
    title: "Carili Design",
    urlSite: "https://carilidesign.vercel.app",
    repoUrl: "https://github.com/Maure-dev/carilidesign",
    image: image(carili1200, carili600),
    category: "freelance",
    year: 2026,
    stack: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS v4",
      "Firebase",
      "Vercel Functions",
      "Mercado Pago",
      "GitHub Actions",
    ],
    featured: true,
  },
  {
    id: "saasMoorea",
    title: "SaaS Moorea.io",
    urlSite: "https://saas.moorea.io/",
    image: image(saasMoorea1200, saasMoorea600),
    category: "saas",
    stack: REACT_STACK,
  },
  {
    id: "moorea",
    title: "Moorea.io",
    urlSite: "https://moorea.io/",
    image: image(moorea1200, moorea600),
    category: "saas",
    stack: REACT_STACK,
  },
  {
    id: "leafnoise",
    title: "Leafnoise",
    urlSite: "https://leafnoise.io/",
    image: image(leafnoise1200, leafnoise600),
    category: "saas",
    stack: REACT_STACK,
  },
  {
    id: "comprar",
    title: "COMPR.AR",
    titleLang: "es",
    urlSite: "https://comprar.gob.ar/",
    image: image(comprar1200, comprar600),
    category: "government",
    year: 2021,
    yearEnd: 2022,
    stack: DOTNET_STACK,
  },
  {
    id: "contratar",
    title: "CONTRAT.AR",
    titleLang: "es",
    urlSite: "https://contratar.gob.ar/",
    image: image(contratar1200, contratar600),
    category: "government",
    year: 2021,
    yearEnd: 2022,
    stack: DOTNET_STACK,
  },
  {
    id: "libretas",
    title: "Libretas AUH",
    titleLang: "es",
    urlSite: "https://www.anses.gob.ar/hijos/libreta-de-asignacion-universal",
    image: image(libretas1200, libretas600),
    category: "government",
    stack: DOTNET_STACK,
  },
  {
    id: "certificados",
    title: "Certificados Escolares",
    titleLang: "es",
    urlSite: "https://www.anses.gob.ar/educacion/ayuda-escolar-anual",
    image: image(certificados1200, certificados600),
    category: "government",
    stack: DOTNET_STACK,
  },
  {
    id: "portal",
    title: "Portal de Trámites",
    titleLang: "es",
    urlSite: "https://www.santafe.gov.ar/tramites",
    image: image(portal1200, portal600),
    category: "government",
    stack: REACT_STACK,
  },
];

export const featuredProjects: readonly Project[] = projects.filter(
  (project) => project.featured
);

export const projectsByFilter = (filter: ProjectFilter): readonly Project[] =>
  filter === "all"
    ? projects
    : projects.filter((project) => project.category === filter);
