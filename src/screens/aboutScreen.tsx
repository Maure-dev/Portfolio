import React from "react";
import { SectionExperiencesInterface } from "../interfaces/about/sectionExperiencesInterfaces";
import { SectionSkillsInterface } from "../interfaces/about/sectionSkillsInterface";
import { FooterInterface } from "../interfaces/footerInterface";

export const AboutScreen = () => {
  return (
    <React.Fragment>
      <SectionExperiencesInterface />
      <SectionSkillsInterface />
      <FooterInterface />
    </React.Fragment>
  );
};
