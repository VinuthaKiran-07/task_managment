import { getDateKey } from "./date";

export const FILTERS = [
  { id: "all", label: "All tasks" },
  { id: "active", label: "Active" },
  { id: "completed", label: "Completed" },
];

export function getVisibleTasks(
  tasks,
  { filter, priority = "all", search, view = "tasks", selectedDate },
) {
  const normalizedSearch = search.trim().toLowerCase();
  const dateKey = selectedDate || getDateKey();

  return tasks.filter((task) => {
    const matchesView = view !== "today" || task.dueDate === dateKey;
    const matchesFilter =
      filter === "all" ||
      (filter === "active" && !task.completed) ||
      (filter === "completed" && task.completed);
    const matchesPriority = priority === "all" || task.priority === priority;
    const matchesSearch =
      !normalizedSearch || task.title.toLowerCase().includes(normalizedSearch);
    return matchesView && matchesFilter && matchesPriority && matchesSearch;
  });
}
