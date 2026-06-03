import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ButtonInterface } from "./buttonInterface";

export const NotFoundInterface = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = `${t("notFound.title")} — Mauro Gerardi`;
  }, [t]);

  return (
    <section className="h-screen w-full bg-background flex flex-col items-center justify-center text-center px-4 text-white">
      <p className="text-primary text-7xl lg:text-9xl font-bold mb-4">404</p>
      <h1 className="text-3xl lg:text-5xl font-semibold mb-4">
        {t("notFound.title")}
      </h1>
      <p className="text-lg lg:text-xl text-secondary mb-10 max-w-xl">
        {t("notFound.description")}
      </p>
      <ButtonInterface
        primary
        type="button"
        onClick={() => navigate("/")}
        description={t("notFound.cta")}
        className="w-fit cursor-pointer"
      />
    </section>
  );
};
