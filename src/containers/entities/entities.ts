import type {
  ChangeEventHandler,
  Dispatch,
  FormEvent,
  MouseEventHandler,
  ReactNode,
  SetStateAction,
} from "react";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";

/* ------------------------------------------------------------------ Layout */

export type OutletContextType = {
  menuOpen: boolean;
  handleSetMenuOpen: (option: boolean) => void;
};

export type OutletContextPropsType = {
  children: ReactNode;
};

export type NavId = "home" | "projects" | "about" | "contact";

export type NavItemType = {
  id: NavId;
  router: string;
};

/* ------------------------------------------------------------------- Theme */

export type ThemeType = "dark" | "light";

export type ThemeContextType = {
  theme: ThemeType;
  toggleTheme: () => void;
  setTheme: (option: ThemeType) => void;
};

export type ThemeContextPropsType = {
  children: ReactNode;
};

/* ----------------------------------------------------------------- Contact */

export type ContactStatus = "idle" | "sending" | "success" | "error";

export type FormDataType = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  message: string;
};

export type ContactContextType = {
  formData: FormDataType;
  setFormData: Dispatch<SetStateAction<FormDataType>>;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<ContactStatus>;
  status: ContactStatus;
};

export type ContactContextPropsType = {
  children: ReactNode;
};

export type AlertInterfaceType = {
  className?: string;
};

export type ContactFormInterfaceType = {
  className?: string;
};

export type InputInterfaceType = {
  type: string;
  name: string;
  placeholder?: string;
  value: string | number;
  onChange: ChangeEventHandler<HTMLInputElement>;
  className?: string;
  required?: boolean;
};

export type TextAreaInterfaceType = {
  name: string;
  placeholder?: string;
  value: string | number;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  className?: string;
  required?: boolean;
};

/* -------------------------------------------------------------- Components */

export type ButtonVariant = "primary" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export type ButtonInterfaceType = {
  /** Visible label. */
  description: string;
  /** Visual style. Defaults to "primary". */
  variant?: ButtonVariant;
  /** Control height/padding. Defaults to "md". */
  size?: ButtonSize;
  /** @deprecated Use `variant`. `primary={false}` maps to the outline variant. */
  primary?: boolean;
  className?: string;
  /** Extra classes for the label span (e.g. "hidden xl:inline" for icon-only). */
  labelClassName?: string;
  type?: "button" | "submit" | "reset";
  onClick?: MouseEventHandler<HTMLElement>;
  disabled?: boolean;
  /** Renders an <a>. */
  href?: string;
  download?: boolean | string;
  target?: string;
  rel?: string;
  /** Renders a react-router <NavLink>. */
  to?: string;
  /** Optional FontAwesome icon. */
  icon?: IconProp;
  iconPosition?: "start" | "end";
  id?: string;
  title?: string;
  "aria-label"?: string;
  "aria-describedby"?: string;
};

export type CardElement = "div" | "article" | "li" | "figure" | "section";

export type CardInterfaceType = {
  as?: CardElement;
  /** Adds the hover lift/border change. Only for clickable cards. */
  interactive?: boolean;
  className?: string;
  children: ReactNode;
  id?: string;
  lang?: string;
};

export type SectionBand = "default" | "secondary";

export type SectionInterfaceType = {
  id?: string;
  /** Alternating background band. */
  band?: SectionBand;
  /** Classes for the <section> element. */
  className?: string;
  /** Classes for the inner max-width container. */
  containerClassName?: string;
  /** id of the heading that labels the section (aria-labelledby). */
  labelledBy?: string;
  children: ReactNode;
};

export type SectionHeadingInterfaceType = {
  title: string;
  eyebrow?: string;
  subtitle?: string;
  /** Heading level: "h1" for the page title, "h2" (default) for sections. */
  as?: "h1" | "h2";
  align?: "center" | "left";
  id?: string;
  className?: string;
};

export type TagTone = "accent" | "success" | "neutral";

export type TagInterfaceType = {
  children: ReactNode;
  className?: string;
  tone?: TagTone;
  as?: "span" | "li";
};

export type RevealInterfaceType = {
  children: ReactNode;
  className?: string;
  /** Stagger delay in milliseconds. */
  delayMs?: number;
};
