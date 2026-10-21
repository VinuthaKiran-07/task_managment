import { useEffect, useMemo, useState } from "react";
import { seedTasks } from "../data/seedTasks";
import { getDateKey } from "../utils/date";

const STORAGE_KEY = "taskboard.tasks.v1";

function readStoredTasks() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const tasks = stored ? JSON.parse(stored) : seedTasks;
    return tasks.map((task) => ({
      ...task,
      dueDate: task.dueDate || getDateKey(task.createdAt),
    }));
  } catch {
    return seedTasks;
  }
}

export function useTasks() {
  const [tasks, setTasks] = useState(readStoredTasks);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const counts = useMemo(
    () => ({
      total: tasks.length,
      completed: tasks.filter((task) => task.completed).length,
      pending: tasks.filter((task) => !task.completed).length,
    }),
    [tasks],
  );

  const addTask = (task) => {
    setTasks((currentTasks) => [
      {
        ...task,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        dueDate: task.dueDate || getDateKey(),
      },
      ...currentTasks,
    ]);
  };

  const updateTask = (id, updates) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id ? { ...task, ...updates } : task,
      ),
    );
  };

  const toggleTask = (id) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const deleteTask = (id) => {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id));
  };

  return { tasks, counts, addTask, updateTask, toggleTask, deleteTask };
}
