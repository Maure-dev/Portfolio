import { NavLink, useLocation } from "react-router-dom";

export const FooterInterface = () => {
  const location = useLocation();
  const getYear = (): number => {
    const Year: Date = new Date();
    return Year.getFullYear();
  };
  return (
    <footer className="h-screen w-full bg-background flex flex-col items-center px-4 lg:px-20 justify-center text-center text-white relative">
      <h1 className="text-4xl lg:text-7xl font-medium">Let's works together</h1>
      <div className="flex flex-row items-center mt-16">
        <a
          href="https://www.linkedin.com/in/mauro-gerardi"
          target="_blank"
          className="flex items-center mr-8 lg:mr-24"
        >
          <i className="fa-brands fa-linkedin text-8xl hover:text-primary" />
        </a>
        {location.pathname != "/contact" && (
          <NavLink to="/contact" className="flex mr-8 lg:mr-24">
            <i className="fa-regular fa-envelope text-8xl hover:text-primary" />
          </NavLink>
        )}
        <a
          href="https://github.com/Maure-dev"
          target="_blank"
          className="flex items-center"
        >
          <i className="fa-brands fa-github text-8xl hover:text-primary" />
        </a>
      </div>
      <p className="font-semibold absolute bottom-8 flex items-center">
        <i className="fa-regular fa-copyright mr-2" />
        <span>Mauro Alejandro Gerardi - {getYear()}</span>
      </p>
    </footer>
  );
};
