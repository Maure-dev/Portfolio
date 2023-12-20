import type { ButtonInterfaceType } from "../containers/entities/entities";

export const ButtonInterface = ({
  primary,
  description,
  className,
  onClick,
}: ButtonInterfaceType) => {
  return (
    <button
      onClick={onClick}
      type="submit"
      className={`px-8 py-4 rounded-lg text-2xl font-semibold hover:shadow-lg hover:shadow-primaryBlue ${
        primary
          ? "bg-primaryBlue text-white"
          : "bg-transparent border-4 border-primaryBlue hover:bg-primaryBlue/5 text-primaryBlue"
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
