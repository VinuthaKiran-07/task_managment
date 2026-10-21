import { ArrowUpRight, Plus } from "lucide-react";
import { MobileMenuButton } from "./Sidebar";

export function DashboardHeader({ view, onAdd, onOpenSidebar }) {
  return (
    <header className="flex h-[76px] items-center justify-between border-b border-[#dedfd7] px-5 sm:px-8 lg:px-16 dark:border-slate-800">
      <div className="flex items-center gap-3">
        <MobileMenuButton onClick={onOpenSidebar} />
        <div className="hidden items-center gap-2 text-xs text-[#9ca39a] sm:flex">
          <span>Workspace</span>
          <ArrowUpRight size={14} />
          <strong className="font-semibold text-[#152017] dark:text-slate-200">
            {view === "today" ? "Today" : "My tasks"}
          </strong>
        </div>
      </div>
      <button
        className="flex items-center gap-2 rounded-lg border-0 bg-[#152017] px-4 py-2.5 text-xs font-semibold text-[#f3f6ec] shadow-lg shadow-[#152017]/10 transition hover:-translate-y-0.5 hover:bg-[#293829] dark:bg-lime-300 dark:text-[#152017] dark:hover:bg-lime-200"
        type="button"
        onClick={onAdd}
      >
        <Plus size={17} /> Add task
      </button>
    </header>
  );
}
