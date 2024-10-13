import { createBrowserRouter } from "react-router-dom";
import { MainScreen } from "../screens/mainScreen";
import { AboutScreen } from "../screens/aboutScreen";
import { ContactScreen } from "../screens/contactScreen";
import { ProjectsScreen } from "../screens/projectsScreen";
import { HomeScreen } from "../screens/homeScreen";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainScreen />,
    children: [
      { path: "/", element: <HomeScreen /> },
      { path: "/about", element: <AboutScreen /> },
      { path: "/projects", element: <ProjectsScreen /> },
      { path: "/contact", element: <ContactScreen /> },
      { path: "*", element: <HomeScreen /> },
    ],
  },
]);
