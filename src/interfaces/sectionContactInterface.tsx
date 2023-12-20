import { ContactFormInterface } from "./contactFormInterface";
//import { AlertInterface } from "./alertInterface";

export const SectionContactInterface = () => {
  return (
    <section className="pt-20 h-screen w-full bg-primaryLightBlue flex flex-col text-center items-center justify-center px-4 lg:px-20">
      {/* <AlertInterface className="fixed z-30 top-24 lg:right-8 w-11/12 lg:w-fit right-4" /> */}
      <h1 className="text-4xl lg:text-7xl font-semibold text-primaryBlue">
        Send me a message!
      </h1>
      <ContactFormInterface className="mt-8" />
    </section>
  );
};
