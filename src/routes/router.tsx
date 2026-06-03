import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import { MainScreen } from "../screens/mainScreen";
import { NotFoundInterface } from "../interfaces/notFoundInterface";

const HomeScreen = lazy(() =>
  import("../screens/homeScreen").then((m) => ({ default: m.HomeScreen }))
);
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

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainScreen />,
    children: [
      { path: "/", element: <HomeScreen /> },
      { path: "/about", element: <AboutScreen /> },
      { path: "/projects", element: <ProjectsScreen /> },
      { path: "/contact", element: <ContactScreen /> },
      { path: "*", element: <NotFoundInterface /> },
    ],
  },
]);
