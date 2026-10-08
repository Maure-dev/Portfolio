import { createBrowserRouter, useRouteError } from "react-router-dom";
import { lazy, useEffect } from "react";
import { MainScreen } from "../screens/mainScreen";
import { HomeScreen } from "../screens/homeScreen";
import { NotFoundInterface } from "../interfaces/notFoundInterface";

const AboutScreen = lazy(() =>
  import("../screens/aboutScreen").then((m) => ({ default: m.AboutScreen }))
);
const ProjectsScreen = lazy(() =>
  import("../screens/projectsScreen").then((m) => ({
    default: m.ProjectsScreen,
  }))
);
const ContactScreen = lazy(() =>
  import("../screens/contactScreen").then((m) => ({ default: m.ContactScreen }))
);

const RouteErrorInterface = () => {
  const error = useRouteError();
  useEffect(() => {
    console.error("Route error", error);
  }, [error]);
  return <NotFoundInterface variant="error" />;
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainScreen />,
    errorElement: <RouteErrorInterface />,
    children: [
      {
        errorElement: <RouteErrorInterface />,
        children: [
          { index: true, element: <HomeScreen /> },
          { path: "about", element: <AboutScreen /> },
          { path: "projects", element: <ProjectsScreen /> },
          { path: "contact", element: <ContactScreen /> },
          { path: "*", element: <NotFoundInterface /> },
        ],
      },
    ],
  },
]);
