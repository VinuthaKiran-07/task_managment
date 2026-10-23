import { cn } from "../../lib/utils";

function Badge({ className, variant = "default", ...props }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2 py-1 font-mono text-[9px] font-medium",
        variant === "high" &&
          "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300",
        variant === "medium" &&
          "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300",
        variant === "low" &&
          "bg-sky-100 text-sky-700 dark:bg-sky-900/50 dark:text-sky-300",
        variant === "default" &&
          "bg-lime-100 text-emerald-800 dark:bg-lime-900/50 dark:text-lime-300",
        className,
      )}
      {...props}
    />
  );
}

export { Badge };
