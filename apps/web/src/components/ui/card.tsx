import { forwardRef, type ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="card" className={cn("ui-card", className)} {...props} />;
}

export function CardHeader({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="card-header" className={cn("ui-card__header", className)} {...props} />;
}

export const CardTitle = forwardRef<HTMLHeadingElement, ComponentProps<"h2">>(({ className, ...props }, ref) => (
  <h2 ref={ref} data-slot="card-title" className={cn("section-title", className)} {...props} />
));
CardTitle.displayName = "CardTitle";

export function CardDescription({ className, ...props }: ComponentProps<"p">) {
  return <p data-slot="card-description" className={cn("section-description", className)} {...props} />;
}

export function CardContent({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="card-content" className={cn("ui-card__content", className)} {...props} />;
}
