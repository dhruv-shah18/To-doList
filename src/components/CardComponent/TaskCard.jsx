import React, { useState } from "react";
import { useFetchHook } from "../../API/useFetchHook";
import { API } from "../../API/APIRoute";
import AddTask from "../../model/model/AddTask";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
  useTheme,
  alpha
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningIcon from '@mui/icons-material/Warning';

const TaskCard = ({ task, onTaskDeleted }) => {
  const { taskname, completed, important, priority, _id } = task;
  const [openModal, setOpenModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const theme = useTheme();

  // Custom fetch hook (for delete)
  const { fetchData } = useFetchHook();

  const handleEditTask = (e) => {
    e.stopPropagation();
    setOpenModal(true);
  };

  const handleDeleteConfirm = async () => {
    const result = await fetchData({ API_URL: API.DELETETASK(_id), METHOD_TYPE: "DELETE" });

    if (result && onTaskDeleted) {
      onTaskDeleted(_id);
    }
    setShowDeleteConfirm(false);
  };

  const getPriorityColor = (p) => {
    switch (p?.toLowerCase()) {
      case 'high': return theme.palette.error.main;
      case 'medium': return theme.palette.warning.main;
      case 'low': return theme.palette.success.main;
      default: return theme.palette.info.main;
    }
  };

  const priorityColor = getPriorityColor(priority);

  return (
    <>
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative',
          cursor: 'pointer',
          background: theme.palette.mode === 'light'
            ? 'rgba(255, 255, 255, 0.7)'
            : 'rgba(30, 41, 59, 0.6)',
          backdropFilter: 'blur(20px)',
          border: `1px solid ${theme.palette.mode === 'light' ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.05)'}`,
          boxShadow: theme.shadows[1],
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          overflow: 'hidden',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: `0 12px 24px -10px ${alpha(priorityColor, 0.3)}`,
            borderColor: alpha(priorityColor, 0.5),
          },
          '&::before': important ? {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '4px',
            height: '100%',
            background: theme.palette.error.main,
            boxShadow: `0 0 10px ${theme.palette.error.main}`,
          } : {},
        }}
        onClick={handleEditTask}
      >
        <CardContent sx={{ pb: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: 600,
                wordBreak: 'break-word',
                mr: 1,
                textDecoration: completed ? 'line-through' : 'none',
                color: completed ? 'text.secondary' : 'text.primary',
                opacity: completed ? 0.7 : 1,
              }}
            >
              {taskname}
            </Typography>
            {completed && (
              <CheckCircleIcon sx={{ color: theme.palette.success.main, filter: `drop-shadow(0 0 5px ${theme.palette.success.main})` }} />
            )}
          </Box>

          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center', mt: 'auto' }}>
            <Chip
              label={priority?.toUpperCase() || "NORMAL"}
              size="small"
              sx={{
                fontWeight: 700,
                backgroundColor: alpha(priorityColor, 0.1),
                color: priorityColor,
                border: `1px solid ${alpha(priorityColor, 0.2)}`
              }}
            />
            {important && (
              <Chip
                label="Important"
                size="small"
                icon={<WarningIcon style={{ color: theme.palette.error.main }} />}
                sx={{
                  backgroundColor: alpha(theme.palette.error.main, 0.1),
                  color: theme.palette.error.main,
                  fontWeight: 700
                }}
              />
            )}
          </Box>
        </CardContent>
      </Card>

      <Dialog
        open={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        PaperProps={{ sx: { p: 1 } }}
      >
        <DialogTitle sx={{ fontWeight: 700 }}>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography color="text.secondary">Are you sure you want to delete this task? This action cannot be undone.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDeleteConfirm(false)} color="inherit">Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">Delete Task</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TaskCard;
