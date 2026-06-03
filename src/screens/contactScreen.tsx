import React from "react";
import { SectionContactInterface } from "../interfaces/contact/sectionContactInterface";
import { FooterInterface } from "../interfaces/footerInterface";
import { ContactProvider } from "../containers/contexts/contactContext";
import { usePageMeta } from "../hooks/usePageMeta";

export const ContactScreen = () => {
  usePageMeta("contact");
  return (
    <React.Fragment>
      <ContactProvider>
        <SectionContactInterface />
      </ContactProvider>
      <FooterInterface />
    </React.Fragment>
  );
};
