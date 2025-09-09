import React, { createContext, useState } from "react";
import emailjs from "@emailjs/browser";
import type { ContactContextType, ContactContextPropsType, FormDataType } from "../entities/entities";

export const ContactContext = createContext<ContactContextType | null>(null);

export const ContactProvider = ({ children }: ContactContextPropsType) => {
  const [formData, setFormData] = useState<FormDataType>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const result = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID!,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID!,
        formData,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY!
      );
      console.log("Email sent", result.text);

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        message: "",
      });
    } catch (error) {
      console.error("Error sending email", error);
    }
  };

  return (
    <ContactContext.Provider
      value={{
        formData,
        setFormData,
        handleSubmit,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};