import type { TextAreaInterfaceType } from "../containers/entities/entities";

const FIELD =
  "w-full resize-y rounded-lg border border-border bg-surface px-4 py-3 text-base text-foreground placeholder:text-muted motion-safe:transition-colors hover:border-muted focus:border-accent aria-invalid:border-danger";

export const TextAreaInterface = ({
  id,
  label,
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
  rows = 5,
  error,
}: TextAreaInterfaceType) => {
  const errorId = `${id}-error`;
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-secondary">
        {label}
      </label>
      <textarea
        id={id}
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
        rows={rows}
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
