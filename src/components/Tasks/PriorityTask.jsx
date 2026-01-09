import React, { useState, useEffect } from "react";
import { useFetchHook } from "../../API/useFetchHook";
import { API } from "../../API/APIRoute";
import TaskCard from "../CardComponent/TaskCard";
import TasksFallback from "./TasksFallback";
import {
  Box,
  Typography,
  TextField,
  Grid,
  Divider,
} from "@mui/material";

const PriorityTask = () => {
  const [search, setSearch] = useState("");
  const [priorityTask, setPriorityTask] = useState();
  const API_URL = API.GETPRIOTASK;
  const { fetchData } = useFetchHook();

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

  const filteredTasks = priorityTask?.filter(task =>
    !search || String(task.taskname).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: 'center', mb: 3, gap: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="h4" fontWeight="bold" sx={{ color: '#f59e0b' }}>
            Priority Tasks
          </Typography>
          <Divider orientation="vertical" flexItem />
          <Typography variant="h6" color="text.secondary">
            Total {priorityTask?.length || 0}
          </Typography>
        </Box>

        <TextField
          placeholder="Search priority tasks..."
          size="small"
          value={search}
          onChange={handleSearch}
          sx={{ bgcolor: 'background.paper', borderRadius: 1, width: { xs: '100%', md: 300 } }}
        />
      </Box>

      {priorityTask?.length > 0 ? (
        <Grid container spacing={3}>
          {filteredTasks?.length > 0 ? filteredTasks.map((task) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={task._id}>
              <TaskCard task={task} onTaskDeleted={fetchingData} />
            </Grid>
          )) : <Typography variant="h6" textAlign="center" width="100%">No matching tasks found.</Typography>}
        </Grid>
      ) : (
        <TasksFallback />
      )}
    </Box>
  );
};

export default PriorityTask;
