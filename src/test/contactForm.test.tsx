import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactNode } from "react";
import { ThemeProvider } from "../containers/contexts/themeContext";
import { ContactProvider } from "../containers/contexts/contactContext";
import { ContactFormInterface } from "../interfaces/contact/contactFormInterface";

const { send } = vi.hoisted(() => ({ send: vi.fn() }));

vi.mock("@emailjs/browser", () => ({
  default: { send },
}));

vi.mock("@google-recaptcha/react", () => ({
  GoogleReCaptchaProvider: ({ children }: { children?: ReactNode }) => (
    <>{children}</>
  ),
  GoogleReCaptchaCheckbox: ({
    onChange,
  }: {
    onChange?: (token: string) => void;
  }) => (
    <button type="button" onClick={() => onChange?.("test-token")}>
      Solve captcha
    </button>
  ),
}));

const renderForm = () =>
  render(
    <ThemeProvider>
      <ContactProvider>
        <ContactFormInterface />
      </ContactProvider>
    </ThemeProvider>
  );

const fillValidForm = async (user: ReturnType<typeof userEvent.setup>) => {
  await user.type(screen.getByLabelText("First Name"), "  Ada ");
  await user.type(screen.getByLabelText("Last Name"), "Lovelace");
  await user.type(screen.getByLabelText("Email"), "ada@example.com");
  await user.type(
    screen.getByLabelText("Message"),
    "Hello Mauro, I would like to talk about a project."
  );
};

describe("ContactFormInterface", () => {
  beforeEach(() => {
    send.mockReset();
    send.mockResolvedValue({ status: 200, text: "OK" });
  });

  it("renders labelled fields, an optional phone and an enabled submit button", () => {
    renderForm();
    expect(screen.getByLabelText("First Name")).toHaveAttribute(
      "autocomplete",
      "given-name"
    );
    expect(screen.getByLabelText("Email")).toHaveAttribute("type", "email");
    expect(screen.getByLabelText("Phone Number (optional)")).not.toBeRequired();
    expect(screen.getByLabelText("Message")).toHaveAttribute("rows", "5");
    expect(screen.getByRole("button", { name: "Send message" })).toBeEnabled();
  });

  it("does not send without a captcha token: shows the error and focuses the captcha", async () => {
    const user = userEvent.setup();
    renderForm();
    await fillValidForm(user);

    await user.click(screen.getByRole("button", { name: "Send message" }));

    expect(send).not.toHaveBeenCalled();
    expect(
      screen.getByText("Please confirm you're not a robot.")
    ).toHaveAttribute("role", "alert");
    expect(document.activeElement).toHaveAttribute(
      "aria-describedby",
      "contact-captcha-error"
    );
  });

  it("flags a too-short message inline instead of sending", async () => {
    const user = userEvent.setup();
    renderForm();
    await user.type(screen.getByLabelText("First Name"), "Ada");
    await user.type(screen.getByLabelText("Last Name"), "Lovelace");
    await user.type(screen.getByLabelText("Email"), "ada@example.com");
    await user.type(screen.getByLabelText("Message"), "Hi");

    await user.click(screen.getByRole("button", { name: "Send message" }));

    expect(send).not.toHaveBeenCalled();
    const message = screen.getByLabelText("Message");
    expect(message).toHaveAttribute("aria-invalid", "true");
    expect(message).toHaveAccessibleDescription(
      "Please write at least 10 characters."
    );
  });

  it("sends trimmed values with the captcha token and the SDK abuse options", async () => {
    const user = userEvent.setup();
    renderForm();
    await fillValidForm(user);
    await user.click(screen.getByRole("button", { name: "Solve captcha" }));

    await user.click(screen.getByRole("button", { name: "Send message" }));

    expect(send).toHaveBeenCalledOnce();
    const [, , params, options] = send.mock.calls[0];
    expect(params).toMatchObject({
      firstName: "Ada",
      lastName: "Lovelace",
      email: "ada@example.com",
      phoneNumber: "",
      "g-recaptcha-response": "test-token",
    });
    expect(options).toMatchObject({
      blockHeadless: true,
      limitRate: { id: "contact-form", throttle: 10_000 },
    });
    expect(await screen.findByRole("status")).toHaveTextContent(
      "Thanks! Your message has been sent."
    );
    expect(screen.getByLabelText("First Name")).toHaveValue("");
  });
});
