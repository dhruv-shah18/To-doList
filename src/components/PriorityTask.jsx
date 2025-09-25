import React, { useState, useEffect } from "react";
import "./CommonCSS.css";
import { useFetchHook } from "../API/useFetchHook";
import { API } from "../API/APIRoute";
import TaskCard from "./TaskCard";

const PriorityTask = () => {
  const [search, setSearch] = useState("");
  const [priorityTask, setPriorityTask] = useState();
  const API_URL = API.GETPRIOTASK;
  const { data, loading, error, fetchData } = useFetchHook();

  const fetchingData = async () => {
    let result = await fetchData({ API_URL: API_URL });
    setPriorityTask(result?.result);
  };

  useEffect(() => {
    fetchingData();
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="container">
      <div className="flex">
        <h3 className="box-color" style={{ "--bg": "#7793c5" }}>
          Priority Task - <span className="tasks">Total {priorityTask?.length}</span>
        </h3>
        <span className="line" style={{ "--bg": "#7793c5" }}></span>
        <input
          type="text"
          placeholder="Search🔍"
          className="searchbox"
          value={search}
          onChange={handleSearch}
        />
      </div>
      <div className="grid">
        {priorityTask?.map((task) => {
          if (search && String(task["taskname"]).includes(search)) {
            return (
              <>
                <TaskCard task={task} />
              </>
            );
          } else if (!search) {
            return (
              <>
                <TaskCard task={task} />
              </>
            );
          } else {
            return <></>;
          }
        })}
      </div>
    </div>
  );
};

export default PriorityTask;
