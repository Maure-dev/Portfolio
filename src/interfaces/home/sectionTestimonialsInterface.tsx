import React from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import armando from '../../assets/sectionTestimonials/armando.webp';
import tamara from '../../assets/sectionTestimonials/tamara.webp';
import { Reveal } from '../revealInterface';

const testimonials: { id: "armando" | "tamara"; image: string; linkedin: string }[] = [
  { id: "armando", image: armando, linkedin: "https://www.linkedin.com/in/armandotrillo/" },
  { id: "tamara", image: tamara, linkedin: "https://www.linkedin.com/in/tamara-soledad-martinez-8764b6280/" },
];

export const SectionTestimonialsInterface = () => {
  const { t } = useTranslation();
  return (
    <section className="w-full bg-background flex flex-col items-center text-center px-4 lg:px-48 py-28 justify-center text-white">
      <Reveal className="flex flex-col items-center w-full">
        <h1 className="text-5xl lg:text-6xl mb-8 lg:mb-16 font-semibold">
          {t("home.testimonials.title")}
        </h1>
        <h3 className="text-xl lg:text-3xl mb-16 lg:mb-32">
          {t("home.testimonials.subtitle")}
        </h3>
        <div className="flex flex-col">
          {testimonials.map((testimonial, index) => {
            const isLast = index === testimonials.length - 1;
            const name = t(`home.testimonials.items.${testimonial.id}.name`);
            return (
              <React.Fragment key={testimonial.id}>
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                  <div className='flex lg:flex-col justify-center items-center gap-4 w-full px-8 lg:px-0'>
                    <img className='rounded-full w-16 h-16 lg:w-24 lg:h-24' src={testimonial.image} alt={name} width={96} height={96} loading="lazy" decoding="async" />
                    <div className='flex flex-col text-left lg:items-center gap-2'>
                      <h1 className='text-xl lg:text-2xl'>{name}</h1>
                      <h2 className='text-lg lg:text-xl'>{t(`home.testimonials.items.${testimonial.id}.title`)}</h2>
                      <a
                        href={testimonial.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${name} — LinkedIn`}
                        className="w-fit inline-flex items-center gap-2 mt-1 text-sm font-semibold text-primary border-2 border-primary rounded-full px-4 py-1.5 hover:bg-primary hover:text-white transition-colors duration-300"
                      >
                        <FontAwesomeIcon icon={faLinkedin} aria-hidden="true" />
                        LinkedIn
                      </a>
                    </div>
                  </div>
                  <p className="text-justify text-sm lg:text-base max-w-150 px-8">{t(`home.testimonials.items.${testimonial.id}.quote`)}</p>
                </div>
                {!isLast && <hr className="my-16" />}
              </React.Fragment>
            )
          })}
        </div>
      </Reveal>
    </section>
  );
};
