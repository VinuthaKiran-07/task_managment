import { useMemo } from "react";
import { CalendarDays } from "lucide-react";
import { CalendarPanel } from "./components/CalendarPanel";
import { DashboardHeader } from "./components/DashboardHeader";
import { MobileMenuButton, Sidebar } from "./components/Sidebar";
import { Stats } from "./components/Stats";
import { TaskForm } from "./components/TaskForm";
import { TaskWorkspace } from "./components/TaskWorkspace";
import { useTaskboardUi } from "./hooks/useTaskboardUi";
import { useTasks } from "./hooks/useTasks";
import { formatDateLabel } from "./utils/date";
import { getVisibleTasks } from "./utils/taskFilters";

function App() {
  const tasksApi = useTasks();
  const ui = useTaskboardUi();
  const visibleTasks = useMemo(
    () => getVisibleTasks(tasksApi.tasks, ui),
    [
      tasksApi.tasks,
      ui.filter,
      ui.priority,
      ui.search,
      ui.view,
      ui.selectedDate,
    ],
  );

  const handleSubmit = (task) => {
    if (ui.taskToEdit) tasksApi.updateTask(ui.taskToEdit.id, task);
    else tasksApi.addTask({ ...task, completed: false });
    ui.closeForm();
  };

  const isTodayView = ui.view === "today";
  const workspaceTitle = isTodayView
    ? formatDateLabel(ui.selectedDate, {
        weekday: "long",
        month: "long",
        day: "numeric",
      })
    : "Your board";
  const workspaceDescription = isTodayView
    ? "Tasks scheduled for this day"
    : "Everything you want to make progress on, in one clear view";

  return (
    <div className={ui.theme === "dark" ? "dark" : ""}>
      <div className="flex min-h-screen bg-[#f5f4ee] text-[#152017] transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
        <Sidebar
          open={ui.sidebarOpen}
          view={ui.view}
          counts={tasksApi.counts}
          theme={ui.theme}
          onViewChange={ui.setView}
          onToggle={ui.toggleSidebar}
          onToggleTheme={ui.toggleTheme}
        />
        <main className="min-w-0 flex-1 overflow-hidden">
          <DashboardHeader
            view={ui.view}
            onAdd={ui.openCreate}
            onOpenSidebar={ui.toggleSidebar}
          />
          <div className="mx-auto max-w-[1180px] px-5 pb-20 pt-12 sm:px-8 sm:pt-16 lg:px-16">
            <section className="relative grid gap-8 md:grid-cols-[minmax(0,1fr)_270px] md:items-end">
              <div>
                <p className="mb-4 font-mono text-[10px] uppercase tracking-[.16em] text-[#879084] dark:text-slate-500">
                  {isTodayView ? "Focus view" : "Wednesday, October 21"}
                </p>
                <h1 className="m-0 text-[clamp(42px,5vw,72px)] font-semibold leading-[.98] tracking-[-.065em] text-[#152017] dark:text-slate-100">
                  Make room for
                  <br />
                  <em className="font-display font-semibold tracking-[-.06em] text-[#405244] dark:text-lime-300">
                    what matters.
                  </em>
                </h1>
              </div>
              <p className="m-0 max-w-[31ch] pb-1 text-[13px] leading-7 text-[#7a827a] dark:text-slate-400">
                A calm place to capture the work in front of you and move it
                forward, one task at a time.
              </p>
            </section>

            <div className="mt-14">
              <Stats counts={tasksApi.counts} />
            </div>

            <div className="mt-16 grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_270px]">
              <TaskWorkspace
                title={workspaceTitle}
                description={workspaceDescription}
                tasks={visibleTasks}
                allTasks={tasksApi.tasks}
                filter={ui.filter}
                priority={ui.priority}
                search={ui.search}
                onFilterChange={ui.setFilter}
                onPriorityChange={ui.setPriority}
                onSearchChange={ui.setSearch}
                onToggle={tasksApi.toggleTask}
                onEdit={ui.openEdit}
                onDelete={tasksApi.deleteTask}
                onAdd={ui.openCreate}
              />
              <div className="lg:sticky lg:top-6">
                <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[.12em] text-[#879084] dark:text-slate-500">
                  <CalendarDays size={15} /> Calendar
                </div>
                <CalendarPanel
                  tasks={tasksApi.tasks}
                  selectedDate={ui.selectedDate}
                  onSelectDate={ui.setSelectedDate}
                  onAdd={() => ui.openCreate(ui.selectedDate)}
                />
              </div>
            </div>
          </div>
        </main>
        <TaskForm
          isOpen={ui.formOpen}
          onClose={ui.closeForm}
          onSubmit={handleSubmit}
          taskToEdit={ui.taskToEdit}
          defaultDueDate={ui.draftDueDate}
        />
      </div>
    </div>
  );
}

export default App;
