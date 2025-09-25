import React, { useState, useEffect } from "react";
import "./CommonCSS.css";
import { useFetchHook } from "../API/useFetchHook";
import { API } from "../API/APIRoute";
import TaskCard from "./TaskCard";
import TasksFallback from "./TasksFallback";

const Tasks = () => {
  const [search, setSearch] = useState("");
  const [allTask, setAllTask] = useState();
  const API_URL = API.GETALLTASK;
  
  const { data, loading, error, fetchData } = useFetchHook();
  
  const fetchingData = async () => {
    let result = await fetchData({ API_URL: API_URL });
    setAllTask(result?.result);
  };

  useEffect(() => {
    fetchingData();
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="container">
      {allTask?.length > 0 &&<div className="flex">
        <h3 className="box-color" style={{ "--bg": "#1a654e" }}>
          Tasks - <span className="tasks">Total {allTask?.length}</span>
        </h3>
        <span className="line" style={{ "--bg": "#1a654e" }}></span>
        <input type='text' placeholder='Search🔍' className='searchbox' value={search} onChange={handleSearch}/>
      </div>}
       {allTask?.length > 0 ? <div className="grid">{allTask?.map((task) => {
        if (search && String(task["taskname"]).includes(search)) {
          return (<>
             <TaskCard  task={task}/>
          </>)
        } else if (!search) {
          return (<>
            <TaskCard  task={task}/>
          </>)
        } else {
          return (<></>);
        }
      })}</div> : <TasksFallback />}
    </div>
  );
};

export default Tasks;
