import React from "react";
import { SectionContactInterface } from "../interfaces/contact/sectionContactInterface";
import { FooterInterface } from "../interfaces/footerInterface";
import { ContactProvider } from "../containers/contexts/contactContext";

export const ContactScreen = () => {
  return (
    <React.Fragment>
      <ContactProvider>
        <SectionContactInterface />
      </ContactProvider>
      <FooterInterface />
    </React.Fragment>
  );
};
