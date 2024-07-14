import React from "react";
import { FooterInterface } from "../interfaces/footerInterface";
import { SectionHomeInterface } from "../interfaces/home/sectionHomeInterface";
import { SectionPresentationInterface } from "../interfaces/home/sectionPresentationInterface";
import { SectionRecentProjectInterface } from "../interfaces/home/sectionRecentProjectInterface";
import { SectionSkillsInterface } from "../interfaces/home/sectionSkillsInterface";
import { SectionTestimonialsInterface } from "../interfaces/home/sectionTestimonialsInterface";

export const HomeScreen = () => {
  return (
    <React.Fragment>
      <SectionHomeInterface />
      <SectionPresentationInterface />
      <SectionSkillsInterface />
      <SectionRecentProjectInterface />
      <SectionTestimonialsInterface />
      <FooterInterface />
    </React.Fragment>
  );
};
