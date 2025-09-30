import React from "react";
import "./CommonCSS.css";

const TasksFallback = () => {
  return (
    <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
      <div className="center" style={{ "--bg": "#f1f3f2ff", marginBottom: "2rem" }}>
        <h2>No Tasks Found</h2>
      </div>
      {/* <span className="line" style={{ "--bg": "#1a654e", display: "block", margin: "1rem auto", width: "60%" }}></span> */}
      <p style={{ color: "#555", fontSize: "1.2rem" }}>
        You currently have no tasks.
        Add a new task to get started!
      </p>
      <p style={{ color: "#c72424ff", fontSize: "1rem" }}> NOTE : Please login to start using the app. Ignore this message if you are already logged in.</p>
    </div>
  );
};

export default TasksFallback;