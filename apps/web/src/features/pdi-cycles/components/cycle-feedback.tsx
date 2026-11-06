import { cn } from "@/lib/utils";

type FeedbackVariant = "info" | "success" | "warning" | "error";

export function CycleFeedback({ variant, children, urgent = variant === "error" }: { variant: FeedbackVariant; children: React.ReactNode; urgent?: boolean }) {
  return (
    <div className={cn("cycle-feedback", `cycle-feedback--${variant}`)} role={urgent ? "alert" : "status"}>
      {children}
    </div>
  );
}
