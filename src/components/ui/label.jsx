import { cn } from "../../lib/utils";

function Label({ className, ...props }) {
  return (
    <label
      className={cn(
        "text-[11px] font-semibold text-[#566256] dark:text-slate-300",
        className,
      )}
      {...props}
    />
  );
}

export { Label };
