import React from "react";
import { Box, Typography, Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

const TasksFallback = () => {
  return (
    <Box sx={{
      textAlign: "center",
      py: 8,
      px: 2,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 2,
      bgcolor: 'background.paper',
      borderRadius: 4,
      maxWidth: 600,
      mx: 'auto',
      mt: 4,
      boxShadow: 1
    }}>
      <Box sx={{
        p: 2,
        bgcolor: 'action.hover',
        borderRadius: '50%',
        mb: 1
      }}>
        <Typography variant="h5" color="text.secondary">📋</Typography>
      </Box>
      <Typography variant="h5" fontWeight="bold" color="text.primary">
        No Tasks Found
      </Typography>
      <Typography variant="body1" color="text.secondary" maxWidth="sm">
        You currently have no tasks in this category.
        Add a new task to get started and stay organized!
      </Typography>
      <Typography variant="caption" color="error.main">
        NOTE : Please login to start using the app. Ignore this message if you are already logged in.
      </Typography>
      {/* Optional: Add Task Button here if desired, but Navbar has it. */}
    </Box>
  );
};

export default TasksFallback;