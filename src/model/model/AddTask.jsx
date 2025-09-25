import React, { useState } from "react";
import "./AddTask.css";
import { useFetchHook } from "../../API/useFetchHook";
import { API } from "../../API/APIRoute";

const AddTask = ({ setOpen, addEditData }) => {
  const INPUT = {
    taskname: addEditData ? addEditData?.taskname : "",
    completed: addEditData ? addEditData?.completed : false,
    important: addEditData ? addEditData?.important : false,
    priority: addEditData ? addEditData?.priority : "low",
  };
  const [formData, setFormData] = useState(INPUT);

  const { data, fetchData } = useFetchHook();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    let result;
    if ( !addEditData ) {
      result = await fetchData({
        API_URL: API.ADDNEWTASK,
        PAYLOAD: formData,
        METHOD_TYPE: "POST",
      });
    } else {
      const input = {
        _id: addEditData?._id,
        ...formData
      }
      result = await fetchData({
        API_URL: API.UPDATETASK,
        PAYLOAD: input,
        METHOD_TYPE : 'PUT',
      })
    }

    // Reset form (optional)
    if (result) {
      setFormData({
        taskname: "",
        completed: false,
        important: false,
        priority: "low",
      });
      setOpen(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="add-task-container">
      <form onSubmit={handleSubmitForm} className="add-task-form">
        <div className="flex-add">
          <h5 className="header-h5">{addEditData ? 'Edit' : 'Add'} New Task</h5>
          <img
            src="public/close.svg"
            className="icon-close"
            onClick={handleClose}
          />
        </div>
        <div>
          <label htmlFor="taskname">
            Task Name<span style={{ color: "red" }}>*</span>:
          </label>
          <input
            type="text"
            id="taskname"
            name="taskname"
            value={formData.taskname}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="completed">
            <input
              type="checkbox"
              id="completed"
              name="completed"
              checked={formData.completed}
              onChange={handleChange}
            />
            Completed
          </label>
        </div>

        <div>
          <label htmlFor="important">
            <input
              type="checkbox"
              id="important"
              name="important"
              checked={formData.important}
              onChange={handleChange}
            />
            Mark as Important
          </label>
        </div>

        <div>
          <label htmlFor="priority">Priority:</label>
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <button type="submit">{addEditData ? 'Edit' : 'Add'} Task</button>
      </form>
    </div>
  );
};

export default AddTask;
