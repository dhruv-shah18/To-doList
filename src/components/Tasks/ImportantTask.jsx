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

  const filteredTasks = importantTask?.filter(task =>
    !search || String(task.taskname).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: 'center', mb: 3, gap: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="h4" fontWeight="bold" sx={{ color: '#ef4444' }}>
            Important Tasks
          </Typography>
          <Divider orientation="vertical" flexItem />
          <Typography variant="h6" color="text.secondary">
            Total {importantTask?.length || 0}
          </Typography>
        </Box>

        <TextField
          placeholder="Search important tasks..."
          size="small"
          value={search}
          onChange={handleSearch}
          sx={{ bgcolor: 'background.paper', borderRadius: 1, width: { xs: '100%', md: 300 } }}
        />
      </Box>

      {importantTask?.length > 0 ? (
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

export default ImportantTask;
