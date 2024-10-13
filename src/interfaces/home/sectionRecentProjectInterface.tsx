import recentProject from "../../assets/sectionRecentProject/recentProject.png";

export const SectionRecentProjectInterface = () => {
  const handleViewProject = () => {
    window.open("https://saas.moorea.io/", "_blank");
  };

  return (
    <section className="h-full w-full bg-background flex flex-col lg:flex-row items-center px-4 lg:px-48 justify-center lg:justify-between text-white">
      <div className="flex flex-col lg:w-1/3 items-center lg:items-start mb-16 lg:mb-0">
        <h1 className="text-5xl lg:text-6xl mb-16 font-semibold">
          My recent <br className="hidden lg:block" /> work
        </h1>
        <div
          className="lg:hidden flex items-center justify-center w-full bg-[url('src/assets/sectionRecentProject/macbook.png')] bg-no-repeat bg-center bg-contain p-[16.5%] pt-[12%] cursor-pointer"
          onClick={handleViewProject}
        >
          <img
            src={recentProject}
            alt="Recent Project - Image"
            className="max-w-full h-auto"
          />
        </div>
      </div>
      <div
        className="hidden lg:flex items-center justify-center w-2/3 bg-[url('src/assets/sectionRecentProject/macbook.png')] bg-no-repeat bg-center bg-contain p-[10.5%] pt-[8%] cursor-pointer"
        onClick={handleViewProject}
      >
        <img
          src={recentProject}
          alt="Recent Project - Image"
          className="max-w-full h-auto"
        />
      </div>
    </section>
  );
};
