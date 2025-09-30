import { useState } from "react";
import "./Navbar.css";
import { NavLink, useNavigate } from "react-router";
import { useRef } from "react";
import AddTask from "../../model/model/AddTask";
import { useFetchHook } from "../../API/useFetchHook";
import { API } from "../../API/APIRoute";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const menuRef = useRef(null);
  const [openAddTaskForm, setOpenAddTaskForm] = useState(false);
  const { fetchData } = useFetchHook();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleMenuToggle = (e) => {
    if (menuRef.current) {
      menuRef.current.classList.toggle("show-menu");
    }
  };

  const handleAddNewTaskForm = (e) => {
    setOpenAddTaskForm((prev) => !prev);
  };

  const handleLogout = async (e) => {
    const result = await fetchData({
      API_URL: API.USER_LOGOUT,
      METHOD_TYPE: "POST",
    });
    if (result.success) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      // window.href
      navigate("/login");
    }
  };

  return (
    <div>
      <div className="navbar">
        <nav className="flex">
          <div className="mp-logo">
            <NavLink to={"/alltasks"} className={({ isActive }) => isActive ? "li-links active-link" : "li-links"}>
              <img src="public/Logo.png" className="logo" />
            </NavLink>
          </div>
          <div className="flex-title">
            <p className="no-margin-padding">Task Force</p>
            <p className="no-margin-padding small">
              Task Manager / To-do Manager
            </p>
          </div>
        </nav>
        <ul className="ul-link">
          {isAuthenticated && <li>
            <button
              type="button"
              onClick={handleAddNewTaskForm}
              className="add-button"
            >
              Add Task
            </button>
          </li>}
          <li>
            <NavLink to={"/alltasks"} className={({ isActive }) => isActive ? "li-links active-link" : "li-links"}>
              <img src="public/all_tasks.svg" className="icon" />
              Tasks
            </NavLink>
          </li>
          <li>
            <NavLink to={"/imptasks"}  style={{ "--bg": "#ec505c" }} className={({ isActive }) => isActive ? "li-links active-link" : "li-links"}>
              <img src="public/important_task.svg" className="icon" />
              Important
            </NavLink>
          </li>
          <li>
            <NavLink to={"/prioritytasks"}  style={{ "--bg": "#7793c5" }} className={({ isActive }) => isActive ? "li-links active-link" : "li-links"}>
              <img src="public/priority_task.svg" className="icon" />
              Priority
            </NavLink>
          </li>
          <li>
            <NavLink to={"/completedtasks"} style={{ "--bg": "#6dce63ff" }} className={({ isActive }) => isActive ? "li-links active-link" : "li-links"}>
              <img src="public/completed_task.svg" className="icon" />
              Completed
            </NavLink>
          </li>
         {!isAuthenticated && <li className="btn">
            <NavLink to={"/login"} className="li-links">
              <span>Login / Register</span>
            </NavLink>
          </li>}
          {isAuthenticated && <li className="btn-button">
            <button type="button" className="btn-links" onClick={handleLogout}>
              <img src="public/logout.svg" className="icon" />
              Logout
            </button>
          </li>}
        </ul>
        <div className="menu-div">
          <button
            type="button"
            className="add-button"
            onClick={handleAddNewTaskForm}
          >
            Add Task
          </button>
          <div onClick={handleMenuToggle}>
            <img src="public/menu.svg" className="menu-icon" />
          </div>
        </div>
      </div>
      <ul ref={menuRef} className="ul-button" popoverTarget="body">
        <li>
          <NavLink to={"/alltasks"} className="btn-links">
            <img src="public/all_tasks.svg" className="icon" />
            Tasks
          </NavLink>
        </li>
        <li>
          <NavLink to={"/imptasks"} className="btn-links">
            <img src="public/important_task.svg" className="icon" />
            Important
          </NavLink>
        </li>
        <li>
          <NavLink to={"/prioritytasks"} className="btn-links">
            <img src="public/priority_task.svg" className="icon" />
            Priority
          </NavLink>
        </li>
        <li>
          <NavLink to={"/completedtasks"} className="btn-links">
            <img src="public/completed_task.svg" className="icon" />
            Completed
          </NavLink>
        </li>
        {!isAuthenticated && <li className="btn">
          <NavLink to={"/login"} className="btn-links">
            <span>Login / Register</span>
          </NavLink>
        </li>}
       {isAuthenticated &&<li className="btn">
          <button type="button" className="btn-links">
            <img src="public/logout.svg" className="icon" />
            Logout
          </button>
        </li>}
      </ul>
      {openAddTaskForm && (
        <>
          <div
            className="add-task-overlay"
            onClick={() => setOpenAddTaskForm(false)}
          />
          <div className="add-task-form">
            <AddTask setOpen={setOpenAddTaskForm} />
          </div>
        </>
      )}
    </div>
  );
};
export default Navbar;
