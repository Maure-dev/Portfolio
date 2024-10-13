import saasMoorea from "../../assets/sectionProjects/saasMoorea.png";
import moorea from "../../assets/sectionProjects/moorea.png";
import leafnoise from "../../assets/sectionProjects/leafnoise.png";
import comprar from "../../assets/sectionProjects/comprar.png";
import contratar from "../../assets/sectionProjects/contratar.png";
import libreta from "../../assets/sectionProjects/libreta.png";
import certificado from "../../assets/sectionProjects/certificado.png";
import portal from "../../assets/sectionProjects/portal.png";
import { useEffect, useState } from "react";

export const SectionProjectsInterface = () => {
  const [index, setIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [projectView, setProjectView] = useState({
    title: "",
    subtitle: "",
    description: "",
    urlSite: "",
    image: "",
  });

  const projects = [
    {
      title: "SaaS Moorea.io",
      subtitle: "Gestiona y automatiza tus procesos",
      description:
        "SaaS es un modelo de distribución de software donde el soporte lógico y los respectivos datos que maneja se alojan en los servidores de un proveedor, cuyo acceso es a través de Internet",
      urlSite: "https://saas.moorea.io/",
      image: saasMoorea,
    },
    {
      title: "Moorea.io",
      subtitle: "Transforma los procesos en experiencias",
      description:
        "Moorea permite extraer, analizar y gestionar información crítica de una variedad de formatos digitales. Transforma la manera en la que entidades interactúan con su vasto conjunto de documentos, garantizando precisión, eficiencia y seguridad en cada paso",
      urlSite: "https://moorea.io/",
      image: moorea,
    },
    {
      title: "Leafnoise",
      subtitle: "Procesos más simples e inteligentes",
      description:
        "Haz que tu proceso de transformación digital sea más simple y exitoso. La digitalización de tu organización está a tu alcance",
      urlSite: "https://leafnoise.io/",
      image: leafnoise,
    },
    {
      title: "COMPR.AR",
      subtitle: "Portal de Contrataciones de Bienes y Servicios",
      description:
        "Es el sistema electrónico de gestión de las compras y contrataciones de la Administración Pública Nacional. A través de la plataforma, las entidades gubernamentales tramitan y publican sus procesos de compra, y los proveedores presentan sus ofertas de forma ágil, transparente y segura",
      urlSite: "https://comprar.gob.ar/",
      image: comprar,
    },
    {
      title: "CONTRAT.AR",
      subtitle: "Portal de Contrataciones y Concesiones de Obra Pública",
      description:
        "Es el sistema electrónico de gestión de las contrataciones del Estado Nacional. A través de la plataforma, las entidades gubernamentales tramitan y publican sus procesos de contratación, y los constructores realizan sus propuestas de forma ágil, transparente y segura",
      urlSite: "https://contratar.gob.ar/",
      image: contratar,
    },
    {
      title: "Libretas AUH",
      subtitle: "Sistema para control de salud, educación y vacunación",
      description:
        "Es un documento que los titulares de la Asignación Universal por Hijo (AUH) deben presentar todos los años para demostrar que sus hijos están cumpliendo con los controles de salud, vacunación y educación",
      urlSite: "https://www.anses.gob.ar/hijos/libreta-de-asignacion-universal",
      image: libreta,
    },
    {
      title: "Certificados Escolares",
      subtitle: "Sistema para control de asistencia al colegio",
      description:
        "Este documento confirma que los niños efectivamente asisten a la escuela, y los padres tienen tiempo de entregarlo hasta el último día hábil del año. Esto permite percibir la ayuda económica por parte del ANSES",
      urlSite: "https://www.anses.gob.ar/educacion/ayuda-escolar-anual",
      image: certificado,
    },
    {
      title: "Portal de Trámites",
      subtitle: "Portal Único de Trámites Digitales para el ciudadano",
      description:
        "Portal de acceso libre (sin necesidad de autenticación), donde el ciudadano puede visualizar todos los trámites disponibles, tanto presenciales como digitales. Cada trámite mostrará información relevante para que el ciudadano pueda comprender cómo realizarlo y en caso de ser online permitirá acceder al mismo",
      urlSite: "https://www.santafe.gov.ar/tramites",
      image: portal,
    },
  ];

  const handleViewProject = (site: string) => {
    window.open(site, "_blank");
  };

  const handlePreviousNextProject = (projectNumber: number) => {
    if (projectNumber >= 0 && projectNumber < projects.length) {
      setIndex(projectNumber);
      handleSetProject(projectNumber);
    }
  };

  const handleSetProject = (projectNumber: number) => {
    setIsFading(true);
    setTimeout(() => {
      setProjectView(projects[projectNumber]);
      setIsFading(false);
    }, 300);
  };

  useEffect(() => {
    setProjectView(projects[0]);
  }, []);

  return (
    <section className="h-full w-full bg-background flex flex-col lg:flex-row items-center px-4 lg:px-48 justify-center lg:justify-between text-white">
      <div
        className={`flex flex-col lg:w-2/5 items-center lg:items-start text-center lg:text-start mb-16 lg:mb-0 transition-opacity duration-300 ${
          isFading ? "opacity-0" : "opacity-100"
        }`}
      >
        <h1 className="text-3xl lg:text-4xl mb-4 font-semibold">
          {projectView.title}
        </h1>
        <h3 className="text-xl mb-8 font-medium">{projectView.subtitle}</h3>
        <p className="mb-8 lg:pr-32">{projectView.description}</p>
        <div className="lg:hidden flex items-center justify-center w-full">
          <i
            className={`fa-solid fa-chevron-left text-3xl ${
              index === 0
                ? "cursor-not-allowed text-textDark"
                : "cursor-pointer"
            }`}
            onClick={() => handlePreviousNextProject(index - 1)}
          />
          <div
            className="w-full bg-[url('src/assets/sectionProjects/macbook.png')] bg-no-repeat bg-center bg-contain p-[15%] pt-[12%] mb-8 cursor-pointer"
            onClick={() => handleViewProject(projectView.urlSite)}
          >
            <img
              src={projectView.image}
              alt="Recent Project - Image"
              className={`max-w-full h-auto transition-opacity duration-300 ${
                isFading ? "opacity-0" : "opacity-100"
              }`}
            />
          </div>
          <i
            className={`fa-solid fa-chevron-right text-3xl ${
              index + 1 === projects.length
                ? "cursor-not-allowed text-textDark"
                : "cursor-pointer"
            }`}
            onClick={() => handlePreviousNextProject(index + 1)}
          />
        </div>
      </div>
      <div className="hidden lg:flex items-center justify-center w-3/5">
        <i
          className={`fa-solid fa-chevron-left text-3xl ${
            index === 0 ? "cursor-not-allowed text-textDark" : "cursor-pointer"
          }`}
          onClick={() => handlePreviousNextProject(index - 1)}
        />
        <div
          className="w-full bg-[url('src/assets/sectionProjects/macbook.png')] bg-no-repeat bg-center bg-contain p-[15%] pt-[12%] cursor-pointer"
          onClick={() => handleViewProject(projectView.urlSite)}
        >
          <img
            src={projectView.image}
            alt="Recent Project - Image"
            className={`max-w-full h-auto transition-opacity duration-300 ${
              isFading ? "opacity-0" : "opacity-100"
            }`}
          />
        </div>
        <i
          className={`fa-solid fa-chevron-right text-3xl ${
            index + 1 === projects.length
              ? "cursor-not-allowed text-textDark"
              : "cursor-pointer"
          }`}
          onClick={() => handlePreviousNextProject(index + 1)}
        />
      </div>
    </section>
  );
};
