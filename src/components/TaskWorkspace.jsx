import { FilterBar } from "./FilterBar";
import { TaskList } from "./TaskList";

export function TaskWorkspace({
  title,
  description,
  tasks,
  allTasks,
  filter,
  priority,
  search,
  onFilterChange,
  onPriorityChange,
  onSearchChange,
  onToggle,
  onEdit,
  onDelete,
  onAdd,
}) {
  return (
    <section aria-labelledby="tasks-heading">
      <div className="mb-5">
        <h2
          className="m-0 text-[20px] font-semibold tracking-[-.04em] text-[#152017] dark:text-slate-100"
          id="tasks-heading"
        >
          {title}
        </h2>
        <p className="mt-1 text-xs text-[#929991] dark:text-slate-500">
          {description} · {tasks.length} {tasks.length === 1 ? "task" : "tasks"}{" "}
          in view
        </p>
      </div>
      <FilterBar
        filter={filter}
        priority={priority}
        search={search}
        onFilterChange={onFilterChange}
        onPriorityChange={onPriorityChange}
        onSearchChange={onSearchChange}
      />
      <TaskList
        tasks={tasks}
        hasTasks={allTasks.length > 0}
        onToggle={onToggle}
        onEdit={onEdit}
        onDelete={onDelete}
        onAdd={onAdd}
      />
    </section>
  );
}
