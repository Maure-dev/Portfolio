import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ButtonInterface } from "./buttonInterface";

describe("ButtonInterface", () => {
  it("renders a <button> and fires onClick", async () => {
    const onClick = vi.fn();
    render(<ButtonInterface primary description="Click" onClick={onClick} />);
    const button = screen.getByRole("button", { name: "Click" });
    expect(button).toBeInTheDocument();
    await userEvent.click(button);
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("renders an <a> with href + download when href is provided", () => {
    render(
      <ButtonInterface primary description="CV" href="/cv.pdf" download />
    );
    const link = screen.getByRole("link", { name: "CV" });
    expect(link).toHaveAttribute("href", "/cv.pdf");
    expect(link).toHaveAttribute("download");
  });
});
