import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type {
  ButtonInterfaceType,
  ButtonSize,
  ButtonVariant,
} from "../containers/entities/entities";

const BASE =
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg font-semibold whitespace-nowrap select-none motion-safe:transition-colors motion-safe:duration-200 disabled:cursor-not-allowed disabled:opacity-50";

const VARIANTS: Record<ButtonVariant, string> = {
  primary: "bg-primary text-on-primary hover:bg-primary/90",
  outline:
    "border-2 border-accent text-accent hover:border-primary hover:bg-primary hover:text-on-primary",
  ghost: "text-accent hover:bg-primary/10",
};

const SIZES: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-base",
  lg: "h-12 px-6 text-lg",
};

export const ButtonInterface = ({
  description,
  variant,
  size = "md",
  primary,
  className,
  labelClassName,
  onClick,
  type,
  disabled,
  href,
  download,
  target,
  rel,
  to,
  icon,
  iconPosition = "start",
  id,
  title,
  "aria-label": ariaLabel,
  "aria-describedby": ariaDescribedBy,
}: ButtonInterfaceType) => {
  const { t } = useTranslation();
  const resolvedVariant: ButtonVariant =
    variant ?? (primary === false ? "outline" : "primary");
  const classes = [BASE, VARIANTS[resolvedVariant], SIZES[size], className]
    .filter(Boolean)
    .join(" ");

  const iconElement = icon ? (
    <FontAwesomeIcon icon={icon} aria-hidden="true" className="shrink-0" />
  ) : null;
  const opensNewTab = target === "_blank";

  const content = (
    <>
      {iconPosition === "start" && iconElement}
      <span className={labelClassName}>{description}</span>
      {iconPosition === "end" && iconElement}
      {opensNewTab && <span className="sr-only"> {t("common.newTab")}</span>}
    </>
  );

  const shared = {
    id,
    title,
    className: classes,
    "aria-label": ariaLabel,
    "aria-describedby": ariaDescribedBy,
  };

  if (to) {
    return (
      <NavLink to={to} onClick={onClick} {...shared}>
        {content}
      </NavLink>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        download={download}
        target={target}
        rel={opensNewTab ? (rel ?? "noopener noreferrer") : rel}
        onClick={onClick}
        {...shared}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type ?? "button"}
      disabled={disabled}
      onClick={onClick}
      {...shared}
    >
      {content}
    </button>
  );
};
