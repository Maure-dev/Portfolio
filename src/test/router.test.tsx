import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { RouterProvider } from "react-router-dom";
import { router } from "../routes/router";
import { ThemeProvider } from "../containers/contexts/themeContext";

describe("router smoke test", () => {
  it("renders the home route with landmarks and the hero title", async () => {
    render(
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    );

    const main = await screen.findByRole("main");
    expect(main).toHaveAttribute("id", "main");

    // The hero title is the first h1. (The one-h1-per-route rule is enforced by
    // the axe scans in QA once the section components move to h2.)
    const headings = await within(main).findAllByRole("heading", { level: 1 });
    expect(headings[0]).toHaveTextContent(/Mauro/);

    expect(
      screen.getByRole("navigation", { name: "Main navigation" })
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Skip to content" })).toHaveAttribute(
      "href",
      "#main"
    );
    expect(document.title).toContain("Mauro Gerardi");
    expect(
      document.head.querySelector('link[rel="canonical"]')?.getAttribute("href")
    ).toBe("https://maure-dev.vercel.app/");
  });
});
