import React from "react";
import { FooterInterface } from "../interfaces/footerInterface";
import { SectionHomeInterface } from "../interfaces/home/sectionHomeInterface";
import { SectionPresentationInterface } from "../interfaces/home/sectionPresentationInterface";
import { SectionServicesInterface } from "../interfaces/home/sectionServicesInterface";
import { SectionStatsInterface } from "../interfaces/home/sectionStatsInterface";
import { SectionRecentProjectInterface } from "../interfaces/home/sectionRecentProjectInterface";
import { SectionTestimonialsInterface } from "../interfaces/home/sectionTestimonialsInterface";
import { usePageMeta } from "../hooks/usePageMeta";

export const HomeScreen = () => {
  usePageMeta("home");
  return (
    <React.Fragment>
      <SectionHomeInterface />
      <SectionPresentationInterface />
      <SectionServicesInterface />
      <SectionStatsInterface />
      <SectionRecentProjectInterface />
      <SectionTestimonialsInterface />
      <FooterInterface />
    </React.Fragment>
  );
};
