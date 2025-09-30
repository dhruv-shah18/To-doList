import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Divider,
  SpeedDialAction,
  SpeedDial,
  IconButton,
  Tooltip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import DeleteIcon from "@mui/icons-material/Delete";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

import TanTable from "../TanstackTable/TanTable";
import { usersColumns } from "../../utils/columnHelper";
import { useState, useEffect } from "react";
import { useFetchHook } from "../../API/useFetchHook";
import { API } from "../../API/APIRoute";
import AdminModal from "./AdminModal";
import Button from "@mui/material/Button";
import CommonCard from "../CardComponent/CommonCard";
import { useNavigate } from "react-router";
import DonutChart from "../Charts/PieChart";
import AddNewUser from "../User/AddNewUser";
import DeleteUser from "../User/DeleteUser";
import { useThemeToggle } from "../../context/ThemeContext";
import { useTheme } from "@mui/material/styles";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [addUser, setAddUser] = useState(false);
  const [deleteUser, setDeleteUser] = useState(false);
  const [summary, setSummary] = useState([]);
  const [tasksummary, setTaskSummary] = useState([]);
  const [fabOpen, setFabOpen] = useState(false);
  const navigate = useNavigate();
  const { fetchData } = useFetchHook();
  const toggleTheme = useThemeToggle();
  const theme = useTheme();

  const fetchingData = async () => {
    const response = await fetchData({ API_URL: API.ADMINGETALLUSERS });
    setUsers(response?.result);
  };

  const fetchingUserSummary = async () => {
    const response = await fetchData({ API_URL: API.ADMINSUMMARY });
    const tasks = await fetchData({ API_URL: API.ADMINTASKSUMMARY });

    let tasksData = [
      {
        label: "Tasks",
        value: tasks?.tasks?.taskCount,
        color: "#1a654e",
      },
      {
        label: "Completed Tasks",
        value: tasks?.tasks?.completedTask,
        color: "#6dce63ff",
      },
      {
        label: "Important Tasks",
        value: tasks?.tasks?.importantTask,
        color: "#ec505c",
      },
      {
        label: "Priority Tasks",
        value: tasks?.tasks?.highPriorityTask,
        color: "#7793c5",
      },
    ];
    setTaskSummary(tasksData);
    let data = response?.users?.map((data) => data?.taskCount);
    setSummary({ users: response?.users, tasksCount: data });
  };

  const handleAddUserForm = async (data) => {
    const result = await fetchData({
      API_URL: API.USER_REGISTER,
      METHOD_TYPE: "POST",
      PAYLOAD: data,
    });
    if (result?.user) fetchingData();
  };

  useEffect(() => {
    fetchingData();
    fetchingUserSummary();
  }, []);

  const handleEditUser = async (id) => {
    const response = await fetchData({
      API_URL: API.ADMINGETUSERBYID(id),
    });
    setSelectedUser(response?.result);
    setOpen(true);
  };

  const handleDeleteUserForm = async (id) => {
    const response = await fetchData({
      API_URL: API.DELETE_USER(id),
      METHOD_TYPE: "DELETE",
    });
    if (response?.success) fetchingData();
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: theme.palette.background.default,
        transition: "background-color 0.3s ease",
      }}
    >
      <Container maxWidth="lg" sx={{ pt: 4, pb: 6 }}>
        <DeleteUser
          open={deleteUser}
          setOpen={setDeleteUser}
          users={users}
          handleDeleteUser={handleDeleteUserForm}
        />
        <AddNewUser
          open={addUser}
          setOpen={setAddUser}
          handleAddUser={handleAddUserForm}
        />
        <AdminModal open={open} setOpen={setOpen} user={selectedUser} />

        {/* Header Section */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Button
            variant="outlined"
            color="primary"
            onClick={() => navigate("/alltasks")}
          >
            ⬅ Go Back
          </Button>
          <Tooltip title="Toggle Theme">
            <IconButton onClick={toggleTheme}>
              {theme.palette.mode === "dark" ? (
                <LightModeIcon />
              ) : (
                <DarkModeIcon />
              )}
            </IconButton>
          </Tooltip>
        </Box>

        {/* Title */}
        <Typography variant="h4" fontWeight="bold" align="center" gutterBottom>
          Task Force Portal
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          sx={{ color: "text.secondary" }}
        >
          Manage your users and tasks effectively with real-time analytics.
        </Typography>

        <Divider sx={{ my: 4 }} />

        <Grid container spacing={3}>
          {/* Users Table */}
          <Grid item xs={12} md={8}>
            <Paper elevation={4} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Users Table
              </Typography>
              <Box sx={{ height: 350 }}>
                <TanTable
                  data={users}
                  columns={usersColumns}
                  handleDoubleClick={handleEditUser}
                />
              </Box>
            </Paper>
          </Grid>

          {/* Analytics */}
          <Grid item xs={12} md={4}>
            <Paper elevation={4} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Analytics
              </Typography>
              <Box
                sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 2,
                    justifyContent: "center",
                  }}
                >
                  {summary && <CommonCard data={summary?.tasksCount} />}
                  {tasksummary && (
                    <CommonCard
                      data={tasksummary[0]?.value}
                      title="Tasks"
                      subtitle="Total Tasks"
                      wantSparkLineChart={false}
                    />
                  )}
                </Box>
                {tasksummary && <DonutChart data={tasksummary} />}
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* Floating Action Button */}
        <SpeedDial
          ariaLabel="Admin Actions"
          icon={<AddIcon />}
          open={fabOpen}
          onOpen={() => setFabOpen(true)}
          onClose={() => setFabOpen(false)}
          direction="up"
          sx={{ position: "fixed", bottom: 32, right: 32 }}
        >
          <SpeedDialAction
            key="Add User"
            icon={<PersonAddIcon />}
            tooltipTitle="Add User"
            onClick={() => {
              setFabOpen(false);
              setAddUser(true);
            }}
          />
          <SpeedDialAction
            key="Delete User"
            icon={<DeleteIcon />}
            tooltipTitle="Delete User"
            onClick={() => {
              setFabOpen(false);
              setDeleteUser(true);
            }}
          />
        </SpeedDial>
      </Container>
    </Box>
  );
};

export default Admin;
