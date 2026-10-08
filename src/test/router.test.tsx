import { describe, it, expect } from "vitest";
import { act, render, screen, within } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { router, routes } from "../routes/router";
import { ThemeProvider } from "../containers/contexts/themeContext";
import { SITE_URL } from "../constants";

const headAttribute = (selector: string, attribute: string) =>
  document.head.querySelector(selector)?.getAttribute(attribute) ?? null;
const canonical = () => headAttribute('link[rel="canonical"]', "href");
const meta = (selector: string) => headAttribute(selector, "content");

describe("router smoke test", () => {
  it("renders the home route with landmarks and the hero title", async () => {
    render(
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    );

    const main = await screen.findByRole("main");
    expect(main).toHaveAttribute("id", "main");

    const headings = await within(main).findAllByRole("heading", { level: 1 });
    expect(headings[0]).toHaveTextContent(/Mauro/);

    expect(
      screen.getByRole("navigation", { name: "Main navigation" })
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Skip to content" })).toHaveAttribute(
      "href",
      "#main"
    );
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    expect(main.querySelector("footer")).toBeNull();
    expect(document.title).toContain("Mauro Gerardi");
    expect(canonical()).toBe(`${SITE_URL}/`);
  });

  it("clears stale meta on the 404 route and restores it on a lazy route", async () => {
    const memoryRouter = createMemoryRouter(routes, { initialEntries: ["/"] });
    render(
      <ThemeProvider>
        <RouterProvider router={memoryRouter} />
      </ThemeProvider>
    );
    await screen.findByRole("heading", { level: 1, name: /Mauro/ });
    expect(canonical()).toBe(`${SITE_URL}/`);

    await act(async () => {
      await memoryRouter.navigate("/nope/deep");
    });
    await screen.findByRole("heading", { level: 1, name: "Page not found" });
    expect(meta('meta[name="robots"]')).toBe("noindex");
    expect(canonical()).toBeNull();
    expect(meta('meta[property="og:url"]')).toBeNull();
    expect(meta('meta[name="description"]')).toMatch(/doesn't exist/);
    expect(meta('meta[property="og:description"]')).toMatch(/doesn't exist/);
    expect(document.title).toBe("Page not found — Mauro Gerardi");

    await act(async () => {
      await memoryRouter.navigate("/about");
    });
    await screen.findByRole("heading", { level: 1, name: "About me" });
    expect(document.head.querySelector('meta[name="robots"]')).toBeNull();
    expect(canonical()).toBe(`${SITE_URL}/about`);
    expect(meta('meta[property="og:url"]')).toBe(`${SITE_URL}/about`);
    expect(document.title).toBe("About — Mauro Gerardi");
  });
});
