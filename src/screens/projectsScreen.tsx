import React from "react";
import { FooterInterface } from "../interfaces/footerInterface";
import { SectionProjectsInterface } from "../interfaces/projects/sectionProjectsInterface";
import { SectionGithubInterface } from "../interfaces/projects/sectionGithubInterface";
import { usePageMeta } from "../hooks/usePageMeta";

export const ProjectsScreen = () => {
  usePageMeta("projects");
  return (
    <React.Fragment>
      <SectionProjectsInterface />
      <SectionGithubInterface />
      <FooterInterface />
    </React.Fragment>
  );
};
