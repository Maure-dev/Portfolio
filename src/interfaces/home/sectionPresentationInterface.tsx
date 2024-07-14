export const SectionPresentationInterface = () => {
  return (
    <section className="h-full w-full bg-background flex flex-col items-center px-4 lg:px-48 justify-center text-white">
      <h1 className="text-5xl lg:text-6xl mb-8 lg:mb-16">Nice to meet you</h1>
      <div className="flex flex-col justify-center lg:w-3/4">
        <span className="text-secondary mb-0.5 text-xl lg:text-4xl">
          &lt;h1&gt;
        </span>
        <p className="border-l-2 border-secondary pl-4 ml-4 lg:ml-8 text-lg lg:text-2xl">
          I am a passionate Front-End developer with experience in AngularJS and
          Angular Material, a Functional Analyst, Scrum Master, and PO.
          Currently, I am studying the University Technical Degree in Web
          Development at UNER, where I have learned to use HTML, CSS, and
          JavaScript to create attractive and functional user interfaces for web
          applications. I am also taking a ReactJS course at CoderHouse to
          expand my skill set.
        </p>
        <span className="text-secondary mt-2 text-xl lg:text-4xl">
          &lt;/h1&gt;
        </span>
      </div>
      <div className="flex items-center p-8 mb-8 lg:mb-16">
        <div className="flex flex-col p-4 bg-backgroundSecondary text-textDark mr-8">
          pepe
        </div>
        <div className="flex flex-col p-4 bg-backgroundSecondary text-textDark mr-8">
          pepe
        </div>
        <div className="flex flex-col p-4 bg-backgroundSecondary text-textDark mr-8">
          pepe
        </div>
        <div className="flex flex-col p-4 bg-backgroundSecondary text-textDark">
          pepe
        </div>
      </div>
    </section>
  );
};
