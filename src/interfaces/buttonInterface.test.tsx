import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { ButtonInterface } from "./buttonInterface";

describe("ButtonInterface", () => {
  it("renders a <button> and fires onClick", async () => {
    const onClick = vi.fn();
    render(<ButtonInterface description="Click" onClick={onClick} />);
    const button = screen.getByRole("button", { name: "Click" });
    expect(button).toHaveAttribute("type", "button");
    await userEvent.click(button);
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("renders an <a> with href + download when href is provided", () => {
    render(<ButtonInterface description="CV" href="/cv.pdf" download />);
    const link = screen.getByRole("link", { name: "CV" });
    expect(link).toHaveAttribute("href", "/cv.pdf");
    expect(link).toHaveAttribute("download");
  });

  it("protects target=_blank links and announces the new tab", () => {
    render(
      <ButtonInterface description="GitHub" href="https://github.com" target="_blank" />
    );
    const link = screen.getByRole("link", { name: /GitHub ?\(opens in a new tab\)/ });
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders a router link when `to` is provided", () => {
    render(
      <MemoryRouter>
        <ButtonInterface description="Projects" to="/projects" variant="outline" />
      </MemoryRouter>
    );
    const link = screen.getByRole("link", { name: "Projects" });
    expect(link).toHaveAttribute("href", "/projects");
    expect(link.className).toContain("border-accent");
  });

  it("applies variant and size classes, with primary as the default", () => {
    const { rerender } = render(<ButtonInterface description="Go" />);
    let button = screen.getByRole("button", { name: "Go" });
    expect(button.className).toContain("bg-primary");
    expect(button.className).toContain("text-on-primary");
    expect(button.className).toContain("h-11");

    rerender(<ButtonInterface description="Go" variant="ghost" size="sm" />);
    button = screen.getByRole("button", { name: "Go" });
    expect(button.className).not.toContain("bg-primary ");
    expect(button.className).toContain("h-9");
  });

  it("keeps the legacy `primary={false}` prop working as the outline variant", () => {
    render(<ButtonInterface primary={false} description="Legacy" />);
    expect(screen.getByRole("button", { name: "Legacy" }).className).toContain(
      "border-accent"
    );
  });

  it("supports an icon with a visually hidden label (icon-only)", () => {
    render(
      <ButtonInterface
        description="Download CV"
        icon={faHouse}
        labelClassName="sr-only"
        aria-label="Download CV"
      />
    );
    const button = screen.getByRole("button", { name: "Download CV" });
    expect(button.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  });

  it("is disabled only when asked", () => {
    render(<ButtonInterface description="Send" type="submit" disabled />);
    expect(screen.getByRole("button", { name: "Send" })).toBeDisabled();
  });
});
