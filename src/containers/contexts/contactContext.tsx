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

  const showNotification = (title: string, options?: NotificationOptions) => {
    if (!("Notification" in window)) {
      console.warn("This browser doesn't support notifications.");
      return;
    }

    if (Notification.permission === "default") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification(title, options);
        }
      });
    } else if (Notification.permission === "granted") {
      new Notification(title, options);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const result = await emailjs.send(
        import.meta.env.REACT_APP_EMAILJS_SERVICE_ID!,
        import.meta.env.REACT_APP_EMAILJS_TEMPLATE_ID!,
        formData,
        import.meta.env.REACT_APP_EMAILJS_PUBLIC_KEY!
      );
      console.log("Email sent", result.text);

      showNotification("¡Email sent!", {
        body: "Your message has been sent successfully.",
      });

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        message: "",
      });
    } catch (error) {
      console.error("Error sending email", error);
      showNotification("Error sending email", {
        body: "There was a problem sending your message. Please try again.",
      });
    }
  };

  return (
    <ContactContext.Provider
      value={{
        formData,
        setFormData,
        handleSubmit,
        showNotification,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};