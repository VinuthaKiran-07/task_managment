import { CheckCircle2, CircleDashed, ListChecks } from "lucide-react";

const stats = [
  { key: "total", label: "Total tasks", icon: ListChecks },
  { key: "completed", label: "Completed", icon: CheckCircle2 },
  { key: "pending", label: "Pending", icon: CircleDashed },
];

export function Stats({ counts }) {
  return (
    <section
      className="grid animate-[rise-in_.7s_.08s_cubic-bezier(.16,1,.3,1)_both] grid-cols-1 gap-3 sm:grid-cols-3"
      aria-label="Task summary"
    >
      {stats.map(({ key, label, icon: Icon }) => (
        <div
          className="group flex items-center gap-3 rounded-[13px] border border-[#dedfd7] bg-[#fffef9] p-4 transition duration-200 hover:-translate-y-1 hover:border-[#c7cfc0] hover:shadow-[0_12px_24px_rgba(21,32,23,.07)] dark:border-slate-700 dark:bg-slate-900 dark:hover:border-slate-600"
          key={key}
        >
          <div
            className={`grid h-8 w-8 place-items-center rounded-[9px] ${key === "completed" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300" : key === "pending" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300" : "bg-lime-100 text-lime-800 dark:bg-lime-900/50 dark:text-lime-300"}`}
          >
            <Icon size={17} strokeWidth={2.1} />
          </div>
          <div>
            <strong className="block text-[21px] leading-none tracking-[-.04em] text-[#152017] dark:text-slate-100">
              {counts[key]}
            </strong>
            <span className="mt-1 block text-[11px] text-[#899188] dark:text-slate-400">
              {label}
            </span>
          </div>
        </div>
      ))}
    </section>
  );
}
