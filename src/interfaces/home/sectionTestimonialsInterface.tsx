import React from 'react';
import armando from '../../assets/sectionTestimonials/armando.jpg';
import tamara from '../../assets/sectionTestimonials/tamara.jpeg';

const testimonials = [
  {
    image: armando,
    name: "Armando Trillo",
    title: "Bachelor of Information Systems",
    testimonial: "Mauro has demonstrated a positive, proactive attitude and strong commitment, adapting to the rapid changes in the project. He has overcome challenges and grown with each new role assigned to him: developer, incident manager, coordination, and training of teammates. He has a special ability as a Business Analyst to understand and describe business operational flows, integrating that knowledge into the code as a developer. He has a very well-rounded profile and has been a great colleague on the C&C Scrum Team.",
  },
  {
    image: tamara,
    name: "Tamara Martínez",
    title: "UX/UI Designer & Freelancer",
    testimonial: "It was a real pleasure working with Mauro, and I hope to work with him again. He is definitely the kind of developer you can trust with a project from start to finish. He has a great ability to understand project requirements and translate them into effective technical solutions. In addition, his attention to detail and commitment to quality are evident in every line of code he writes. He is always willing to collaborate and contribute ideas to improve the final product. I highly recommend Mauro for any web development project.",
  }
];

export const SectionTestimonialsInterface = () => {
  return (
    <section className="w-full bg-background flex flex-col items-center text-center px-4 lg:px-48 justify-center text-white">
      <h1 className="text-5xl lg:text-6xl mb-8 lg:mb-16 font-semibold">
        Testimonials
      </h1>
      <h3 className="text-xl lg:text-3xl mb-16 lg:mb-32">
        People I've worked with have said some nice things...
      </h3>
      <div className="flex flex-col">
        {testimonials.map((testimonial, index) => {
          const isLast = index === testimonials.length - 1;
          return (
            <React.Fragment key={index}>
              <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className='flex lg:flex-col justify-center items-center gap-4 w-full px-8 lg:px-0'>
                  <img className='rounded-full w-16 lg:w-24 w-16 lg:h-24' src={testimonial.image} alt="Profile Image" />
                  <div className='flex flex-col text-left lg:items-center gap-4'>
                    <h1 className='text-xl lg:text-2xl'>{testimonial.name}</h1>
                    <h2 className='text-lg lg:text-xl'>{testimonial.title}</h2>
                  </div>
                </div>
                <p className="text-justify text-sm lg:text-base max-w-150 px-8">{testimonial.testimonial}</p>
              </div>
              {!isLast && <hr className="my-16" />}
            </React.Fragment>
          )
        })}
      </div>
    </section>
  );
};
