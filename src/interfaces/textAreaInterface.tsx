import type { TextAreaInterfaceType } from "../containers/entities/entities";

export const TextAreaInterface = ({
  name,
  placeholder,
  value,
  onChange,
  className,
  required,
}: TextAreaInterfaceType) => {
  return (
    <div className="text-primaryBlue font-semibold w-full">
      <textarea
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={`pt-3.5 px-3.5 pb-16 bg-transparent z-20 sticky border-2 border-white hover:bg-white/5 rounded-lg resize-none placeholder:text-white/50 focus-visible:outline-none ${className}`}
      />
    </div>
  );
};
