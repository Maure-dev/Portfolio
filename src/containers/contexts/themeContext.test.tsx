import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "./themeContext";
import { ThemeToggleInterface } from "../../interfaces/themeToggleInterface";

describe("Theme toggle", () => {
  beforeEach(() => {
    document.documentElement.className = "";
    localStorage.clear();
  });

  it("toggles from dark (default) to light and updates <html> + localStorage", async () => {
    render(
      <ThemeProvider>
        <ThemeToggleInterface />
      </ThemeProvider>
    );

    const button = screen.getByRole("button");
    expect(document.documentElement.classList.contains("light")).toBe(false);

    await userEvent.click(button);

    expect(document.documentElement.classList.contains("light")).toBe(true);
    expect(localStorage.getItem("theme")).toBe("light");
  });
});
