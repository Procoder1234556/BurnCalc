"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export interface InputFieldConfig {
  id: string;
  label: string;
  hint?: string;
  placeholder?: string;
  prefix?: string;
  suffix?: string;
  value: string;
  invalid?: boolean;
  errorMessage?: string;
}

export interface InputGroupProps {
  title: string;
  fields: InputFieldConfig[];
  onChange: (id: string, value: string) => void;
  className?: string;
}

export function InputGroup({ title, fields, onChange, className }: InputGroupProps) {
  return (
    <div className={cn("space-y-4", className)}>
      <h3 className="text-base font-semibold leading-tight text-text">{title}</h3>
      <div className="space-y-4">
        {fields.map((field) => {
          const describedBy = field.invalid
            ? `${field.id}-hint ${field.id}-error`
            : field.hint
              ? `${field.id}-hint`
              : undefined;

          return (
            <div key={field.id} className="space-y-1.5">
              <Label htmlFor={field.id}>{field.label}</Label>
              <div className="relative">
                {field.prefix ? (
                  <span
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs text-muted"
                    aria-hidden
                  >
                    {field.prefix}
                  </span>
                ) : null}
                <Input
                  id={field.id}
                  inputMode="decimal"
                  placeholder={field.placeholder}
                  value={field.value}
                  onChange={(e) => onChange(field.id, e.target.value)}
                  aria-describedby={describedBy}
                  aria-invalid={field.invalid || undefined}
                  className={cn(
                    field.prefix && "pl-7",
                    field.suffix && "pr-8",
                    field.invalid && "border-warning focus-visible:ring-warning/25",
                  )}
                />
                {field.suffix ? (
                  <span
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted"
                    aria-hidden
                  >
                    {field.suffix}
                  </span>
                ) : null}
              </div>
              {field.hint ? (
                <p id={`${field.id}-hint`} className="text-[11px] leading-snug text-muted">
                  {field.hint}
                </p>
              ) : null}
              {field.invalid && field.errorMessage ? (
                <p id={`${field.id}-error`} className="text-[11px] text-warning" role="alert">
                  {field.errorMessage}
                </p>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
