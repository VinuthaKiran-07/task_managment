import { Check, Circle, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

const priorityLabels = { low: "Low", medium: "Medium", high: "High" };

export function TaskCard({ task, onToggle, onEdit, onDelete }) {
  return (
    <article
      className={`group grid grid-cols-[29px_1fr_auto] items-start gap-3.5 border-b border-[#dedfd7] px-0.5 py-5 transition duration-200 hover:translate-x-1 hover:border-[#c7cfc0] hover:bg-white/70 dark:border-slate-700 dark:hover:border-slate-600 dark:hover:bg-slate-900/60 ${task.completed ? "opacity-70" : ""}`}
    >
      <button
        className={`grid h-6 w-6 place-items-center rounded-full border-0 p-1 text-[#a0a89f] transition hover:scale-110 hover:bg-lime-100 hover:text-emerald-700 dark:hover:bg-lime-900/50 ${task.completed ? "animate-[check-pop_.35s_cubic-bezier(.16,1,.3,1)] bg-emerald-200 text-emerald-800 dark:bg-emerald-900/70 dark:text-emerald-300" : ""}`}
        type="button"
        onClick={() => onToggle(task.id)}
        aria-label={
          task.completed
            ? `Mark ${task.title} as pending`
            : `Mark ${task.title} as completed`
        }
      >
        {task.completed ? (
          <Check size={15} strokeWidth={3} />
        ) : (
          <Circle size={19} strokeWidth={1.7} />
        )}
      </button>
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-3">
          <h3
            className={`text-sm font-semibold tracking-[-.02em] text-[#152017] dark:text-slate-100 ${task.completed ? "text-[#929a91] line-through decoration-[#b3bcb0] dark:text-slate-500" : ""}`}
          >
            {task.title}
          </h3>
          <Badge variant={task.priority}>
            <i
              className={`h-1.5 w-1.5 rounded-full ${task.priority === "high" ? "bg-red-500" : task.priority === "medium" ? "bg-amber-500" : "bg-sky-500"}`}
            />
            {priorityLabels[task.priority]}
          </Badge>
        </div>
        {task.description && (
          <p className="mt-2 max-w-[65ch] text-xs leading-relaxed text-[#828a82] dark:text-slate-400">
            {task.description}
          </p>
        )}
      </div>
      <div className="flex gap-1 opacity-0 transition group-hover:opacity-100 focus-within:opacity-100 max-sm:col-start-2 max-sm:mt-[-5px] max-sm:opacity-100">
        <Button
          variant="ghost"
          size="iconSm"
          onClick={() => onEdit(task)}
          aria-label={`Edit ${task.title}`}
        >
          <Pencil size={15} />
        </Button>
        <Button
          variant="destructive"
          size="iconSm"
          onClick={() => onDelete(task.id)}
          aria-label={`Delete ${task.title}`}
        >
          <Trash2 size={15} />
        </Button>
      </div>
    </article>
  );
}
