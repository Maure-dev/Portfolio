import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "./themeContext";
import { ThemeToggleInterface } from "../../interfaces/themeToggleInterface";

describe("Theme toggle", () => {
  beforeEach(() => {
    document.documentElement.className = "";
    document.head.querySelector('meta[name="theme-color"]')?.remove();
    localStorage.clear();
  });

  it("toggles from dark (default) to light and updates <html>, theme-color and localStorage", async () => {
    render(
      <ThemeProvider>
        <ThemeToggleInterface />
      </ThemeProvider>
    );

    const button = screen.getByRole("button", { name: "Dark theme" });
    expect(button).toHaveAttribute("aria-pressed", "true");
    expect(document.documentElement.classList.contains("light")).toBe(false);
    expect(
      document.head.querySelector('meta[name="theme-color"]')?.getAttribute("content")
    ).toBe("#1E1E1E");

    await userEvent.click(button);

    expect(button).toHaveAttribute("aria-pressed", "false");
    expect(document.documentElement.classList.contains("light")).toBe(true);
    expect(document.documentElement.style.colorScheme).toBe("light");
    expect(
      document.head.querySelector('meta[name="theme-color"]')?.getAttribute("content")
    ).toBe("#FFFFFF");
    expect(localStorage.getItem("theme")).toBe("light");
  });
});
