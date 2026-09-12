import { cn } from "@/lib/utils";

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("rounded-2xl border border-border bg-surface shadow-card", className)}
      {...props}
    />
  );
}

export function Badge({
  className,
  variant = "neutral",
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { variant?: "neutral" | "brand" | "accent" | "warning" }) {
  const variants = {
    neutral: "bg-surface-muted text-muted",
    brand: "bg-brand-light text-brand-dark",
    accent: "bg-accent-light text-accent-dark",
    warning: "bg-warning/15 text-warning",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
