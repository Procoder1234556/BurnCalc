"use client";

export interface NumberFieldProps {
  id: string;
  label: string;
  hint: string;
  value: string;
  onChange: (value: string) => void;
  prefix?: string;
  suffix?: string;
  invalid?: boolean;
  errorMessage?: string;
}

export function NumberField({
  id,
  label,
  hint,
  value,
  onChange,
  prefix,
  suffix,
  invalid,
  errorMessage,
}: NumberFieldProps) {
  const describedBy = invalid
    ? `${id}-hint ${id}-error`
    : `${id}-hint`;

  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="text-sm font-medium text-text">
        {label}
      </label>
      <div className="relative">
        {prefix ? (
          <span
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted"
            aria-hidden
          >
            {prefix}
          </span>
        ) : null}
        <input
          id={id}
          inputMode="decimal"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-describedby={describedBy}
          aria-invalid={invalid || undefined}
          className={`input-focus-glow w-full rounded-lg border bg-white py-2.5 font-mono text-sm text-text placeholder:text-muted/50 focus:border-primary focus:outline-none ${
            prefix ? "pl-7 pr-3" : "px-3"
          } ${suffix ? "pr-10" : ""} ${
            invalid ? "border-warning" : "border-border"
          }`}
        />
        {suffix ? (
          <span
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted"
            aria-hidden
          >
            {suffix}
          </span>
        ) : null}
      </div>
      <p id={`${id}-hint`} className="text-xs text-muted">{hint}</p>
      {invalid && errorMessage ? (
        <p id={`${id}-error`} className="text-xs text-warning" role="alert">
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
}
