import saasMoorea from "../../assets/sectionProjects/saasMoorea.png";
import moorea from "../../assets/sectionProjects/moorea.png";
import leafnoise from "../../assets/sectionProjects/leafnoise.png";
import comprar from "../../assets/sectionProjects/comprar.png";
import contratar from "../../assets/sectionProjects/contratar.png";
import libreta from "../../assets/sectionProjects/libreta.png";
import certificado from "../../assets/sectionProjects/certificado.png";
import portal from "../../assets/sectionProjects/portal.png";
import macbook from "../../assets/sectionProjects/macbook.png";
import { useEffect, useState } from "react";

export const SectionProjectsInterface = () => {
  const [index, setIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [projectView, setProjectView] = useState({
    title: null as string | null,
    subtitle: null as string | null,
    description: null as string | null,
    urlSite: null as string | null,
    image: null as string | null,
  });

  const projects = [
    {
      title: "SaaS Moorea.io",
      subtitle: "Manage and automate your processes",
      description:
        "SaaS is a software distribution model where the software and the respective data it handles are hosted on a provider's servers, which are accessed via the Internet.",
      urlSite: "https://saas.moorea.io/",
      image: saasMoorea,
    },
    {
      title: "Moorea.io",
      subtitle: "Transform processes into experiences",
      description:
        "Moorea enables you to extract, analyze, and manage critical information from a variety of digital formats. It transforms the way organizations interact with their vast document collections, ensuring accuracy, efficiency, and security at every step.",
      urlSite: "https://moorea.io/",
      image: moorea,
    },
    {
      title: "Leafnoise",
      subtitle: "Simpler and smarter processes",
      description:
        "Make your digital transformation process simpler and more successful. The digitization of your organization is within your reach.",
      urlSite: "https://leafnoise.io/",
      image: leafnoise,
    },
    {
      title: "COMPR.AR",
      subtitle: "Goods and Services Contracting Portal",
      description:
        "It is the electronic system for managing purchases and contracts for the National Public Administration. Through the platform, government entities process and publish their purchasing processes, and suppliers submit their bids in an agile, transparent, and secure manner.",
      urlSite: "https://comprar.gob.ar/",
      image: comprar,
    },
    {
      title: "CONTRAT.AR",
      subtitle: "Public Works Contracts and Concessions Portal",
      description:
        "It is the electronic system for managing national government contracts. Through the platform, government entities process and publish their contracting processes, and builders submit their bids in a fast, transparent, and secure manner.",
      urlSite: "https://contratar.gob.ar/",
      image: contratar,
    },
    {
      title: "Libretas AUH",
      subtitle: "System for health, education, and vaccination control",
      description:
        "It is a document that recipients of the Universal Child Allowance (AUH) must submit every year to prove that their children are complying with health checks, vaccinations, and education requirements.",
      urlSite: "https://www.anses.gob.ar/hijos/libreta-de-asignacion-universal",
      image: libreta,
    },
    {
      title: "Certificados Escolares",
      subtitle: "School attendance monitoring system",
      description:
        "This document confirms that children are actually attending school, and parents have until the last working day of the year to submit it. This allows them to receive financial assistance from ANSES.",
      urlSite: "https://www.anses.gob.ar/educacion/ayuda-escolar-anual",
      image: certificado,
    },
    {
      title: "Portal de Trámites",
      subtitle: "Single Portal for Digital Procedures for Citizens",
      description:
        "Free access portal (no authentication required) where citizens can view all available procedures, both in person and online. Each procedure will display relevant information so that citizens can understand how to complete it and, if it is online, will allow them to access it.",
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
        className={`flex flex-col lg:w-2/5 items-center lg:items-start text-center lg:text-start mb-16 lg:mb-0 transition-opacity duration-300 ${isFading ? "opacity-0" : "opacity-100"
          }`}
      >
        <h1 className="text-3xl lg:text-4xl mb-4 font-semibold">
          {projectView.title}
        </h1>
        <h3 className="text-xl mb-8 font-medium">{projectView.subtitle}</h3>
        <p className="mb-8 lg:pr-32 text-justify">{projectView.description}</p>
        <div className="lg:hidden flex items-center justify-center w-full">
          <i
            className={`fa-solid fa-chevron-left text-3xl ${index === 0
              ? "cursor-not-allowed text-textDark"
              : "cursor-pointer"
              }`}
            onClick={() => handlePreviousNextProject(index - 1)}
          />
          <div
            className="w-full relative p-[15%] pt-[12%] mb-8"
          >
            <img src={macbook} alt="Macbook - Image" className="absolute z-10 top-[8%] left-0" />
            <img
              src={projectView.image as string}
              alt="Recent Project - Image"
              className={`max-w-full h-auto z-20 cursor-pointer transition-opacity duration-300 ${isFading ? "opacity-0" : "opacity-100"
                }`}
              onClick={() => handleViewProject(projectView.urlSite as string)}
            />
          </div>
          <i
            className={`fa-solid fa-chevron-right text-3xl ${index + 1 === projects.length
              ? "cursor-not-allowed text-textDark"
              : "cursor-pointer"
              }`}
            onClick={() => handlePreviousNextProject(index + 1)}
          />
        </div>
      </div>
      <div className="hidden lg:flex items-center justify-center w-3/5">
        <i
          className={`fa-solid fa-chevron-left text-3xl ${index === 0 ? "cursor-not-allowed text-textDark" : "cursor-pointer"
            }`}
          onClick={() => handlePreviousNextProject(index - 1)}
        />
        <div
          className="w-full p-[15%] pt-[12%] relative"
        >
          <img src={macbook} alt="Macbook - Image" className="absolute z-10 top-[8%] left-0" />
          <img
            src={projectView.image as string}
            alt="Recent Project - Image"
            className={`max-w-full h-auto z-20 cursor-pointer transition-opacity duration-300 ${isFading ? "opacity-0" : "opacity-100"
              }`}
            onClick={() => handleViewProject(projectView.urlSite as string)}
          />
        </div>
        <i
          className={`fa-solid fa-chevron-right text-3xl ${index + 1 === projects.length
            ? "cursor-not-allowed text-textDark"
            : "cursor-pointer"
            }`}
          onClick={() => handlePreviousNextProject(index + 1)}
        />
      </div>
    </section>
  );
};
