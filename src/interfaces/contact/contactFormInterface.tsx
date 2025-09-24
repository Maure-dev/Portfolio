import React, { useContext } from "react";
import { ButtonInterface } from "../buttonInterface";
import { InputInterface } from "../inputInterface";
import { TextAreaInterface } from "../textAreaInterface";
import { ContactContext } from "../../containers/contexts/contactContext";
import ReCAPTCHA from "react-google-recaptcha";

export const ContactFormInterface = ({ className }: { className?: string }) => {
  const contactContext = useContext(ContactContext);

  const [captchaToken, setCaptchaToken] = React.useState<string | null>(null);

  if (!contactContext) return null;

  const { formData, setFormData, handleSubmit } = contactContext;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <form
      className={`flex flex-col lg:grid lg:grid-cols-2 gap-4 w-full ${className ?? ""}`}
      onSubmit={(e) => {
        e.preventDefault();
        if (!captchaToken) {
          alert("Por favor confirma que no eres un robot.");
          return;
        }
        handleSubmit(e);
      }}
    >
      <InputInterface
        type="text"
        name="firstName"
        value={formData.firstName}
        placeholder="First Name"
        onChange={handleChange}
        className="w-full mb-4"
        required
      />
      <InputInterface
        type="text"
        name="lastName"
        value={formData.lastName}
        placeholder="Last Name"
        onChange={handleChange}
        className="w-full mb-4"
        required
      />
      <InputInterface
        type="email"
        name="email"
        value={formData.email}
        placeholder="Email"
        onChange={handleChange}
        className="w-full mb-4"
        required
      />
      <InputInterface
        type="tel"
        name="phoneNumber"
        value={formData.phoneNumber}
        placeholder="Phone Number"
        onChange={handleChange}
        className="w-full mb-4"
        required
      />
      <div className="col-span-2">
        <TextAreaInterface
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Got a question or proposal, or just want to say hello? Go ahead."
          className="w-full col-span-2"
          required
        />
        <div className="flex items-center justify-between gap-2 mt-6">
          <ReCAPTCHA
            sitekey={import.meta.env.VITE_SITE_KEY!}
            onChange={(token) => setCaptchaToken(token)}
          />
          <ButtonInterface
            primary
            disabled={!captchaToken}
            type="submit"
            description="Send message"
            className="w-fit lg:float-right cursor-pointer disabled:cursor-not-allowed disabled:bg-[#F8F8F8] disabled:text-textDark"
          />
        </div>
      </div>
    </form>
  );
};