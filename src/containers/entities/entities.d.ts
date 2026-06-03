export type OutletContextType = {
  scrollTop: number;
  scrollProgress: number;
  handleScroll: (event: React.UIEvent<HTMLElement>) => void;
  menuOpen: boolean;
  handleSetMenuOpen: (option: boolean) => void;
};

export type OutletContextPropsType = {
  children: ReactNode;
};

export type ContactStatus = "idle" | "sending" | "success" | "error";

export type ContactContextType = {
  formData: FormDataType;
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<ContactStatus>;
  status: ContactStatus;
};

export type ContactContextPropsType = {
  children: ReactNode;
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

export type NavId = "product" | "projects" | "about" | "contact";

export type HeaderItemsType = {
  data: { id: NavId; router: string }[];
};

export type SidenavItemsType = {
  headerItems: HeaderItemsType;
};

export type ButtonInterfaceType = {
  primary: boolean;
  className?: string;
  description: string;
  type?: "button" | "submit" | "reset";
  onClick?: (e) => void;
  disabled?: boolean;
  /** When provided, the component renders an <a> instead of a <button>. */
  href?: string;
  download?: boolean | string;
  /** Optional leading FontAwesome icon. */
  icon?: import("@fortawesome/fontawesome-svg-core").IconProp;
  target?: string;
  rel?: string;
};

export type AlertInterfaceType = {
  className?: string;
};

export type ContactFormInterfaceType = {
  className?: string;
};

export type FormDataType = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  message: string;
};

export type InputInterfaceType = {
  type: string;
  name: string;
  placeholder?: string;
  value: string | number;
  onChange: (e) => void;
  className?: string;
  required?: boolean;
};

export type TextAreaInterfaceType = {
  name: string;
  placeholder?: string;
  value: string | number;
  onChange: (e) => void;
  className?: string;
  required?: boolean;
};

export type CarrouselInterfaceType = {
  slides: SliceInterfaceType[];
};

export type CardInterfaceType = {
  className?: string;
  children?: React.ReactNode;
  name?: string;
  onClick?: (e) => void;
};