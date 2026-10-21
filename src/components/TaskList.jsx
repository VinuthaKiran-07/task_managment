import { ClipboardList, Plus } from "lucide-react";
import { TaskCard } from "./TaskCard";

export function TaskList({
  tasks,
  hasTasks,
  onToggle,
  onEdit,
  onDelete,
  onAdd,
}) {
  if (!tasks.length) {
    return (
      <div className="mt-5 rounded-xl border border-dashed border-[#cdd2c8] bg-white/60 px-5 py-14 text-center dark:border-slate-700 dark:bg-slate-900/50">
        <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full bg-lime-100 text-emerald-700 dark:bg-lime-900/50 dark:text-lime-300">
          <ClipboardList size={24} />
        </div>
        <h3 className="text-[15px] font-semibold text-[#152017] dark:text-slate-100">
          {hasTasks ? "Nothing matches that search." : "Your board is clear."}
        </h3>
        <p className="mt-1 text-xs text-[#899189] dark:text-slate-400">
          {hasTasks
            ? "Try a different title or switch to another view."
            : "Capture the first thing you want to make progress on."}
        </p>
        {!hasTasks && (
          <button
            className="mt-5 inline-flex items-center gap-1.5 border-0 bg-transparent text-xs font-semibold text-emerald-800 transition hover:gap-2.5 hover:underline dark:text-lime-300"
            type="button"
            onClick={onAdd}
          >
            Add your first task <Plus size={15} />
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
