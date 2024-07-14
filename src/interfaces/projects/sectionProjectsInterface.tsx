import { ButtonInterface } from "../buttonInterface";

export const SectionProjectsInterface = () => {
  return (
    <section className="h-full w-full flex flex-col items-center bg-background text-white">
      <div className="flex items-center justify-center w-full pt-20 pb-8 px-4 lg:px-48">
        <h1 className="text-4xl font-semibold">Experience</h1>
      </div>
      <div className="w-full h-full flex items-center justify-between bg-white text-textDark px-4 lg:px-48">
        <div className="flex flex-col w-full">
          <h1 className="text-6xl mb-16 font-semibold">
            My recent <br /> work
          </h1>
          <ButtonInterface
            primary={true}
            description="View Project"
            className="w-fit mt-6"
          />
        </div>
        <div className="flex items-center justify-center w-full">
          <h1>HOLAAA</h1>
        </div>
      </div>
    </section>
  );
};
