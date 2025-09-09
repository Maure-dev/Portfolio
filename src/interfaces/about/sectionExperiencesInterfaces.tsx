import { CarouselInterface } from "../carouselInterface";

export const SectionExperiencesInterface = () => {
  const Experiences = [
    {
      titleLogo: "Technical Leader",
      title: "Dec 2021 - Jun 2022 | Leafnoise Company S.A.",
      description: "Leader of the COMPR.AR & CONTRAT.AR project belonging to the Office of the Chief of Staff of Ministers and administrators for the National Contracting Office (ONC). Managed the team of developers in .NET, Angular Material, and SQL languages.",
    },
    {
      titleLogo: "SSR Business Analyst",
      title: "Feb 2022 - Aug 2024 | Leafnoise Company S.A.",
      description: "Responsible for analyzing the company's processes with a view to satisfying customer needs. Acting as the link between the customer and the technical team.",
    },
    {
      titleLogo: "SSR Frontend Developer",
      title: "Aug 2021 - Present | Leafnoise Company S.A.",
      description: "Responsible for the platform belonging to the company seeking to meet customer needs, I work from the customer's perspective, interpreting and adapting web development languages to create the final experience for that customer/user.",
    },
    {
      titleLogo: "Full Stack Developer",
      title: "May 2021 - Jun 2022 | Leafnoise Company S.A.",
      description: "Maintenance of the COMPR.AR & CONTRAT.AR project belonging to the Office of the Chief of Staff of Ministers and administrators by the National Contracting Office (ONC). Management of the team of developers in the languages .NET, Angular Material, and SQL.",
    },
  ];

  return (
    <section className="h-screen w-full bg-background px-4 lg:px-48 flex flex-col items-center text-center justify-center relative overflow-hidden">
      <CarouselInterface slides={Experiences} />
    </section>
  );
};
