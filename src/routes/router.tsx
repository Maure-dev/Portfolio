import {
  Outlet,
  ScrollRestoration,
  createBrowserRouter,
  useRouteError,
} from "react-router-dom";
import type { RouteObject } from "react-router-dom";
import { Fragment, useEffect } from "react";
import { MainScreen } from "../screens/mainScreen";
import { HomeScreen } from "../screens/homeScreen";
import { NotFoundInterface } from "../interfaces/notFoundInterface";
import { RouteFallbackInterface } from "../interfaces/routeFallbackInterface";

const RouteErrorInterface = () => {
  const error = useRouteError();
  useEffect(() => {
    console.error("Route error", error);
  }, [error]);
  return <NotFoundInterface variant="error" />;
};

const ScrollRestoringOutlet = () => (
  <Fragment>
    <Outlet />
    <ScrollRestoration />
  </Fragment>
);

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <MainScreen />,
    errorElement: <RouteErrorInterface />,
    children: [
      {
        element: <ScrollRestoringOutlet />,
        errorElement: <RouteErrorInterface />,
        hydrateFallbackElement: <RouteFallbackInterface />,
        children: [
          { index: true, element: <HomeScreen /> },
          {
            path: "about",
            lazy: () =>
              import("../screens/aboutScreen").then((m) => ({
                Component: m.AboutScreen,
              })),
          },
          {
            path: "projects",
            lazy: () =>
              import("../screens/projectsScreen").then((m) => ({
                Component: m.ProjectsScreen,
              })),
          },
          {
            path: "contact",
            lazy: () =>
              import("../screens/contactScreen").then((m) => ({
                Component: m.ContactScreen,
              })),
          },
          { path: "*", element: <NotFoundInterface /> },
        ],
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
