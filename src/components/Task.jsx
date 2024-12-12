import React, { useState } from "react";

function Task({ task, onComplete, onDelete, onUpdate, onDragStart }) {
  const [isEditing, setIsEditing] = useState(false); // Track edit mode
  const [editedContent, setEditedContent] = useState(task.content); // Store edited content

  const handleSave = () => {
    if (editedContent.trim() !== "") {
      onUpdate(task.id, editedContent);
      setIsEditing(false);
    }
  };

  return (
    <div
      className={`d-flex align-items-center list-group-item ${
        task.completed ? "list-group-item-success" : ""
      }`}
      style={{
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Drag handle */}
      <div
        className="drag-handle me-3"
        draggable
        onDragStart={() => onDragStart(task)}
        style={{
          cursor: "grab",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            background: "#6c757d",
            width: "16px",
            height: "2px",
            marginBottom: "3px",
          }}
        ></span>
        <span
          style={{
            background: "#6c757d",
            width: "16px",
            height: "2px",
            marginBottom: "3px",
          }}
        ></span>
        <span
          style={{ background: "#6c757d", width: "16px", height: "2px" }}
        ></span>
      </div>

      {/* Task content or input field for editing */}
      {isEditing ? (
        <input
          type="text"
          className="form-control me-3"
          value={editedContent}
          onChange={e => setEditedContent(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleSave()} // Save on Enter
        />
      ) : (
        <span
          className={`flex-grow-1 ${
            task.completed ? "text-decoration-line-through text-muted" : ""
          }`}
          style={{ fontSize: "1rem" }}
        >
          {task.content}
        </span>
      )}

      {/* Action buttons */}
      <div className="d-flex">
        {isEditing ? (
          <>
            <button
              className="btn btn-sm btn-success me-2"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              className="btn btn-sm btn-secondary me-2"
              onClick={() => setIsEditing(false)} // Cancel edit
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              className="btn btn-sm btn-success me-2"
              onClick={() => onComplete(task.id, !task.completed)}
            >
              {task.completed ? "Undo" : "Complete"}
            </button>
            <button
              className="btn btn-sm btn-danger me-2"
              onClick={() => onDelete(task.id)}
            >
              Delete
            </button>
            <button
              className="btn btn-sm btn-primary"
              onClick={() => setIsEditing(true)} // Enter edit mode
            >
              Edit
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Task;
