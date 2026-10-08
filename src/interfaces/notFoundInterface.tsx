import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import HomeAvatar from "../assets/sectionHome/home-avatar-480.webp";
import { ButtonInterface } from "./buttonInterface";
import {
  applyRobots,
  removeLink,
  removeMeta,
  upsertMeta,
} from "../hooks/usePageMeta";

type NotFoundProps = {
  variant?: "notFound" | "error";
};

export const NotFoundInterface = ({ variant = "notFound" }: NotFoundProps) => {
  const { t } = useTranslation();
  const isError = variant === "error";
  const title = isError ? t("errors.title") : t("notFound.title");
  const description = isError
    ? t("errors.description")
    : t("notFound.description");

  useEffect(() => {
    document.title = `${title} — Mauro Gerardi`;
    upsertMeta("name", "description", description);
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
    removeLink("canonical");
    removeMeta("property", "og:url");
    return applyRobots("noindex");
  }, [title, description]);

  return (
    <section className="flex min-h-dvh w-full flex-col items-center justify-center bg-background px-4 pt-24 pb-16 text-center text-foreground sm:px-6">
      <img
        src={HomeAvatar}
        alt=""
        width={480}
        height={505}
        className="mb-6 w-full max-w-[160px]"
      />
      {!isError && (
        <p className="mb-2 text-display text-primary" aria-hidden="true">
          404
        </p>
      )}
      <h1 className="text-title">{title}</h1>
      <p className="mt-4 max-w-xl text-lead text-pretty text-secondary">
        {description}
      </p>
      <div className="mt-8 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center sm:justify-center">
        {isError ? (
          <ButtonInterface href="/" icon={faHouse} description={t("notFound.cta")} />
        ) : (
          <ButtonInterface to="/" icon={faHouse} description={t("notFound.cta")} />
        )}
        {isError ? (
          <ButtonInterface
            href="/projects"
            variant="outline"
            description={t("notFound.ctaProjects")}
          />
        ) : (
          <ButtonInterface
            to="/projects"
            variant="outline"
            description={t("notFound.ctaProjects")}
          />
        )}
      </div>
    </section>
  );
};
