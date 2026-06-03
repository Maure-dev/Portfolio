import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { ButtonInterfaceType } from "../containers/entities/entities";

export const ButtonInterface = ({
  primary,
  description,
  className,
  onClick,
  type,
  disabled,
  href,
  download,
  icon,
  target,
  rel,
}: ButtonInterfaceType) => {
  const layout = icon ? "inline-flex items-center justify-center gap-3 " : "";
  const classes = `${layout}px-8 py-4 rounded-lg text-2xl font-semibold hover:bg-primary/80 ${
    primary
      ? "bg-primary text-white"
      : "bg-transparent border-4 border-primary hover:bg-primary/5 text-primary"
  } ${className ? className : ""}`;

  const content = (
    <>
      {icon && <FontAwesomeIcon icon={icon} aria-hidden="true" />}
      {description}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        download={download}
        target={target}
        rel={target === "_blank" ? rel ?? "noopener noreferrer" : rel}
        className={classes}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      type={type ?? "button"}
      disabled={disabled}
      className={classes}
    >
      {content}
    </button>
  );
};
