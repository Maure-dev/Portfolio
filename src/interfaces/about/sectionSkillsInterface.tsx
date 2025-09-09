import { useEffect, useRef } from "react";

export const SectionSkillsInterface = () => {
  const skills = [
    { text: "C", icon: "fab fa-cuttlefish" },
    { text: "C#", icon: "fab fa-cuttlefish" },
    { text: "C++", icon: "fab fa-cuttlefish" },
    { text: "Python", icon: "fab fa-python" },
    { text: "HTML / HTML5", icon: "fab fa-html5" },
    { text: "CSS / CSS3", icon: "fab fa-css3-alt" },
    { text: "Java", icon: "fab fa-java" },
    { text: "Visual Basic", icon: "fa-solid fa-laptop-code" },
    { text: ".NET", icon: "fa-solid fa-laptop-code" },
    { text: "ASP.NET", icon: "fa-solid fa-laptop-code" },
    { text: "Angular JS", icon: "fab fa-angular" },
    { text: "Angular Material", icon: "fab fa-angular" },
    { text: "Node JS", icon: "fab fa-node-js" },
    { text: "Javascript", icon: "fab fa-js-square" },
    { text: "Typescript", icon: "fab fa-js-square" },
    { text: "ReactJS", icon: "fab fa-react" },
    { text: "Tailwind CSS", icon: "fab fa-css3-alt" },
    { text: "SQL", icon: "fas fa-database" },
    { text: "MySQL", icon: "fas fa-database" },
    { text: "MongoDB", icon: "fas fa-database" },
    { text: "Google Firebase", icon: "fas fa-fire" },
    { text: "Docker", icon: "fab fa-docker" },
    { text: "Kubernetes", icon: "fas fa-cube" },
  ];

  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollAmount = 1;

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationFrameId: number;

    const scroll = () => {
      if (!scrollContainer) return;

      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
        scrollContainer.scrollLeft = 0;
      } else {
        scrollContainer.scrollLeft += scrollAmount;
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    // Disable user interaction
    scrollContainer.style.pointerEvents = "none";

    animationFrameId = requestAnimationFrame(scroll);

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (scrollContainer) {
        scrollContainer.style.pointerEvents = "auto";
      }
    };
  }, []);

  return (
    <section className="h-full w-full bg-background flex flex-col items-center px-4 lg:px-48 justify-center text-white">
      <h1 className="text-5xl lg:text-6xl mb-16 font-semibold">Skills</h1>
      <div
        ref={scrollRef}
        className="flex items-center p-8 w-full overflow-x-hidden whitespace-nowrap"
      >
        {[...skills, ...skills].map((skill, index) => {
          return (
            <div
              key={index}
              className="flex flex-col p-8 pt-4 pr-24 rounded-lg bg-backgroundSecondary mr-8"
            >
              <i className={`${skill.icon} text-3xl mb-4`} />
              <span className="whitespace-nowrap">{skill.text}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
};
