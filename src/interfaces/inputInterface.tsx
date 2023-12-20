import type { InputInterfaceType } from "../containers/entities/entities";

export const InputInterface = ({
  type,
  name,
  placeholder,
  value,
  onChange,
  className,
  required,
}: InputInterfaceType) => {
  return (
    <div className="text-primaryBlue font-semibold w-full">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={`p-3.5 bg-transparent z-20 sticky border-2 border-primaryBlue hover:bg-primaryBlue/5 rounded-lg placeholder:text-primaryBlue/50 ${className}`}
      />
    </div>
  );
};
