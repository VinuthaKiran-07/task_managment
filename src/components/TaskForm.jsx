import { useEffect, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { getDateKey } from "../utils/date";

const EMPTY_FORM = {
  title: "",
  description: "",
  priority: "medium",
  dueDate: getDateKey(),
};

export function TaskForm({
  isOpen,
  onClose,
  onSubmit,
  taskToEdit,
  defaultDueDate,
}) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [error, setError] = useState("");
  const isEditing = Boolean(taskToEdit);

  useEffect(() => {
    setForm(
      taskToEdit
        ? {
            title: taskToEdit.title,
            description: taskToEdit.description,
            priority: taskToEdit.priority,
            dueDate: taskToEdit.dueDate || getDateKey(),
          }
        : { ...EMPTY_FORM, dueDate: defaultDueDate || getDateKey() },
    );
    setError("");
  }, [taskToEdit, isOpen, defaultDueDate]);

  if (!isOpen) return null;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    if (error) setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.title.trim()) {
      setError("Give your task a clear title before saving.");
      return;
    }

    onSubmit({
      ...form,
      title: form.title.trim(),
      description: form.description.trim(),
    });
    setForm(EMPTY_FORM);
  };

  return (
    <div
      className="fixed inset-0 z-30 grid animate-[fade-in_.18s_ease-out] place-items-center bg-[#101410]/50 p-5"
      role="presentation"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <section
        className="w-full max-w-[470px] animate-[rise-in_.26s_cubic-bezier(.16,1,.3,1)] rounded-2xl bg-[#fffef9] p-6 shadow-[0_22px_60px_rgba(16,20,16,.2)] dark:bg-slate-900"
        role="dialog"
        aria-modal="true"
        aria-labelledby="task-form-title"
      >
        <div className="mb-6 flex justify-between gap-4">
          <div>
            <span className="mb-3 block font-mono text-[10px] uppercase tracking-[.16em] text-[#879084]">
              {isEditing ? "Refine task" : "New task"}
            </span>
            <h2
              className="m-0 text-[25px] font-semibold leading-tight tracking-[-.05em] text-[#152017] dark:text-slate-100"
              id="task-form-title"
            >
              {isEditing ? "Make it sharper." : "What needs your attention?"}
            </h2>
          </div>
          <button
            className="grid h-8 w-8 place-items-center rounded-lg border-0 bg-transparent text-[#889188] transition hover:bg-[#e9ece2] hover:text-[#152017] dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
            type="button"
            onClick={onClose}
            aria-label="Close task form"
          >
            <X size={19} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <label
            className="mb-2 flex justify-between text-[11px] font-semibold text-[#566256] dark:text-slate-300"
            htmlFor="task-title"
          >
            Title{" "}
            <span className="font-mono text-[10px] font-normal text-[#9aa39a]">
              Required
            </span>
          </label>
          <input
            className="mb-[18px] w-full rounded-lg border border-[#dce0d6] bg-[#f2f3ec] px-3 py-3 text-xs text-[#152017] outline-none placeholder:text-[#aab1a9] focus:border-lime-500 focus:ring-4 focus:ring-lime-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:ring-lime-900/30"
            id="task-title"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="e.g. Draft the launch outline"
            autoFocus
          />
          <label
            className="mb-2 flex justify-between text-[11px] font-semibold text-[#566256] dark:text-slate-300"
            htmlFor="task-description"
          >
            Description{" "}
            <span className="font-mono text-[10px] font-normal text-[#9aa39a]">
              Optional
            </span>
          </label>
          <textarea
            className="mb-[18px] min-h-24 w-full resize-y rounded-lg border border-[#dce0d6] bg-[#f2f3ec] px-3 py-3 text-xs leading-relaxed text-[#152017] outline-none placeholder:text-[#aab1a9] focus:border-lime-500 focus:ring-4 focus:ring-lime-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:ring-lime-900/30"
            id="task-description"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Add enough context for future-you..."
            rows="4"
          />
          <label
            className="mb-2 flex justify-between text-[11px] font-semibold text-[#566256] dark:text-slate-300"
            htmlFor="task-due-date"
          >
            Due date{" "}
            <span className="font-mono text-[10px] font-normal text-[#9aa39a]">
              Optional
            </span>
          </label>
          <input
            className="mb-[18px] w-full rounded-lg border border-[#dce0d6] bg-[#f2f3ec] px-3 py-3 text-xs text-[#152017] outline-none focus:border-lime-500 focus:ring-4 focus:ring-lime-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:ring-lime-900/30"
            id="task-due-date"
            name="dueDate"
            type="date"
            value={form.dueDate}
            onChange={handleChange}
          />
          <fieldset>
            <legend className="mb-2 flex justify-between text-[11px] font-semibold text-[#566256] dark:text-slate-300">
              Priority
            </legend>
            <div className="flex gap-2">
              {["low", "medium", "high"].map((priority) => (
                <label className="flex-1" key={priority}>
                  <input
                    className="peer absolute opacity-0"
                    type="radio"
                    name="priority"
                    value={priority}
                    checked={form.priority === priority}
                    onChange={handleChange}
                  />
                  <span
                    className={`block rounded-lg border px-2.5 py-2.5 text-center font-mono text-[11px] capitalize transition peer-checked:font-medium ${priority === "high" ? "border-red-200 text-red-600 peer-checked:border-red-500 peer-checked:bg-red-50 dark:border-red-900 dark:text-red-300 dark:peer-checked:bg-red-950/40" : priority === "medium" ? "border-amber-200 text-amber-600 peer-checked:border-amber-500 peer-checked:bg-amber-50 dark:border-amber-900 dark:text-amber-300 dark:peer-checked:bg-amber-950/40" : "border-sky-200 text-sky-600 peer-checked:border-sky-500 peer-checked:bg-sky-50 dark:border-sky-900 dark:text-sky-300 dark:peer-checked:bg-sky-950/40"}`}
                  >
                    {priority}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
          {error && (
            <p
              className="mb-3 mt-[-5px] text-[11px] text-red-600 dark:text-red-300"
              role="alert"
            >
              {error}
            </p>
          )}
          <button
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border-0 bg-[#152017] px-4 py-3 text-xs font-semibold text-[#f3f6ec] shadow-lg shadow-[#152017]/10 transition hover:-translate-y-0.5 hover:bg-[#293829] dark:bg-lime-300 dark:text-[#152017] dark:hover:bg-lime-200"
            type="submit"
          >
            {isEditing ? "Save changes" : "Add task"} <ArrowUpRight size={17} />
          </button>
        </form>
      </section>
    </div>
  );
}
