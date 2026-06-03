import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { ContactFormInterface } from "./contactFormInterface";

const CONTACTS = [
  {
    label: "alegerardi.00@gmail.com",
    href: "mailto:alegerardi.00@gmail.com",
    icon: faEnvelope,
  },
  {
    label: "alegerardi.00@icloud.com",
    href: "mailto:alegerardi.00@icloud.com",
    icon: faEnvelope,
  },
  {
    label: "+54 9 11 3579-3196",
    href: "tel:+5491135793196",
    icon: faPhone,
  },
];

export const SectionContactInterface = () => {
  const { t } = useTranslation();
  return (
    <section className="min-h-screen w-full bg-background flex flex-col text-center items-center justify-center px-4 lg:px-48 py-28 text-white">
      <h1 className="text-4xl lg:text-6xl font-medium mb-8 lg:mb-16">
        {t("contact.heading")}
      </h1>
      <ContactFormInterface />
      <div className="mt-10 flex flex-col items-center gap-3">
        <p className="text-secondary">{t("contact.orEmail")}</p>
        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3">
          {CONTACTS.map((contact) => (
            <a
              key={contact.href}
              href={contact.href}
              className="inline-flex items-center gap-2 bg-backgroundSecondary rounded-lg px-4 py-2 text-sm hover:text-primary transition-colors"
            >
              <FontAwesomeIcon icon={contact.icon} aria-hidden="true" />
              {contact.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
