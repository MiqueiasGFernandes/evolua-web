import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Label } from "./label";

type FormFieldProps = {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  optional?: boolean;
  className?: string;
  children: ReactNode;
};

export function FormField({ id, label, hint, error, optional, className, children }: FormFieldProps) {
  return (
    <div className={cn("form-field", className)}>
      <div className="field-label-row">
        <Label htmlFor={id}>{label}</Label>
        {optional && <span className="field-optional">Opcional</span>}
      </div>
      {children}
      {error ? <p id={`${id}-error`} className="field-error">{error}</p> : hint ? <p id={`${id}-hint`} className="field-hint">{hint}</p> : null}
    </div>
  );
}
