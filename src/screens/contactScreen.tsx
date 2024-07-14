import React from "react";
import { SectionContactInterface } from "../interfaces/contact/sectionContactInterface";
import { FooterInterface } from "../interfaces/footerInterface";

export const ContactScreen = () => {
  return (
    <React.Fragment>
      <SectionContactInterface />
      <FooterInterface />
    </React.Fragment>
  );
};
