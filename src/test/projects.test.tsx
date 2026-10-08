import { beforeAll, describe, expect, it } from "vitest";
import { act, fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import i18n from "../i18n/i18n";
import { projects, projectsByFilter } from "../data/projects";
import { SectionProjectsInterface } from "../interfaces/projects/sectionProjectsInterface";

beforeAll(async () => {
  const proto = HTMLDialogElement.prototype;
  proto.showModal = function showModal(this: HTMLDialogElement) {
    this.setAttribute("open", "");
  };
  proto.close = function close(this: HTMLDialogElement) {
    this.removeAttribute("open");
    this.dispatchEvent(new Event("close"));
  };
  await i18n.changeLanguage("en");
});

const getDialog = () => document.querySelector("dialog") as HTMLDialogElement;
const getGrid = () => screen.getByRole("list", { name: "Projects" });

describe("SectionProjectsInterface", () => {
  it("renders every project as a card and filters them with pressed chips", async () => {
    const user = userEvent.setup();
    render(<SectionProjectsInterface />);

    expect(screen.getByRole("heading", { level: 1, name: "Projects" })).toBeInTheDocument();
    expect(within(getGrid()).getAllByRole("listitem")).toHaveLength(projects.length);
    expect(
      within(getGrid()).getByRole("heading", { level: 2, name: "Abril Vet" })
    ).toBeInTheDocument();
    expect(screen.getByText(`Showing ${projects.length} of ${projects.length} projects`)).toBeInTheDocument();

    const filters = screen.getByRole("group", { name: "Filter projects by category" });
    const all = within(filters).getByRole("button", { name: "All" });
    const government = within(filters).getByRole("button", { name: "Government" });
    expect(all).toHaveAttribute("aria-pressed", "true");
    expect(government).toHaveAttribute("aria-pressed", "false");

    await user.click(government);
    const expected = projectsByFilter("government").length;
    expect(government).toHaveAttribute("aria-pressed", "true");
    expect(all).toHaveAttribute("aria-pressed", "false");
    expect(within(getGrid()).getAllByRole("listitem")).toHaveLength(expected);
    expect(screen.getByText(`Showing ${expected} of ${projects.length} projects`)).toBeInTheDocument();
    expect(within(getGrid()).queryByRole("heading", { name: "Abril Vet" })).not.toBeInTheDocument();
    expect(within(getGrid()).getByRole("heading", { name: "Portal de Trámites" })).toHaveAttribute(
      "lang",
      "es"
    );

    await user.click(within(filters).getByRole("button", { name: "Freelance" }));
    expect(within(getGrid()).getAllByRole("listitem")).toHaveLength(2);
  });

  it("describes the details button by the card title and links the live site safely", () => {
    render(<SectionProjectsInterface />);
    const details = screen.getByRole("button", { name: "View details", description: "Abril Vet" });
    expect(details).toBeInTheDocument();
    const live = within(getGrid()).getAllByRole("link", { name: /Live ?\(opens in a new tab\)/ });
    expect(live).toHaveLength(projects.length);
    expect(live[0]).toHaveAttribute("href", "https://abril-vet.vercel.app");
    expect(live[0]).toHaveAttribute("target", "_blank");
    expect(live[0]).toHaveAttribute("rel", "noopener noreferrer");
    const images = getGrid().querySelectorAll("img");
    expect(images).toHaveLength(projects.length);
    expect(images[0]).toHaveAttribute("loading", "eager");
    expect(images[2]).toHaveAttribute("loading", "lazy");
    expect(images[0]).toHaveAttribute("alt", "");
    expect(images[0]).toHaveAttribute("sizes");
    expect(images[0].getAttribute("srcset")).toMatch(/600w.*1200w/);
  });

  it("opens the native dialog with the project details, locks the page and returns focus on close", async () => {
    const user = userEvent.setup();
    render(<SectionProjectsInterface />);
    const dialog = getDialog();
    expect(dialog).not.toHaveAttribute("open");

    const trigger = screen.getByRole("button", { name: "View details", description: "Carili Design" });
    await user.click(trigger);

    expect(dialog).toHaveAttribute("open");
    expect(document.body.style.overflow).toBe("hidden");
    const title = within(dialog).getByRole("heading", { level: 2, name: "Carili Design" });
    expect(dialog).toHaveAttribute("aria-labelledby", title.id);
    expect(within(dialog).getByText("My role")).toBeInTheDocument();
    expect(within(dialog).getByText("Solo developer — storefront, admin panel and payments")).toBeInTheDocument();
    expect(within(dialog).getByText("2026")).toBeInTheDocument();
    const highlights = within(dialog).getByRole("heading", { level: 3, name: "Highlights" });
    expect(highlights.nextElementSibling?.querySelectorAll("li")).toHaveLength(3);
    expect(within(dialog).getByRole("link", { name: /Visit site/ })).toHaveAttribute(
      "href",
      "https://carilidesign.vercel.app"
    );
    expect(within(dialog).getByRole("link", { name: /View code/ })).toHaveAttribute(
      "href",
      "https://github.com/Maure-dev/carilidesign"
    );
    expect(within(dialog).getByText("Mercado Pago")).toBeInTheDocument();

    const close = within(dialog).getByRole("button", { name: "Close" });
    const viewCode = within(dialog).getByRole("link", { name: /View code/ });
    viewCode.focus();
    fireEvent.keyDown(dialog, { key: "Tab" });
    expect(close).toHaveFocus();
    fireEvent.keyDown(dialog, { key: "Tab", shiftKey: true });
    expect(viewCode).toHaveFocus();

    await user.click(close);
    expect(dialog).not.toHaveAttribute("open");
    expect(within(dialog).queryByRole("heading")).not.toBeInTheDocument();
    expect(document.body.style.overflow).toBe("");
    expect(trigger).toHaveFocus();
  });

  it("closes on a backdrop click and resets its state when the browser closes it (Escape)", async () => {
    const user = userEvent.setup();
    render(<SectionProjectsInterface />);
    const dialog = getDialog();

    await user.click(screen.getByRole("button", { name: "View details", description: "COMPR.AR" }));
    expect(dialog).toHaveAttribute("open");
    expect(within(dialog).getByRole("heading", { level: 2, name: "COMPR.AR" })).toHaveAttribute("lang", "es");
    expect(within(dialog).getByText("2021 – 2022")).toBeInTheDocument();
    expect(within(dialog).queryByRole("link", { name: /View code/ })).not.toBeInTheDocument();

    await user.click(dialog.firstElementChild as HTMLElement);
    expect(dialog).not.toHaveAttribute("open");

    const trigger = screen.getByRole("button", { name: "View details", description: "Moorea.io" });
    await user.click(trigger);
    expect(dialog).toHaveAttribute("open");
    act(() => {
      dialog.removeAttribute("open");
      dialog.dispatchEvent(new Event("close"));
    });
    expect(within(dialog).queryByRole("heading")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });
});
