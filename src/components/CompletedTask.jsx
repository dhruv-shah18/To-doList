import React, { useState, useEffect } from "react";
import "./CommonCSS.css";
import { useFetchHook } from "../API/useFetchHook";
import { API } from "../API/APIRoute";
import TaskCard from "./TaskCard";
import TasksFallback from "./TasksFallback";

const CompletedTask = () => {
  const [search, setSearch] = useState("");
  const [completedTask, setCompletedTask] = useState();
  const API_URL = API.GETCOMPTASK;
  const { data, loading, error, fetchData } = useFetchHook();

  const handleSearch = (e) => {
    setSearch(e.target.value);  
  };

  const fetchingData = async() => {
    let result = await fetchData({ API_URL : API_URL })
    setCompletedTask(result?.result);
  }

  useEffect(() => {
    fetchingData();
  }, []);

  return (
    <div className="container">
      {completedTask?.length > 0 &&<div className="flex">
        <h3 className="box-color" style={{ "--bg": "#6dce63ff" }}>
          Completed Task{completedTask?.length == 0 ? "" : <span className="tasks"> - Total {completedTask?.length}</span>}
        </h3>
        <span className="line" style={{ "--bg": "#6dce63ff" }}></span>
        <input
          type="text"
          placeholder="Search🔍"
          className="searchbox"
          value={search}
          onChange={handleSearch}
        />
      </div>}
      {completedTask?.length > 0 ? <div className="grid overflow">
        {completedTask?.map((task) => {
          if (search && String(task["taskname"]).includes(search)) {
            return (
              <>
                <TaskCard task={task} />
              </>
            );
          } else if ( !search ) {
            return (
              <>
                <TaskCard task={task} />
              </>
            );
          } else {
            return (
              <>
              </>
            )
          }
        })}
      </div> : <TasksFallback />}
    </div>
  );
};

export default CompletedTask;
