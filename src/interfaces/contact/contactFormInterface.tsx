import React, { useState } from "react";
import { ButtonInterface } from "../buttonInterface";
import type {
  ContactFormInterfaceType,
  FormDataType,
} from "../../containers/entities/entities";
import { InputInterface } from "../inputInterface";
import { TextAreaInterface } from "../textAreaInterface";
// import { postMailer } from "../../services/contactService";
//import { ContactContext } from "@src/containers/contexts/contactContext";

export const ContactFormInterface = ({
  className,
}: ContactFormInterfaceType) => {
  const [formData, setFormData] = useState<FormDataType>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    message: "",
  });

  // const { handleAlert, handleAlertStatus } = useContext(ContactContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("MAURE", formData);
    // await postMailer({
    //   firstName: formData.firstName,
    //   lastName: formData.lastName,
    //   email: formData.email,
    //   company: formData.company,
    //   phoneNumber: formData.phoneNumber,
    //   message: formData.message,
    // }).then((res) => {
    //   if (res.success) {
    //     handleAlert(true);
    //     handleAlertStatus("success");
    //   } else {
    //     handleAlert(true);
    //     handleAlertStatus("error");
    //     console.error(
    //       "Ocurrió un error al enviar el formulario: ",
    //       formData,
    //       res
    //     );
    //   }
    //   setTimeout(() => {
    //     handleAlert(false);
    //   }, 5000);
    // });
  };

  return (
    <>
      <form
        className={`flex flex-col items-center justify-center min-w-[20rem] w-[40%] ${
          className ? className : ""
        }`}
        onSubmit={(e) => handleSubmit(e)}
      >
        <InputInterface
          type="text"
          name="firstName"
          value={formData.firstName}
          placeholder="First Name"
          onChange={handleChange}
          className="w-full mb-4"
          required={true}
        />
        <InputInterface
          type="text"
          name="lastName"
          value={formData.lastName}
          placeholder="Last Name"
          onChange={handleChange}
          className="w-full mb-4"
          required={true}
        />
        <InputInterface
          type="email"
          name="email"
          value={formData.email}
          placeholder="Email"
          onChange={handleChange}
          className="w-full mb-4"
          required={true}
        />
        <InputInterface
          type="tel"
          name="phoneNumber"
          value={formData.phoneNumber}
          placeholder="Phone Number"
          onChange={handleChange}
          className="w-full mb-4"
          required={true}
        />
        <TextAreaInterface
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Got a question or proposal, or just want to say hello? Go ahead."
          className="w-full"
          required={true}
        />
        <ButtonInterface
          primary={true}
          description="Send message"
          className="w-full mt-6"
        />
      </form>
    </>
  );
};
