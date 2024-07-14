import React from "react";
import { FooterInterface } from "../interfaces/footerInterface";
import { SectionProjectsInterface } from "../interfaces/projects/sectionProjectsInterface";

export const ProjectsScreen = () => {
  return (
    <React.Fragment>
      <SectionProjectsInterface />
      <FooterInterface />
    </React.Fragment>
  );
};
