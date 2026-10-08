import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import armando from "../../assets/sectionTestimonials/armando.webp";
import tamara from "../../assets/sectionTestimonials/tamara.webp";
import { Reveal } from "../revealInterface";
import { SectionInterface } from "../sectionInterface";
import { SectionHeadingInterface } from "../sectionHeadingInterface";
import { CardInterface } from "../cardInterface";

const TESTIMONIALS = [
  {
    id: "armando",
    image: armando,
    linkedin: "https://www.linkedin.com/in/armandotrillo/",
  },
  {
    id: "tamara",
    image: tamara,
    linkedin: "https://www.linkedin.com/in/tamara-soledad-martinez-8764b6280/",
  },
] as const;

const LINKEDIN_LINK =
  "inline-flex size-11 shrink-0 items-center justify-center rounded-lg text-xl text-secondary motion-safe:transition-colors hover:bg-foreground/5 hover:text-foreground";

export const SectionTestimonialsInterface = () => {
  const { t } = useTranslation();

  return (
    <SectionInterface id="testimonials" band="secondary" labelledBy="testimonials-title">
      <Reveal>
        <SectionHeadingInterface
          id="testimonials-title"
          title={t("home.testimonials.title")}
          subtitle={t("home.testimonials.subtitle")}
        />
      </Reveal>

      <ul className="grid gap-6 lg:grid-cols-2">
        {TESTIMONIALS.map((testimonial, index) => {
          const name = t(`home.testimonials.items.${testimonial.id}.name`);
          return (
            <li key={testimonial.id}>
              <Reveal delayMs={index * 80} className="h-full">
                <CardInterface as="figure" className="flex h-full flex-col">
                  <FontAwesomeIcon
                    icon={faQuoteLeft}
                    aria-hidden="true"
                    className="text-2xl text-accent"
                  />
                  <blockquote className="mt-4 mb-6 text-left text-base leading-relaxed text-pretty text-foreground">
                    <p>{t(`home.testimonials.items.${testimonial.id}.quote`)}</p>
                  </blockquote>
                  <figcaption className="mt-auto flex items-center gap-4 border-t border-border pt-5">
                    <img
                      src={testimonial.image}
                      alt=""
                      width={96}
                      height={96}
                      loading="lazy"
                      decoding="async"
                      className="size-12 shrink-0 rounded-full bg-backgroundSecondary"
                    />
                    <div className="min-w-0 flex-1">
                      <span className="block font-semibold text-foreground">
                        {name}
                      </span>
                      <span className="block text-sm text-secondary">
                        {t(`home.testimonials.items.${testimonial.id}.title`)}
                      </span>
                    </div>
                    <a
                      href={testimonial.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={LINKEDIN_LINK}
                    >
                      <FontAwesomeIcon icon={faLinkedin} aria-hidden="true" />
                      <span className="sr-only">
                        {name}: {t("common.linkedin")} {t("common.newTab")}
                      </span>
                    </a>
                  </figcaption>
                </CardInterface>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </SectionInterface>
  );
};
