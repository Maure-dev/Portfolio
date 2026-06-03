import React, { createContext, useState } from "react";
import emailjs from "@emailjs/browser";
import type {
  ContactContextType,
  ContactContextPropsType,
  ContactStatus,
  FormDataType,
} from "../entities/entities";

export const ContactContext = createContext<ContactContextType | null>(null);

const EMPTY_FORM: FormDataType = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  message: "",
};

export const ContactProvider = ({ children }: ContactContextPropsType) => {
  const [formData, setFormData] = useState<FormDataType>(EMPTY_FORM);
  const [status, setStatus] = useState<ContactStatus>("idle");

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<ContactStatus> => {
    e.preventDefault();
    setStatus("sending");

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID!,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID!,
        formData,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY!
      );
      setFormData(EMPTY_FORM);
      setStatus("success");
      return "success";
    } catch (error) {
      console.error("Error sending email", error);
      setStatus("error");
      return "error";
    }
  };

  return (
    <ContactContext.Provider
      value={{
        formData,
        setFormData,
        handleSubmit,
        status,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};