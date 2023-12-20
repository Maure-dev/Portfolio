import { NavLink, useLocation } from "react-router-dom";
import gitHub from "../assets/github-dark.svg";
import LinkedIn from "../assets/linkedin-dark.svg";
import email from "../assets/email-dark.svg";
import { ButtonInterface } from "./buttonInterface";

export const FooterInterface = () => {
  const location = useLocation();
  const getYear = (): number => {
    const Year: Date = new Date();
    return Year.getFullYear();
  };
  return (
    <footer className="h-screen w-full bg-primaryLightBlue flex flex-col items-center px-4 lg:px-20 justify-center text-center">
      <h1 className="text-4xl lg:text-7xl font-semibold">
        Let's works together
      </h1>
      {location.pathname != "/contact" && (
        <NavLink to="/contact">
          <ButtonInterface
            primary={true}
            description="Email me"
            className="w-full mt-6"
          />
        </NavLink>
      )}
      <div className="flex mt-16">
        <a
          href="https://www.linkedin.com/in/mauro-gerardi"
          target="_blank"
          className="flex items-center mr-24"
        >
          <img src={LinkedIn} alt="LinkedIn Logo" className="w-8 mr-2" />
          /mauro-gerardi
        </a>
        <a
          href="https://github.com/Maure-dev"
          target="_blank"
          className="flex items-center"
        >
          <img src={gitHub} alt="Git Hub Logo" className="w-8 mr-2" />
          /Maure-dev
        </a>
      </div>
      <a
        href="mailto:alegerardi.00@icloud.com"
        target="_blank"
        className="flex items-center mt-8"
      >
        <img src={email} alt="Email Logo" className="w-8 mr-2" />
        alegerardi.00@icloud.com
      </a>
      <p className="font-semibold mt-32">
        © Mauro Alejandro Gerardi - {getYear()}
      </p>
    </footer>
  );
};
