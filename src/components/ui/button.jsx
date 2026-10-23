import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-lg text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-500 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-[#152017] text-[#f3f6ec] shadow-lg shadow-[#152017]/10 hover:bg-[#293829] dark:bg-lime-300 dark:text-[#152017] dark:hover:bg-lime-200",
        outline:
          "border border-[#dedfd7] bg-transparent text-[#566256] hover:bg-[#edf0e5] dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800",
        ghost:
          "bg-transparent text-[#667063] hover:bg-[#edf0e5] dark:text-slate-300 dark:hover:bg-slate-800",
        destructive:
          "bg-transparent text-red-600 hover:bg-red-50 dark:text-red-300 dark:hover:bg-red-950/40",
        link: "bg-transparent text-emerald-800 underline-offset-4 hover:underline dark:text-lime-300",
      },
      size: {
        default: "px-4 py-2.5",
        sm: "px-3 py-2",
        icon: "h-9 w-9",
        iconSm: "h-8 w-8",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

function Button({ className, variant, size, type = "button", ...props }) {
  return (
    <button
      type={type}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Button, buttonVariants };
