import HomeAvatar from "../assets/sectionHome/home-avatar.png";

export const SectionHomeInterface = () => {
  return (
    <section className="pt-20 h-screen w-full bg-primaryLightBlue flex flex-col lg:flex-row items-center px-4 lg:px-20 justify-center lg:justify-between">
      <div className="mb-16 lg:mb-0">
        <h1 className="text-6xl lg:text-7xl 2xl:text-9xl">
          Hi, my <br /> name is <b>Mauro</b>
        </h1>
        <p className="text-3xl lg:text-3xl 2xl:text-5xl mt-8 lg:mt-0">
          I'm a <b>Front-End Developer</b> from La Plata, Argentina.<b></b>
        </p>
      </div>
      <img
        className="w-2/3 lg:w-1/3"
        src={HomeAvatar}
        alt="Avatar Memoji Maure"
      />
    </section>
  );
};
