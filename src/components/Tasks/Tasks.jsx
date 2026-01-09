import React, { useState, useEffect } from "react";
import { useFetchHook } from "../../API/useFetchHook";
import { API } from "../../API/APIRoute";
import TaskCard from "../CardComponent/TaskCard";
import TasksFallback from "./TasksFallback";
import TanTable from "../TanstackTable/TanTable";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import MUITanTable from "../TanstackTable/MUITanTable";
import {
  Box,
  Typography,
  TextField,
  Grid,
  Divider,
  Container
} from "@mui/material";
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewListIcon from '@mui/icons-material/ViewList';
import TableViewIcon from '@mui/icons-material/TableView';

const Tasks = () => {
  const [search, setSearch] = useState("");
  const [allTask, setAllTask] = useState();
  const [viewMode, setViewMode] = useState("card"); // 'card', 'table', 'muitable'
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

  const handleViewChange = (event, newView) => {
    if (newView !== null) {
      setViewMode(newView);
    }
  };

  const filteredTasks = allTask?.filter(task =>
    !search || String(task.taskname).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: 'center', mb: 3, gap: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="h4" fontWeight="bold" color="primary">
            Tasks
          </Typography>
          <Divider orientation="vertical" flexItem />
          <Typography variant="h6" color="text.secondary">
            Total {allTask?.length || 0}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', width: { xs: '100%', md: 'auto' } }}>
          <TextField
            placeholder="Search tasks..."
            size="small"
            value={search}
            onChange={handleSearch}
            sx={{ bgcolor: 'background.paper', borderRadius: 1 }}
          />
          <ToggleButtonGroup
            value={viewMode}
            exclusive
            onChange={handleViewChange}
            aria-label="view mode"
            size="small"
          >
            <ToggleButton value="card" aria-label="Card View">
              <ViewModuleIcon />
            </ToggleButton>
            <ToggleButton value="table" aria-label="Table View">
              <ViewListIcon />
            </ToggleButton>
            <ToggleButton value="muitable" aria-label="MUI Table View">
              <TableViewIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>

      {allTask?.length > 0 ? (
        <>
          {viewMode === "card" && (
            filteredTasks?.length > 0 ? (
              <Grid container spacing={3}>
                {filteredTasks.map((task) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={task._id}>
                    <TaskCard task={task} onTaskDeleted={fetchingData} />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography variant="body1" textAlign="center" sx={{ mt: 5 }}>No tasks found.</Typography>
            )
          )}

          {viewMode === "table" && <TanTable data={allTask} />}
          {viewMode === "muitable" && <MUITanTable data={allTask} pagination={true} />}
        </>
      ) : (
        <TasksFallback />
      )}
    </Box>
  );
};

export default Tasks;
