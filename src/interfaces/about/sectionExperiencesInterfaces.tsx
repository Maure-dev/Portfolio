import { CarouselInterface } from "../carouselInterface";

export const SectionExperiencesInterface = () => {
  const Experiences = [
    {
      titleLogo: "SectionTestimonialsTitleLogoOne",
      title: "SectionTestimonialsTitleOne",
      description: "SectionTestimonialsDescriptionOne",
    },
    {
      titleLogo: "SectionTestimonialTitleLogoTwo",
      title: "SectionTestimonialsTitleTwo",
      description: "SectionTestimonialsDescriptionTwo",
    },
    {
      titleLogo: "SectionTestimonialsTitleLogoThree",
      title: "SectionTestimonialsTitleThree",
      description: "SectionTestimonialsDescriptionThree",
    },
    {
      titleLogo: "SectionTestimonialsTitleLogoFour",
      title: "SectionTestimonialsTitleFour",
      description: "SectionTestimonialsDescriptionFour",
    },
  ];

  return (
    <section className="h-screen w-full bg-background px-4 lg:px-48 flex flex-col items-center text-center justify-center relative overflow-hidden">
      <CarouselInterface slides={Experiences} />
    </section>
  );
};
