import { useMemo, useState } from "react";
import "./App.css";

import Header from "./components/Header";
import TaskStats from "./components/TaskStats";
import TaskForm from "./components/TaskForm";
import TaskFilters from "./components/TaskFilters";
import TaskList from "./components/TaskList";

import { createTask } from "./utils/taskUtils";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [tasks, setTasks] = useLocalStorage("focuslist-tasks", []);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [priority, setPriority] = useState("all");

  const handleAddTask = (title, taskPriority) => {
    const newTask = createTask(title, taskPriority);

    setTasks((currentTasks) => [newTask, ...currentTasks]);
  };

  const handleToggleComplete = (taskId) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              completed: !task.completed,
            }
          : task
      )
    );
  };

  const handleDeleteTask = (taskId) => {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskId)
    );
  };

  const handleEditTask = (taskId, updates) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              ...updates,
            }
          : task
      )
    );
  };

  const filteredTasks = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return tasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(normalizedSearch);

      const matchesStatus =
        status === "all" ||
        (status === "active" && !task.completed) ||
        (status === "completed" && task.completed);

      const matchesPriority =
        priority === "all" ||
        task.priority === priority;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority
      );
    });
  }, [tasks, search, status, priority]);

  const hasActiveFilters =
    search.trim() !== "" ||
    status !== "all" ||
    priority !== "all";

  return (
    <>
      <Header />

      <main className="app-container">
        <section
          className="intro-section"
          aria-labelledby="task-management-heading"
        >
          <div className="intro-content">
            <p className="section-label">
              DAILY PRODUCTIVITY
            </p>

            <h2 id="task-management-heading">
              Organize your tasks and stay focused
            </h2>

            <p>
              Use this task management app to create daily
              tasks, set priorities, track completion, and
              quickly find the work that needs your attention.
              Your tasks are stored locally in your browser,
              so you can continue using FocusList after a
              page refresh.
            </p>
          </div>
        </section>

        <TaskStats tasks={tasks} />

        <section
          className="task-management-section"
          aria-label="Task management"
        >
          <TaskForm onAddTask={handleAddTask} />

          <TaskFilters
            search={search}
            onSearchChange={setSearch}
            status={status}
            onStatusChange={setStatus}
            priority={priority}
            onPriorityChange={setPriority}
          />

          <TaskList
            tasks={filteredTasks}
            onToggleComplete={handleToggleComplete}
            onDeleteTask={handleDeleteTask}
            onEditTask={handleEditTask}
            hasActiveFilters={hasActiveFilters}
          />
        </section>
      </main>
    </>
  );
}

export default App;