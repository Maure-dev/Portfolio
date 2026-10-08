import { SectionContactInterface } from "../interfaces/contact/sectionContactInterface";
import { ContactProvider } from "../containers/contexts/contactContext";
import { usePageMeta } from "../hooks/usePageMeta";

export const ContactScreen = () => {
  usePageMeta("contact");
  return (
    <ContactProvider>
      <SectionContactInterface />
    </ContactProvider>
  );
};
