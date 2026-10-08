import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { SectionInterface } from "../sectionInterface";
import { SectionHeadingInterface } from "../sectionHeadingInterface";
import { ContactFormInterface } from "./contactFormInterface";
import { EMAIL, LINKEDIN_URL } from "../../constants";

const PHONE_DISPLAY = "+54 9 11 3579-3196";
const PHONE_HREF = "tel:+5491135793196";

const CHIP =
  "inline-flex min-h-11 items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2.5 text-sm font-medium text-foreground motion-safe:transition-colors hover:border-primary/40 hover:text-accent";

export const SectionContactInterface = () => {
  const { t } = useTranslation();
  return (
    <SectionInterface
      id="contact"
      labelledBy="contact-title"
      className="pt-28 lg:pt-36"
    >
      <SectionHeadingInterface
        as="h1"
        id="contact-title"
        title={t("contact.heading")}
      />
      <ContactFormInterface />
      <div className="mt-14 flex flex-col items-center gap-4 text-center">
        <p className="text-secondary">{t("contact.orEmail")}</p>
        <ul className="flex flex-wrap items-center justify-center gap-3">
          <li>
            <a href={`mailto:${EMAIL}`} className={CHIP}>
              <FontAwesomeIcon icon={faEnvelope} aria-hidden="true" />
              {EMAIL}
            </a>
          </li>
          <li>
            <a href={PHONE_HREF} className={CHIP}>
              <FontAwesomeIcon icon={faPhone} aria-hidden="true" />
              {PHONE_DISPLAY}
            </a>
          </li>
          <li>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={CHIP}
            >
              <FontAwesomeIcon icon={faLinkedin} aria-hidden="true" />
              {t("contact.linkedin")}
              <span className="sr-only"> {t("common.newTab")}</span>
            </a>
          </li>
        </ul>
      </div>
    </SectionInterface>
  );
};
