import { NavLink, useLocation } from "react-router-dom";
import gitHub from "../assets/github-dark.svg";
import LinkedIn from "../assets/linkedin-dark.svg";

export const FooterInterface = () => {
  const location = useLocation();
  const getYear = (): number => {
    const Year: Date = new Date();
    return Year.getFullYear();
  };
  return (
    <footer className="h-screen w-full bg-background flex flex-col items-center px-4 lg:px-20 justify-center text-center text-white relative">
      <h1 className="text-4xl lg:text-7xl font-medium">Let's works together</h1>
      <div className="flex flex-col lg:flex-row items-center mt-16">
        <a
          href="https://www.linkedin.com/in/mauro-gerardi"
          target="_blank"
          className="flex items-center mb-4 lg:mb-0 lg:mr-24"
        >
          <img src={LinkedIn} alt="LinkedIn Logo" className="w-24" />
        </a>
        {location.pathname != "/contact" && (
          <NavLink to="/contact" className="flex mb-4 lg:mb-0 lg:mr-24">
            <i className="material-symbols-outlined text-8xl">email</i>
          </NavLink>
        )}
        <a
          href="https://github.com/Maure-dev"
          target="_blank"
          className="flex items-center"
        >
          <img src={gitHub} alt="Git Hub Logo" className="w-24" />
        </a>
      </div>
      <p className="font-semibold absolute bottom-8">
        © Mauro Alejandro Gerardi - {getYear()}
      </p>
    </footer>
  );
};
