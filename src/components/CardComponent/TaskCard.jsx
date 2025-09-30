import React, { useState } from "react";
import "./TaskCard.css";
import { useFetchHook } from "../../API/useFetchHook";
import { API } from "../../API/APIRoute";
import AddTask from "../../model/model/AddTask";

const TaskCard = ({ task, onTaskDeleted }) => {
  const { taskname, completed, important, priority, _id } = task;
  const [openModal, setOpenModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Custom fetch hook (for delete)
  const { fetchData } = useFetchHook();

  const handleEditTask = () => {
    setOpenModal(true);
  };

  // 📌 Right-click opens delete confirmation
  const handleRightClick = (e) => {
    e.preventDefault(); // prevent default context menu
    setShowDeleteConfirm(true);
  };


  const handleDeleteConfirm = async () => {
    const result = await fetchData({ API_URL : API.DELETETASK(_id), METHOD_TYPE : "DELETE" });

    if (result && onTaskDeleted) {
      onTaskDeleted(_id); // Optional: notify parent to remove from UI
    }

    setShowDeleteConfirm(false);
  };

  return (
    <>
      {/* Edit modal */}
      {openModal && (
        <>
          <div className="add-task-overlay" onClick={() => setOpenModal(false)} />
          <div className="add-task-form">
            <AddTask setOpen={setOpenModal} addEditData={task} />
          </div>
        </>
      )}

      {/* Delete confirmation modal */}
      {showDeleteConfirm && (
        <>
          <div className="add-task-overlay" onClick={() => setShowDeleteConfirm(false)} />
          <div className="add-task-form">
            <p>Are you sure you want to delete this task?</p>
            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <button onClick={handleDeleteConfirm} style={{ background: 'red' }}>Yes, Delete</button>
              <button onClick={() => setShowDeleteConfirm(false)}>Cancel</button>
            </div>
          </div>
        </>
      )}

      {/* Task card */}
      <div
        className={`task-card ${completed ? "completed" : ""} ${important ? "important" : ""}`}
        onClick={handleEditTask}
        onContextMenu={handleRightClick} // 📌 handle right-click
      >
        <div className="task-header">
          <h3 className="task-title">{taskname}</h3>
          <div>{completed && <span className="status-icon">✅</span>}</div>
        </div>

        <div className="task-details">
          <span className={`priority-tag ${priority}`}>
            {priority?.toUpperCase() || "N/A"}
          </span>
          {important && <span className="important-badge">Important</span>}
        </div>
      </div>
    </>
  );
};

export default TaskCard;
