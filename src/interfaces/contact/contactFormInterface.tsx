import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { ButtonInterface } from "../buttonInterface";
import { InputInterface } from "../inputInterface";
import { TextAreaInterface } from "../textAreaInterface";
import { ContactContext } from "../../containers/contexts/contactContext";
import {
  GoogleReCaptchaProvider,
  GoogleReCaptchaCheckbox,
} from "@google-recaptcha/react";

export const ContactFormInterface = ({ className }: { className?: string }) => {
  const { t } = useTranslation();
  const contactContext = useContext(ContactContext);

  const [captchaToken, setCaptchaToken] = React.useState<string | null>(null);
  const [captchaError, setCaptchaError] = React.useState(false);
  const [captchaKey, setCaptchaKey] = React.useState(0);

  const handleCaptchaChange = React.useCallback((token: string) => {
    setCaptchaToken(token);
    setCaptchaError(false);
  }, []);
  const handleCaptchaReset = React.useCallback(() => {
    setCaptchaToken(null);
  }, []);

  if (!contactContext) return null;

  const { formData, setFormData, handleSubmit, status } = contactContext;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <GoogleReCaptchaProvider
      type="v2-checkbox"
      siteKey={import.meta.env.VITE_SITE_KEY!}
    >
      <form
        className={`flex flex-col lg:grid lg:grid-cols-2 gap-4 w-full ${className ?? ""}`}
        onSubmit={async (e) => {
          e.preventDefault();
          if (!captchaToken) {
            setCaptchaError(true);
            return;
          }
          setCaptchaError(false);
          const result = await handleSubmit(e);
          if (result === "success") {
            setCaptchaToken(null);
            setCaptchaKey((key) => key + 1);
          }
        }}
      >
        <InputInterface
          type="text"
          name="firstName"
          value={formData.firstName}
          placeholder={t("contact.form.firstName")}
          onChange={handleChange}
          className="w-full mb-4"
          required
        />
        <InputInterface
          type="text"
          name="lastName"
          value={formData.lastName}
          placeholder={t("contact.form.lastName")}
          onChange={handleChange}
          className="w-full mb-4"
          required
        />
        <InputInterface
          type="email"
          name="email"
          value={formData.email}
          placeholder={t("contact.form.email")}
          onChange={handleChange}
          className="w-full mb-4"
          required
        />
        <InputInterface
          type="tel"
          name="phoneNumber"
          value={formData.phoneNumber}
          placeholder={t("contact.form.phoneNumber")}
          onChange={handleChange}
          className="w-full mb-4"
          required
        />
        <div className="col-span-2">
          <TextAreaInterface
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder={t("contact.form.message")}
            className="w-full col-span-2"
            required
          />
          <div className="flex flex-col gap-4 mt-6 lg:flex-row items-center justify-center lg:justify-between">
            <GoogleReCaptchaCheckbox
              key={captchaKey}
              onChange={handleCaptchaChange}
              onExpired={handleCaptchaReset}
              onError={handleCaptchaReset}
            />
            <ButtonInterface
              primary
              disabled={!captchaToken || status === "sending"}
              type="submit"
              description={
                status === "sending"
                  ? t("contact.form.sending")
                  : t("contact.form.send")
              }
              className="w-full lg:w-fit cursor-pointer disabled:cursor-not-allowed disabled:bg-backgroundSecondary disabled:text-textDark"
            />
          </div>
          <div aria-live="polite" className="mt-4 min-h-6 text-sm">
            {captchaError && (
              <p role="alert" className="text-primary">
                {t("contact.form.captchaError")}
              </p>
            )}
            {status === "sending" && (
              <p className="flex items-center gap-2">
                <FontAwesomeIcon icon={faSpinner} spin aria-hidden="true" />
                {t("contact.form.sending")}
              </p>
            )}
            {status === "success" && (
              <p className="text-green-500">{t("contact.form.success")}</p>
            )}
            {status === "error" && (
              <p role="alert" className="text-primary">
                {t("contact.form.error")}
              </p>
            )}
          </div>
        </div>
      </form>
    </GoogleReCaptchaProvider>
  );
};
