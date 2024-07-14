import { ContactFormInterface } from "./contactFormInterface";
//import { AlertInterface } from "./alertInterface";

export const SectionContactInterface = () => {
  return (
    <section className="pt-20 h-full w-full bg-background flex flex-col text-center items-center justify-center px-4 lg:px-20 text-white">
      {/* <AlertInterface className="fixed z-30 top-24 lg:right-8 w-11/12 lg:w-fit right-4" /> */}
      <h1 className="text-4xl lg:text-6xl font-medium text-primaryBlue">
        Send me a message!
      </h1>
      <ContactFormInterface className="mt-8" />
    </section>
  );
};
