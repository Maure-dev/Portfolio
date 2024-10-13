import type { ButtonInterfaceType } from "../containers/entities/entities";

export const ButtonInterface = ({
  primary,
  description,
  className,
  onClick,
  type,
}: ButtonInterfaceType) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`px-8 py-4 rounded-lg text-2xl font-semibold hover:bg-primary/80 ${
        primary
          ? "bg-primary text-white"
          : "bg-transparent border-4 border-primary hover:bg-primary/5 text-primary"
      } ${className ? className : ""}`}
    >
      {description}
    </button>
  );
};

{
  /* <button className="mt-16 bg-primaryBlue   rounded-lg  hover:shadow-lg hover:shadow-primaryBlue font-semibold">
          
        </button> */
}
