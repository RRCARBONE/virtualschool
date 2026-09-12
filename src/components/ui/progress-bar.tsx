import { cn } from "@/lib/utils";

export function ProgressBar({
  percent,
  className,
  trackClassName,
  size = "md",
}: {
  percent: number;
  className?: string;
  trackClassName?: string;
  size?: "sm" | "md";
}) {
  const clamped = Math.max(0, Math.min(100, percent));
  return (
    <div
      className={cn(
        "w-full overflow-hidden rounded-full bg-surface-muted",
        size === "sm" ? "h-1.5" : "h-2.5",
        trackClassName
      )}
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={cn("h-full rounded-full bg-gradient-to-r from-brand to-accent transition-all", className)}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
