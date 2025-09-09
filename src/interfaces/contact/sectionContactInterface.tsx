import { ContactFormInterface } from "./contactFormInterface";

export const SectionContactInterface = () => {
  return (
    <section className="h-full w-full bg-background flex flex-col text-center items-center justify-center px-4 lg:px-48 text-white">
      <h1 className="text-4xl lg:text-6xl font-medium text-primaryBlue mb-8 lg:mb-16">
        Send me a message!
      </h1>
      <ContactFormInterface />
    </section>
  );
};
