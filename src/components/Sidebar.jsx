import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  Moon,
  PanelLeft,
  Sun,
} from "lucide-react";
import { LogoMark } from "./LogoMark";

export function Sidebar({
  open,
  view,
  counts,
  theme,
  onViewChange,
  onToggle,
  onToggleTheme,
}) {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-20 flex flex-col bg-[#101410] px-4 py-6 text-[#e9ede1] transition-[width,transform] duration-300 ease-out md:relative md:translate-x-0 ${open ? "w-[248px] translate-x-0" : "w-[84px] -translate-x-full md:translate-x-0"}`}
    >
      <div
        className={`flex items-center ${open ? "gap-2.5 px-2" : "justify-center"}`}
      >
        <LogoMark />
        {open && (
          <span className="text-[17px] font-bold tracking-[-.04em]">
            taskboard
          </span>
        )}
      </div>
      <div className="my-8 h-px bg-[#343b32]" />
      <nav className="grid gap-1.5" aria-label="Main navigation">
        <button
          className={`flex items-center gap-3 rounded-lg border-0 px-3 py-3 text-left text-[13px] transition ${view === "tasks" ? "bg-[#2a3428] text-[#eff4df]" : "bg-transparent text-[#9ca69a] hover:bg-[#202a20] hover:text-[#eff4df]"} ${open ? "" : "justify-center"}`}
          type="button"
          onClick={() => onViewChange("tasks")}
          aria-current={view === "tasks" ? "page" : undefined}
          title="My tasks"
        >
          <LayoutGrid
            size={17}
            className={view === "tasks" ? "text-lime-300" : ""}
          />
          {open && (
            <>
              <span>My tasks</span>
              <span className="ml-auto font-mono text-xs text-[#6d776c]">
                {counts.total}
              </span>
            </>
          )}
        </button>
        <button
          className={`flex items-center gap-3 rounded-lg border-0 px-3 py-3 text-left text-[13px] transition ${view === "today" ? "bg-[#2a3428] text-[#eff4df]" : "bg-transparent text-[#9ca69a] hover:bg-[#202a20] hover:text-[#eff4df]"} ${open ? "" : "justify-center"}`}
          type="button"
          onClick={() => onViewChange("today")}
          aria-current={view === "today" ? "page" : undefined}
          title="Today"
        >
          <CalendarDays
            size={17}
            className={view === "today" ? "text-lime-300" : ""}
          />
          {open && <span>Today</span>}
        </button>
      </nav>
      {open && (
        <div className="mt-auto border-t border-[#343b32] pt-5 text-[#8e988c]">
          <p className="m-0 text-[11px] leading-relaxed">
            <strong className="font-medium text-[#dce6d5]">
              Small steps, often.
            </strong>
            <br />A clear board makes space for good work.
          </p>
        </div>
      )}
      <div
        className={`mt-7 flex items-center ${open ? "justify-between" : "justify-center"}`}
      >
        <button
          className="grid h-8 w-8 place-items-center rounded-lg border-0 bg-transparent text-[#9ca69a] transition hover:bg-[#2a3428] hover:text-white"
          type="button"
          onClick={onToggleTheme}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          title="Toggle theme"
        >
          {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
        </button>
        {open && (
          <span className="flex items-center gap-2 font-mono text-[10px] tracking-[.04em] text-[#667063]">
            <span className="h-1.5 w-1.5 rounded-full bg-lime-300 shadow-[0_0_0_3px_#31402d]" />
            Saved locally
          </span>
        )}
      </div>
      <button
        className={`absolute -right-3 top-7 grid h-7 w-7 place-items-center rounded-full border border-[#343b32] bg-[#101410] text-[#c8d1c4] shadow-lg transition hover:border-lime-400 hover:text-lime-300 ${open ? "" : "md:-right-3"}`}
        type="button"
        onClick={onToggle}
        aria-label={open ? "Collapse sidebar" : "Expand sidebar"}
      >
        {open ? <ChevronLeft size={15} /> : <ChevronRight size={15} />}
      </button>
    </aside>
  );
}

export function MobileMenuButton({ onClick }) {
  return (
    <button
      className="grid h-9 w-9 place-items-center rounded-lg border border-[#dedfd7] bg-[#fffef9] text-[#667063] md:hidden dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
      type="button"
      onClick={onClick}
      aria-label="Open sidebar"
    >
      <PanelLeft size={17} />
    </button>
  );
}
