import { NavLink } from "react-router-dom";
import type { CSSProperties } from "react";
import type { HeaderItemsType } from "../containers/entities/entities";
import ProfileImage from "/profile-rounded.png";

const headerItems: HeaderItemsType = {
  data: [
    {
      id: "product",
      text: "Home",
      router: "/",
    },
    {
      id: "about",
      text: "About",
      router: "/about",
    },
    {
      id: "projects",
      text: "Projects",
      router: "/projects",
    },
    {
      id: "contact",
      text: "Contact",
      router: "/contact",
    },
  ],
};

export const HeaderInterface = (): JSX.Element => {
  return (
    <header
      className="h-20 w-full backdrop-blur-2xl absolute z-50 px-20 py-7 flex items-center justify-center"
      style={{ WebkitBackdropFilter: "blur(40px)" }}
    >
      <NavLink
        to="/"
        className="lg:fixed lg:left-20 flex items-center transition-all duration-300"
      >
        <img className="w-16 mr-8" src={ProfileImage} alt="Profile Photo" />
        <h3 className="lg:hidden font-semibold">Mauro Gerardi</h3>
      </NavLink>
      <ul className="hidden lg:flex">
        {headerItems.data.map((item, index) => {
          return (
            <NavLink
              key={item.id}
              to={item.router}
              className="text-xl hover:text-primaryBlue transition-all duration-300 &active:text-primaryBlue"
              style={({ isActive }: { isActive: boolean }): CSSProperties => {
                return {
                  fontWeight: isActive ? 700 : 300,
                  color: isActive ? "#0071E3" : "",
                };
              }}
            >
              <li
                className={headerItems.data.length === index + 1 ? "" : "mr-8"}
              >
                {item.text}
              </li>
            </NavLink>
          );
        })}
      </ul>
    </header>
  );
};
