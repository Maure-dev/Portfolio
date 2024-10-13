import React from "react";
import { SectionExperiencesInterface } from "../interfaces/about/sectionExperiencesInterfaces";
import { FooterInterface } from "../interfaces/footerInterface";

export const AboutScreen = () => {
  return (
    <React.Fragment>
      <SectionExperiencesInterface />
      <FooterInterface />
    </React.Fragment>
  );
};
