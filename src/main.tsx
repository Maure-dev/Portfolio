import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { router } from "./routes/router";
import { ThemeProvider } from "./containers/contexts/themeContext";
import "./i18n/i18n";
import "./main.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ThemeProvider>
    <RouterProvider router={router} />
    <Analytics />
    <SpeedInsights />
  </ThemeProvider>
);
