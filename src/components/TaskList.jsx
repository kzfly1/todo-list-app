import React, { useState } from "react";
import Task from "./Task";

function TaskList({ tasks, onComplete, onDelete, onUpdate, onReorder }) {
  const [draggedTask, setDraggedTask] = useState(null);

  const handleDragStart = task => {
    setDraggedTask(task);
  };

  const handleDragOver = e => {
    e.preventDefault();
  };

  const handleDrop = targetTask => {
    if (draggedTask && targetTask.id !== draggedTask.id) {
      onReorder(draggedTask, targetTask);
    }
    setDraggedTask(null);
  };

  return (
    <ul className="list-group list-unstyled">
      {tasks.map(task => (
        <li
          key={task.id}
          draggable
          onDragStart={() => handleDragStart(task)}
          onDragOver={handleDragOver}
          onDrop={() => handleDrop(task)}
          className="mb-3"
        >
          <Task
            task={task}
            onComplete={onComplete}
            onDelete={onDelete}
            onUpdate={onUpdate}
            onDragStart={handleDragStart}
          />
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
