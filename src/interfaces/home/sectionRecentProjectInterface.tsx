import { ButtonInterface } from "../buttonInterface";

export const SectionRecentProjectInterface = () => {
  return (
    <section className="h-full w-full bg-background flex flex-col lg:flex-row items-center px-4 lg:px-48 justify-center lg:justify-between text-white">
      <div className="flex flex-col w-full items-center lg:items-start mb-16 lg:mb-0">
        <h1 className="text-5xl lg:text-6xl mb-8 lg:mb-16 font-semibold">
          My recent <br className="hidden lg:block" /> work
        </h1>
        <div className="flex lg:hidden items-center justify-center w-full">
          <h1>HOLAAA</h1>
        </div>
        <ButtonInterface
          primary={true}
          description="View Project"
          className="w-fit mt-8"
        />
      </div>
      <div className="hidden lg:flex items-center justify-center w-full">
        <h1>HOLAAA</h1>
      </div>
    </section>
  );
};
