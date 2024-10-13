import { CSSProperties, useContext } from "react";
import { NavLink } from "react-router-dom";
import { SidenavItemsType } from "../../containers/entities/entities";
import { OutletContext } from "../../containers/contexts/outletContext";

export const SidenavMobileInterface = ({
  headerItems,
}: SidenavItemsType): JSX.Element => {
  const { menuOpen, handleSetMenuOpen } = useContext(OutletContext)!;

  return (
    <aside
      className={`w-screen h-screen bg-background transition-all duration-500 transform z-40 fixed pt-32 ${
        menuOpen ? "" : "-translate-x-full"
      }`}
    >
      <ul className="flex flex-col justify-start items-center h-screen text-white">
        {headerItems.data.map((item, index) => {
          return (
            <NavLink
              key={item.id}
              onClick={() => {
                handleSetMenuOpen(false);
              }}
              to={item.router}
              className={`text-2xl hover:text-primary transition-all duration-300 &active:text-primary ${
                headerItems.data.length === index + 1 ? "" : "mb-16"
              }`}
              style={({ isActive }: { isActive: boolean }): CSSProperties => {
                return {
                  fontWeight: isActive ? 700 : 300,
                  color: isActive ? "#ce1f36" : "",
                };
              }}
            >
              <li>{item.text}</li>
            </NavLink>
          );
        })}
      </ul>
    </aside>
  );
};
