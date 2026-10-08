import type {
  ChangeEventHandler,
  Dispatch,
  FormEvent,
  FormEventHandler,
  MouseEventHandler,
  ReactNode,
  SetStateAction,
} from "react";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";


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


export type ThemeType = "dark" | "light";

export type ThemeContextType = {
  theme: ThemeType;
  toggleTheme: () => void;
  setTheme: (option: ThemeType) => void;
};

export type ThemeContextPropsType = {
  children: ReactNode;
};


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
  handleSubmit: (
    e: FormEvent<HTMLFormElement>,
    captchaToken: string
  ) => Promise<ContactStatus>;
  status: ContactStatus;
};

export type ContactContextPropsType = {
  children: ReactNode;
};

export type ContactFormInterfaceType = {
  className?: string;
};

export type FieldInputMode =
  | "none"
  | "text"
  | "tel"
  | "url"
  | "email"
  | "numeric"
  | "decimal"
  | "search";

type FieldBaseType = {
  id: string;
  label: string;
  name: string;
  placeholder?: string;
  value: string;
  className?: string;
  required?: boolean;
  autoComplete?: string;
  inputMode?: FieldInputMode;
  maxLength?: number;
  minLength?: number;
  error?: string;
};

export type InputInterfaceType = FieldBaseType & {
  type?: "text" | "email" | "tel";
  onChange: ChangeEventHandler<HTMLInputElement>;
  onInvalid?: FormEventHandler<HTMLInputElement>;
};

export type TextAreaInterfaceType = FieldBaseType & {
  rows?: number;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  onInvalid?: FormEventHandler<HTMLTextAreaElement>;
};


export type ButtonVariant = "primary" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export type ButtonInterfaceType = {
  description: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  primary?: boolean;
  className?: string;
  labelClassName?: string;
  type?: "button" | "submit" | "reset";
  onClick?: MouseEventHandler<HTMLElement>;
  disabled?: boolean;
  href?: string;
  download?: boolean | string;
  target?: string;
  rel?: string;
  to?: string;
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
  interactive?: boolean;
  className?: string;
  children: ReactNode;
  id?: string;
  lang?: string;
};

export type SectionBand = "default" | "secondary";

export type SectionInterfaceType = {
  id?: string;
  band?: SectionBand;
  className?: string;
  containerClassName?: string;
  labelledBy?: string;
  children: ReactNode;
};

export type SectionHeadingInterfaceType = {
  title: string;
  eyebrow?: string;
  subtitle?: string;
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
  delayMs?: number;
};
