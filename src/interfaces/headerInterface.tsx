import { NavLink } from "react-router-dom";
import type { CSSProperties } from "react";
import type { HeaderItemsType } from "../containers/entities/entities";
import ProfileImage from "/profile-rounded.png";
import { SidenavMobileInterface } from "./projects/sidenavMobileInterface";
import React, { useContext } from "react";
import { OutletContext } from "../containers/contexts/outletContext";

const headerItems: HeaderItemsType = {
  data: [
    {
      id: "product",
      text: "Home",
      router: "/",
    },
    {
      id: "projects",
      text: "Projects",
      router: "/projects",
    },
    {
      id: "about",
      text: "About",
      router: "/about",
    },
    {
      id: "contact",
      text: "Contact",
      router: "/contact",
    },
  ],
};

export const HeaderInterface = (): JSX.Element => {
  const { menuOpen, handleSetMenuOpen } = useContext(OutletContext)!;

  return (
    <React.Fragment>
      <header
        className="h-20 w-full backdrop-blur-2xl fixed z-50 px-4 lg:px-48 py-7 flex items-center justify-center text-white"
        style={{ WebkitBackdropFilter: "blur(40px)" }}
      >
        <button
          className="fixed flex left-4 lg:hidden text-2xl"
          onClick={() => {
            handleSetMenuOpen(!menuOpen);
          }}
        >
          {!menuOpen && <i className="fa-solid fa-bars" />}
          {menuOpen && <i className="fa-solid fa-xmark" />}
        </button>
        <NavLink
          to="/"
          className="lg:fixed lg:left-48 flex items-center transition-all duration-300"
        >
          <img
            className="w-12 mr-4 lg:mr-8"
            src={ProfileImage}
            alt="Profile Photo"
          />
          <h3 className="font-bold text-primary">Mauro Gerardi</h3>
        </NavLink>
        <ul className="hidden lg:flex">
          {headerItems.data.map((item, index) => {
            return (
              <NavLink
                key={item.id}
                to={item.router}
                className="text-xl hover:text-primary transition-all duration-300 &active:text-primary"
                style={({ isActive }: { isActive: boolean }): CSSProperties => {
                  return {
                    fontWeight: isActive ? 700 : 300,
                    color: isActive ? "#ce1f36" : "",
                  };
                }}
              >
                <li
                  className={
                    headerItems.data.length === index + 1 ? "" : "mr-8"
                  }
                >
                  {item.text}
                </li>
              </NavLink>
            );
          })}
        </ul>
      </header>
      <SidenavMobileInterface headerItems={headerItems} />
    </React.Fragment>
  );
};
