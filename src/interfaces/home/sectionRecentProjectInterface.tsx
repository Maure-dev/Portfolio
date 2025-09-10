import { useNavigate } from "react-router-dom";
import recentProject from "../../assets/sectionRecentProject/recentProject.png";
import macbook from "../../assets/sectionRecentProject/macbook.png";
import ClickIcon from "../clickIcon";
import PointIcon from "../pointIcon";
import { ButtonInterface } from "../buttonInterface";

export const SectionRecentProjectInterface = () => {
  const navigate = useNavigate();

  const handleViewProject = () => {
    window.open("https://saas.moorea.io/", "_blank");
  };

  const handleGoToProjects = () => {
    navigate("/projects");
  }

  return (
    <section className="h-full w-full bg-background flex flex-col lg:flex-row items-center px-4 lg:px-48 justify-center lg:justify-between text-white">
      <div className="flex flex-col lg:w-1/3 items-center lg:items-start mb-16 lg:mb-0">
        <div className="flex flex-col items-center lg:items-start">
          <h1 className="text-5xl lg:text-6xl mb-8 lg:mb-16 font-semibold">
            My recent <br className="hidden lg:block" /> work
          </h1>
          <ButtonInterface
            primary={true}
            type="button"
            onClick={handleGoToProjects}
            description="See more projects"
            className="w-fit mb-16 lg:mb-0 cursor-pointer"
          />
        </div>
        <div
          className="lg:hidden flex items-center justify-center w-full p-[16.5%] pt-[12%] relative"
        >
          <img src={macbook} alt="Macbook - Image" className="absolute z-10 top-[8%]" />
          <img
            src={recentProject}
            alt="Recent Project - Image"
            className="max-w-full h-auto cursor-pointer z-20"
            onClick={handleViewProject}
          />
          <PointIcon className="absolute w-[12%] -rotate-40 bottom-[25%] right-[16%] z-30 fill-primary" />
        </div>
      </div>
      <div
        className="hidden lg:flex items-center justify-center relative w-2/3 p-[10.5%] pt-[8%]"
      >
        <img src={macbook} alt="Macbook - Image" className="absolute z-10 top-[8%]" />
        <img
          src={recentProject}
          alt="Recent Project - Image"
          className="max-w-full h-auto cursor-pointer z-20"
          onClick={handleViewProject}
        />
        <ClickIcon className="absolute w-[12%] bottom-[25%] right-[16%] z-30 stroke-primary fill-none" />
      </div>
    </section>
  );
};
