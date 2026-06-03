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
    <div className="font-semibold w-full">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        aria-label={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={`p-3.5 bg-transparent z-20 sticky border-b-2 border-b-white hover:bg-white/5 rounded-t-lg placeholder:text-white/50 ${className}`}
      />
    </div>
  );
};
