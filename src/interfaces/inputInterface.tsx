import type { InputInterfaceType } from "../containers/entities/entities";

const FIELD =
  "w-full rounded-lg border border-border bg-surface px-4 py-3 text-base text-foreground placeholder:text-muted motion-safe:transition-colors hover:border-muted focus:border-accent aria-invalid:border-danger";

export const InputInterface = ({
  id,
  label,
  type = "text",
  name,
  placeholder,
  value,
  onChange,
  onInvalid,
  className,
  required,
  autoComplete,
  inputMode,
  maxLength,
  minLength,
  error,
}: InputInterfaceType) => {
  const errorId = `${id}-error`;
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-secondary">
        {label}
      </label>
      <input
        id={id}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onInvalid={onInvalid}
        required={required}
        autoComplete={autoComplete}
        inputMode={inputMode}
        maxLength={maxLength}
        minLength={minLength}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={FIELD}
      />
      {error && (
        <p id={errorId} className="mt-2 text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  );
};
