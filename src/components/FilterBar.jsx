import { Search, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { FILTERS } from "../utils/taskFilters";

export function FilterBar({
  filter,
  priority,
  search,
  onFilterChange,
  onPriorityChange,
  onSearchChange,
}) {
  const [priorityMenuOpen, setPriorityMenuOpen] = useState(false);
  return (
    <div className="flex flex-wrap items-center gap-3 border-b border-[#dedfd7] pb-4 dark:border-slate-700">
      <div
        className="order-2 flex w-full gap-1 sm:order-1 sm:w-auto"
        role="tablist"
        aria-label="Filter tasks"
      >
        {FILTERS.map((item) => (
          <button
            className={`rounded-lg px-3 py-2 text-[11px] transition ${filter === item.id ? "bg-[#e5e8df] font-semibold text-[#152017] dark:bg-slate-700 dark:text-slate-100" : "text-[#90978f] hover:text-[#152017] dark:text-slate-400 dark:hover:text-slate-100"}`}
            key={item.id}
            type="button"
            role="tab"
            aria-selected={filter === item.id}
            onClick={() => onFilterChange(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <label className="order-1 flex h-11 min-w-0 flex-1 items-center gap-3 rounded-xl border border-[#dfe2d8] bg-[#fffef9] px-3 text-[#96a097] shadow-sm transition focus-within:border-lime-400 focus-within:ring-4 focus-within:ring-lime-100 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-400 dark:focus-within:ring-lime-900/30 sm:order-2 sm:max-w-[255px]">
        <Search size={18} />
        <span className="sr-only">Search by title</span>
        <input
          className="min-w-0 flex-1 bg-transparent text-sm text-[#152017] outline-none placeholder:text-[#a5aca3] dark:text-slate-100 dark:placeholder:text-slate-500"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search tasks"
        />
      </label>
      <div className="relative order-1 sm:order-3">
        <button
          className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl border-2 bg-[#fffef9] text-[#829087] transition hover:bg-lime-50 dark:bg-slate-900 dark:text-white dark:hover:bg-lime-950/40 ${priority !== "all" ? "border-lime-500 bg-lime-50 dark:border-lime-400 dark:bg-lime-950/30" : "border-lime-500 dark:border-lime-400"}`}
          type="button"
          aria-label="Filter by priority"
          aria-expanded={priorityMenuOpen}
          onClick={() => setPriorityMenuOpen((open) => !open)}
        >
          <SlidersHorizontal size={18} />
        </button>
        {priorityMenuOpen && (
          <div className="absolute right-0 top-14 z-10 w-36 rounded-xl border border-[#dedfd7] bg-[#fffef9] p-1.5 shadow-xl dark:border-slate-700 dark:bg-slate-900">
            {["all", "high", "medium", "low"].map((option) => (
              <button
                className={`block w-full rounded-lg border-0 px-3 py-2 text-left text-xs capitalize transition ${priority === option ? "bg-lime-100 font-semibold text-emerald-900 dark:bg-lime-900/50 dark:text-lime-200" : "bg-transparent text-[#667063] hover:bg-[#f0f2ea] dark:text-slate-300 dark:hover:bg-slate-800"}`}
                type="button"
                key={option}
                onClick={() => {
                  onPriorityChange(option);
                  setPriorityMenuOpen(false);
                }}
              >
                {option === "all" ? "All priorities" : option}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
