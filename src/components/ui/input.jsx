import { cn } from "../../lib/utils";

function Input({ className, type = "text", ...props }) {
  return (
    <input
      type={type}
      className={cn(
        "flex h-11 w-full rounded-xl border border-[#dfe2d8] bg-[#fffef9] px-3 text-sm text-[#152017] shadow-sm outline-none placeholder:text-[#a5aca3] focus:border-lime-500 focus:ring-4 focus:ring-lime-100 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:ring-lime-900/30",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
