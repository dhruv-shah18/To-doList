import React, { useState, useEffect } from "react";
import "./CommonCSS.css";
import { useFetchHook } from "../../API/useFetchHook";
import { API } from "../../API/APIRoute";
import TaskCard from "../CardComponent/TaskCard";
import TasksFallback from "./TasksFallback";
import TanTable from "../TanstackTable/TanTable";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import MUITanTable from "../TanstackTable/MUITanTable";

const Tasks = () => {
  const [search, setSearch] = useState("");
  const [allTask, setAllTask] = useState();
  const [isTable, setIsTable] = useState("no");
  const API_URL = API.GETALLTASK;

  const { fetchData } = useFetchHook();

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

  const handleGrid = (event, newAlignment) => {
    setIsTable(newAlignment);
  };

  return (
    <div className="container">
      {allTask?.length > 0 && (
        <div className="flex">
          <h3 className="box-color" style={{ "--bg": "#1a654e" }}>
            Tasks - <span className="tasks">Total {allTask?.length}</span>
          </h3>
          <span className="line" style={{ "--bg": "#1a654e" }}></span>
          <div className="flex">
            <input
              type="text"
              placeholder="Search🔍"
              className="searchbox"
              value={search}
              onChange={handleSearch}
            />
              <ToggleButtonGroup
                value={isTable}
                exclusive
                onChange={handleGrid}
                aria-label="text alignment"
              >
                <ToggleButton value={"yes"} aria-label="Table View">
                  <img src="public/table.svg" style={{ width: '10px', height: '10px', transform: "scale(1.5)" }}/>
                </ToggleButton>
                <ToggleButton value={"no"} aria-label="Card View">
                  <img src="public/card.svg" style={{ width: '10px', height: '10px', transform: "scale(1.5)"  }}/>
                </ToggleButton>
                <ToggleButton value={"both"} aria-label="MUI Card View">
                  <img src="public/all_tasks.svg" style={{ width: '10px', height: '10px', transform: "scale(1.5)"  }}/>
                </ToggleButton>
              </ToggleButtonGroup>
            </div>
          </div>
        )}
        {allTask?.length > 0 ? (
        <React.Fragment>
          {isTable === "no" && (
            <div className="grid">
              {allTask?.map((task) => {
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
          )
        }
        {isTable === "yes" && (<TanTable data={allTask} />)}
        </React.Fragment>
      ) : (
        <TasksFallback />
      )}
      {isTable === "both" && <MUITanTable data={allTask} pagination={true} />}
    </div>
  );
};

export default Tasks;
