import React from "react";
import { SectionProfileInterface } from "../interfaces/about/sectionProfileInterface";
import { SectionExperiencesInterface } from "../interfaces/about/sectionExperiencesInterfaces";
import { SectionEducationInterface } from "../interfaces/about/sectionEducationInterface";
import { SectionSkillsInterface } from "../interfaces/about/sectionSkillsInterface";
import { FooterInterface } from "../interfaces/footerInterface";
import { usePageMeta } from "../hooks/usePageMeta";

export const AboutScreen = () => {
  usePageMeta("about");
  return (
    <React.Fragment>
      <SectionProfileInterface />
      <SectionExperiencesInterface />
      <SectionEducationInterface />
      <SectionSkillsInterface />
      <FooterInterface />
    </React.Fragment>
  );
};
