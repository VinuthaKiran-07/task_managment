import { ArrowUpRight, Plus } from "lucide-react";
import { MobileMenuButton } from "./Sidebar";
import { Button } from "./ui/button";

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
      <Button onClick={onAdd}>
        <Plus size={17} /> Add task
      </Button>
    </header>
  );
}
