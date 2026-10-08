import { useCallback, useContext, useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import {
  GoogleReCaptchaProvider,
  GoogleReCaptchaCheckbox,
} from "@google-recaptcha/react";
import { ButtonInterface } from "../buttonInterface";
import { InputInterface } from "../inputInterface";
import { TextAreaInterface } from "../textAreaInterface";
import { ContactContext } from "../../containers/contexts/contactContext";
import { useTheme } from "../../containers/contexts/themeContext";
import { normalizeLanguage } from "../../i18n/i18n";
import type {
  ContactFormInterfaceType,
  FormDataType,
} from "../../containers/entities/entities";

const MESSAGE_MIN_LENGTH = 10;

type FieldName = keyof FormDataType;
type FieldErrors = Partial<Record<FieldName, string>>;
type CaptchaState = { widget: string; token: string } | null;

export const ContactFormInterface = ({
  className,
}: ContactFormInterfaceType) => {
  const { t, i18n } = useTranslation();
  const { theme } = useTheme();
  const contactContext = useContext(ContactContext);
  const language = normalizeLanguage(i18n.resolvedLanguage) ?? "en";

  const [initialLanguage] = useState(language);

  const [captcha, setCaptcha] = useState<CaptchaState>(null);
  const [attempt, setAttempt] = useState(0);
  const [captchaError, setCaptchaError] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [company, setCompany] = useState("");
  const captchaRef = useRef<HTMLDivElement>(null);

  const widgetKey = `${language}-${theme}-${attempt}`;
  const captchaToken = captcha?.widget === widgetKey ? captcha.token : null;

  const handleCaptchaChange = useCallback(
    (token: string) => {
      setCaptcha({ widget: widgetKey, token });
      setCaptchaError(false);
    },
    [widgetKey]
  );
  const handleCaptchaReset = useCallback(() => setCaptcha(null), []);

  if (!contactContext) return null;

  const { formData, setFormData, handleSubmit, status } = contactContext;
  const sending = status === "sending";

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = e.target.name as FieldName;
    const { value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleInvalid = (
    e: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, validity } = e.currentTarget;
    const message = validity.typeMismatch
      ? t("contact.form.invalidEmail")
      : validity.tooShort
        ? t("contact.form.minLength")
        : null;
    if (message) setFieldErrors((prev) => ({ ...prev, [name]: message }));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (company) return;

    const form = e.currentTarget;
    if (formData.message.trim().length < MESSAGE_MIN_LENGTH) {
      setFieldErrors((prev) => ({
        ...prev,
        message: t("contact.form.minLength"),
      }));
      (form.elements.namedItem("message") as HTMLTextAreaElement | null)?.focus();
      return;
    }
    if (!captchaToken) {
      setCaptchaError(true);
      captchaRef.current?.focus();
      return;
    }

    setCaptchaError(false);
    await handleSubmit(e, captchaToken);
    setAttempt((n) => n + 1);
    setFieldErrors({});
  };

  return (
    <GoogleReCaptchaProvider
      type="v2-checkbox"
      siteKey={import.meta.env.VITE_SITE_KEY!}
      language={initialLanguage}
      theme={theme}
    >
      <form
        onSubmit={onSubmit}
        className={[
          "mx-auto grid w-full max-w-3xl gap-5 sm:grid-cols-2",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <InputInterface
          id="contact-first-name"
          name="firstName"
          label={t("contact.form.firstName")}
          value={formData.firstName}
          onChange={handleChange}
          onInvalid={handleInvalid}
          autoComplete="given-name"
          maxLength={60}
          required
          error={fieldErrors.firstName}
        />
        <InputInterface
          id="contact-last-name"
          name="lastName"
          label={t("contact.form.lastName")}
          value={formData.lastName}
          onChange={handleChange}
          onInvalid={handleInvalid}
          autoComplete="family-name"
          maxLength={60}
          required
          error={fieldErrors.lastName}
        />
        <InputInterface
          id="contact-email"
          type="email"
          name="email"
          label={t("contact.form.email")}
          value={formData.email}
          onChange={handleChange}
          onInvalid={handleInvalid}
          autoComplete="email"
          inputMode="email"
          maxLength={254}
          required
          error={fieldErrors.email}
        />
        <InputInterface
          id="contact-phone"
          type="tel"
          name="phoneNumber"
          label={`${t("contact.form.phoneNumber")} (${t("contact.form.optional")})`}
          value={formData.phoneNumber}
          onChange={handleChange}
          autoComplete="tel"
          inputMode="tel"
          maxLength={25}
          error={fieldErrors.phoneNumber}
        />
        <TextAreaInterface
          className="sm:col-span-2"
          id="contact-message"
          name="message"
          label={t("contact.form.messageLabel")}
          placeholder={t("contact.form.messagePlaceholder")}
          value={formData.message}
          onChange={handleChange}
          onInvalid={handleInvalid}
          minLength={MESSAGE_MIN_LENGTH}
          maxLength={2000}
          rows={5}
          required
          error={fieldErrors.message}
        />

        <div className="hidden" aria-hidden="true">
          <label htmlFor="contact-company">Company</label>
          <input
            id="contact-company"
            type="text"
            name="company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className="flex flex-col gap-5 sm:col-span-2 sm:flex-row sm:items-start sm:justify-between">
          <div
            ref={captchaRef}
            tabIndex={-1}
            aria-describedby={
              captchaError ? "contact-captcha-error" : "contact-captcha-hint"
            }
            className="rounded-lg"
          >
            <GoogleReCaptchaCheckbox
              key={widgetKey}
              theme={theme}
              language={language}
              onChange={handleCaptchaChange}
              onExpired={handleCaptchaReset}
              onError={handleCaptchaReset}
              className="max-[359px]:origin-top-left max-[359px]:scale-[0.92]"
            />
            <div className="mt-2 text-sm">
              <p id="contact-captcha-error" role="alert" className="text-danger">
                {captchaError ? t("contact.form.captchaError") : null}
              </p>
              {!captchaError && (
                <p id="contact-captcha-hint" className="text-secondary">
                  {t("contact.form.captchaHint")}
                </p>
              )}
            </div>
          </div>
          <ButtonInterface
            type="submit"
            icon={faPaperPlane}
            disabled={sending}
            description={
              sending ? t("contact.form.sending") : t("contact.form.send")
            }
            className="w-full sm:w-auto"
          />
        </div>

        <div className="text-sm font-medium sm:col-span-2">
          <p role="status" className="text-success">
            {status === "success" ? t("contact.form.success") : null}
          </p>
          <p role="alert" className="text-danger">
            {status === "error" ? t("contact.form.error") : null}
          </p>
        </div>
      </form>
    </GoogleReCaptchaProvider>
  );
};
