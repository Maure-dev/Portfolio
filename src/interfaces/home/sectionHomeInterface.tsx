import HomeAvatar from "../../assets/sectionHome/home-avatar.png";

export const SectionHomeInterface = () => {
  return (
    <section className="h-full w-full bg-background flex flex-col items-center px-4 lg:px-48 justify-center text-white">
      <h1 className="text-6xl lg:text-7xl text-center mb-4">
        Hi, my name <br /> is <b className="text-primary">Mauro</b>
      </h1>
      <p className="text-3xl mb-8">Front-End Developer</p>
      <img
        className="w-2/3 lg:w-1/6"
        src={HomeAvatar}
        alt="Avatar Memoji Maure"
      />
    </section>
  );
};
