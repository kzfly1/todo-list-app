import React, { useState, useEffect } from "react";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all");

  // Read tasks from localStorage
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  // Save tasks to localStorage when tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks(prevTasks => [
        ...prevTasks,
        { id: Date.now(), content: newTask, completed: false },
      ]);
      setNewTask("");
    }
  };

  const completeTask = (id, completed) => {
    setTasks(
      tasks.map(task => (task.id === id ? { ...task, completed } : task))
    );
  };

  const deleteTask = id => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === "completed") return task.completed;
    if (filter === "active") return !task.completed;
    return true;
  });

  const handleKeyDown = e => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  const updateTask = (id, content) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, content } : task)));
  };

  const reorderTasks = (draggedTask, targetTask) => {
    const draggedIndex = tasks.findIndex(task => task.id === draggedTask.id);
    const targetIndex = tasks.findIndex(task => task.id === targetTask.id);

    const updatedTasks = [...tasks];
    updatedTasks.splice(draggedIndex, 1);
    updatedTasks.splice(targetIndex, 0, draggedTask);
    setTasks(updatedTasks); // Update the tasks
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">To-Do List</h1>

      {/* Input Group */}
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
          placeholder="Add a task"
          onKeyDown={handleKeyDown}
        />
        <button className="btn btn-primary" onClick={addTask}>
          Add
        </button>
      </div>

      {/* Filter Buttons */}
      <div className="btn-group mb-3">
        <button
          className={`btn btn-outline-secondary ${
            filter === "all" ? "active" : ""
          }`}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={`btn btn-outline-secondary ${
            filter === "active" ? "active" : ""
          }`}
          onClick={() => setFilter("active")}
        >
          In-progress
        </button>
        <button
          className={`btn btn-outline-secondary ${
            filter === "completed" ? "active" : ""
          }`}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
      </div>

      {/* Task List */}
      <TaskList
        tasks={filteredTasks}
        onComplete={completeTask}
        onDelete={deleteTask}
        onUpdate={updateTask}
        onReorder={reorderTasks}
      />
    </div>
  );
}

export default App;
