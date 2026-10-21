import { ChevronLeft, ChevronRight, CircleDot, Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { formatDateLabel, getDateKey } from "../utils/date";

const WEEKDAYS = ["M", "T", "W", "T", "F", "S", "S"];

function getMonthDays(monthDate) {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const offset = (firstDay.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  return Array.from(
    { length: Math.ceil((offset + daysInMonth) / 7) * 7 },
    (_, index) => {
      const day = index - offset + 1;
      return day < 1 || day > daysInMonth ? null : new Date(year, month, day);
    },
  );
}

export function CalendarPanel({ tasks, selectedDate, onSelectDate, onAdd }) {
  const selected = new Date(`${selectedDate}T12:00:00`);
  const [monthDate, setMonthDate] = useState(
    new Date(selected.getFullYear(), selected.getMonth(), 1),
  );
  const days = useMemo(() => getMonthDays(monthDate), [monthDate]);
  const tasksByDate = useMemo(
    () =>
      tasks.reduce((result, task) => {
        result[task.dueDate] = (result[task.dueDate] || 0) + 1;
        return result;
      }, {}),
    [tasks],
  );

  const shiftMonth = (amount) =>
    setMonthDate(
      (current) =>
        new Date(current.getFullYear(), current.getMonth() + amount, 1),
    );

  return (
    <aside className="rounded-2xl border border-[#dedfd7] bg-[#fffef9] p-5 dark:border-slate-700 dark:bg-slate-900">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="mb-1 font-mono text-[10px] uppercase tracking-[.14em] text-[#899188] dark:text-slate-500">
            Schedule
          </p>
          <h3 className="m-0 text-base font-semibold tracking-[-.03em] dark:text-slate-100">
            {formatDateLabel(selectedDate, {
              weekday: "long",
              month: "short",
              day: "numeric",
            })}
          </h3>
        </div>
        <button
          className="grid h-8 w-8 place-items-center rounded-lg border border-[#dedfd7] bg-transparent text-[#718078] transition hover:bg-lime-50 dark:border-slate-700 dark:text-white dark:hover:bg-lime-950/30"
          type="button"
          onClick={onAdd}
          aria-label="Add task for selected date"
        >
          <Plus size={16} />
        </button>
      </div>
      <div className="mt-5 flex items-center justify-between">
        <button
          className="grid h-7 w-7 place-items-center rounded-md border-0 bg-transparent text-[#718078] hover:bg-[#edf0e5] dark:text-slate-300 dark:hover:bg-slate-800"
          type="button"
          onClick={() => shiftMonth(-1)}
          aria-label="Previous month"
        >
          <ChevronLeft size={16} />
        </button>
        <strong className="text-sm dark:text-slate-200">
          {monthDate.toLocaleDateString(undefined, {
            month: "long",
            year: "numeric",
          })}
        </strong>
        <button
          className="grid h-7 w-7 place-items-center rounded-md border-0 bg-transparent text-[#718078] hover:bg-[#edf0e5] dark:text-slate-300 dark:hover:bg-slate-800"
          type="button"
          onClick={() => shiftMonth(1)}
          aria-label="Next month"
        >
          <ChevronRight size={16} />
        </button>
      </div>
      <div className="mt-4 grid grid-cols-7 gap-1 text-center">
        <div className="contents">
          {WEEKDAYS.map((day, index) => (
            <span
              className="py-1 font-mono text-[9px] text-[#a0a89f] dark:text-slate-500"
              key={`${day}-${index}`}
            >
              {day}
            </span>
          ))}
        </div>
        {days.map((date, index) => {
          const key = date ? getDateKey(date) : `empty-${index}`;
          const isSelected = date && key === selectedDate;
          const count = date ? tasksByDate[key] : 0;
          return (
            <button
              className={`relative aspect-square rounded-lg border-0 text-xs transition ${!date ? "pointer-events-none bg-transparent" : isSelected ? "bg-[#152017] font-semibold text-white dark:bg-lime-300 dark:text-[#152017]" : "bg-transparent text-[#566256] hover:bg-lime-100 dark:text-white dark:hover:bg-slate-800"}`}
              key={key}
              type="button"
              onClick={() => date && onSelectDate(key)}
              disabled={!date}
            >
              {date?.getDate()}
              {count ? (
                <CircleDot
                  className={`absolute bottom-1 left-1/2 -translate-x-1/2 ${isSelected ? "text-lime-300 dark:text-[#152017]" : "text-lime-600 dark:text-lime-300"}`}
                  size={6}
                  fill="currentColor"
                />
              ) : null}
            </button>
          );
        })}
      </div>
      <div className="mt-5 flex items-center justify-between border-t border-[#eef0e9] pt-4 text-[11px] dark:border-slate-800">
        <span className="flex items-center gap-2 text-[#899188] dark:text-slate-400">
          <span className="h-2 w-2 rounded-full bg-lime-500" />
          {tasksByDate[selectedDate] || 0} scheduled
        </span>
        <button
          className="border-0 bg-transparent font-semibold text-emerald-800 hover:underline dark:text-lime-300"
          type="button"
          onClick={() => onSelectDate(getDateKey())}
        >
          Jump to today
        </button>
      </div>
    </aside>
  );
}
