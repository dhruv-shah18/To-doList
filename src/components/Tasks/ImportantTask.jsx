import React, { useState, useEffect } from "react";
import "./CommonCSS.css";
import { useFetchHook } from "../../API/useFetchHook";
import { API } from "../../API/APIRoute";
import TaskCard from "../CardComponent/TaskCard";
import TasksFallback from "./TasksFallback";

const ImportantTask = () => {
  const [search, setSearch] = useState("");
  const [importantTask, setImportantTask] = useState();
  const API_URL = API.GETIMPTASK;
  const { fetchData } = useFetchHook();

  const fetchingData = async () => {
    let result = await fetchData({ API_URL: API_URL });
    setImportantTask(result?.result);
  };

  useEffect(() => {
    fetchingData();
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="container">
     {importantTask?.length > 0 && <div className="flex">
        <h3 className="box-color" style={{ "--bg": "#ec505c" }}>
          Important Task - <span className="tasks"> Total {importantTask?.length}</span>
        </h3>
        <span className="line" style={{ "--bg": "#ec505c" }}></span>
        <input
          type="text"
          placeholder="Search🔍"
          className="searchbox"
          value={search}
          onChange={handleSearch}
        />
      </div>}
      {importantTask?.length > 0 ? <div className="grid overflow">
        {importantTask?.map((task) => {
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
      </div> : <TasksFallback /> }
    </div>
  );
};

export default ImportantTask;
