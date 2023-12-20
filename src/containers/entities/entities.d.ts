export type OutletContextType = {
  scrollTop: number;
  handleScroll: (event: React.UIEvent<HTMLElement>) => void;
};

export type OutletContextPropsType = {
  children: ReactNode;
};

export type HeaderItemsType = {
  data: { id: string; text: string; router: string }[];
};

export type ButtonInterfaceType = {
  primary: boolean;
  className?: string;
  description: string;
  onClick?: (e) => void;
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
