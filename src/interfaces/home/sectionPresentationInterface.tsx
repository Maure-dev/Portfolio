import { useTranslation } from "react-i18next";
import { Reveal } from "../revealInterface";

export const SectionPresentationInterface = () => {
  const { t } = useTranslation();
  return (
    <section className="h-full w-full bg-background flex flex-col items-center px-4 lg:px-48 justify-center text-white">
      <Reveal className="flex flex-col items-center w-full">
        <h1 className="text-4xl lg:text-6xl mb-16 text-center">
          {t("home.presentation.title")}
        </h1>
        <div className="flex flex-col justify-center lg:w-3/4">
          <span className="text-secondary mb-0.5 text-xl lg:text-4xl">
            &lt;p&gt;
          </span>
          <p className="border-l-2 border-secondary pl-4 ml-4 lg:ml-8 text-lg lg:text-2xl">
            {t("home.presentation.body")}
          </p>
          <span className="text-secondary mt-2 text-xl lg:text-4xl">
            &lt;/p&gt;
          </span>
        </div>
      </Reveal>
    </section>
  );
};
