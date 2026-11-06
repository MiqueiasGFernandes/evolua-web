import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-[4px] border px-4 py-2.5 text-base font-semibold leading-5 transition-colors duration-150 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-[var(--border-disabled)] disabled:bg-[var(--surface-disabled)] disabled:text-[var(--text-disabled)]",
  {
    variants: {
      variant: {
        primary: "border-[var(--action-primary)] bg-[var(--action-primary)] text-white hover:border-[var(--action-primary-hover)] hover:bg-[var(--action-primary-hover)] active:bg-[var(--action-primary-pressed)]",
        secondary: "border-[var(--border-control)] bg-transparent text-[var(--text-primary)] hover:bg-[var(--surface-subtle)] active:bg-[var(--surface-muted)]",
        destructive: "border-[var(--status-error)] bg-transparent text-[var(--status-error)] hover:bg-[var(--status-error-soft)] active:bg-[var(--status-error-soft)]"
      },
      size: {
        default: "min-w-28",
        compact: "min-w-0 px-3"
      }
    },
    defaultVariants: { variant: "primary", size: "default" }
  }
);

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  pending?: boolean;
  pendingLabel?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, pending = false, pendingLabel = "Processando…", children, disabled, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={disabled || pending}
      aria-busy={pending || undefined}
      {...props}
    >
      {pending ? pendingLabel : children}
    </button>
  )
);
Button.displayName = "Button";
