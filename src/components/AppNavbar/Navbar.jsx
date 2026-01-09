import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
  Dialog,
  DialogContent,
  Tooltip,
  alpha
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ChatIcon from '@mui/icons-material/Chat';
import AddIcon from '@mui/icons-material/Add';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

import { useNavigate, useLocation } from 'react-router';
import { useAuth } from '../../context/AuthContext';
import { useThemeToggle } from '../../context/ThemeContext';
import { API } from '../../API/APIRoute';
import { useFetchHook } from '../../API/useFetchHook';
import AddTask from '../../model/model/AddTask';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openAddTask, setOpenAddTask] = useState(false);

  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { fetchData } = useFetchHook();
  const toggleTheme = useThemeToggle();
  const theme = useTheme();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = async () => {
    const result = await fetchData({
      API_URL: API.USER_LOGOUT,
      METHOD_TYPE: "POST",
    });
    if (result.success) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      navigate("/login");
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
    setMobileOpen(false);
  };

  const menuItems = [
    { text: 'All Tasks', icon: <DashboardIcon />, path: '/alltasks' },
    { text: 'Important', icon: <LabelImportantIcon sx={{ color: '#ef4444' }} />, path: '/imptasks' },
    { text: 'Priority', icon: <PriorityHighIcon sx={{ color: '#f59e0b' }} />, path: '/prioritytasks' },
    { text: 'Completed', icon: <CheckCircleIcon sx={{ color: '#10b981' }} />, path: '/completedtasks' },
    { text: 'AI Chat', icon: <ChatIcon sx={{ color: theme.palette.secondary.main }} />, path: '/chatbot' },
  ];

  const drawer = (
    <Box sx={{ width: 280, height: '100%', bgcolor: 'background.default' }}>
      <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
        <img src="/Logo.png" alt="Logo" style={{ width: 40, height: 40, borderRadius: 12, boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }} />
        <Typography variant="h6" fontWeight="800" sx={{ background: '-webkit-linear-gradient(45deg, #2563eb, #7c3aed)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Task Force
        </Typography>
      </Box>
      <List sx={{ px: 2, mt: 2 }}>
        {isAuthenticated && (
          <ListItem disablePadding sx={{ mb: 3 }}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => { setOpenAddTask(true); setMobileOpen(false); }}
              sx={{ borderRadius: 3, py: 1.5, fontSize: '1rem', textTransform: 'none' }}
            >
              Create Task
            </Button>
          </ListItem>
        )}
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => handleNavigation(item.path)}
              sx={{
                borderRadius: 3,
                py: 1.5,
                transition: 'all 0.2s',
                '&.Mui-selected': {
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  color: 'primary.main',
                  '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.2) },
                  '& .MuiListItemIcon-root': { color: 'primary.main' }
                }
              }}
            >
              <ListItemIcon sx={{ minWidth: 40, color: 'text.secondary' }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} primaryTypographyProps={{ fontWeight: location.pathname === item.path ? 700 : 500 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box sx={{ position: 'absolute', bottom: 0, width: '100%', p: 3, borderTop: `1px solid ${theme.palette.divider}` }}>
        {isAuthenticated ? (
          <Button
            fullWidth
            variant="outlined"
            color="error"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            sx={{ borderRadius: 3, py: 1 }}
          >
            Sign Out
          </Button>
        ) : (
          <Button
            fullWidth
            variant="contained"
            color="primary"
            startIcon={<LoginIcon />}
            onClick={() => handleNavigation('/login')}
            sx={{ borderRadius: 3, py: 1 }}
          >
            Login
          </Button>
        )}
      </Box>
    </Box >
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        component="nav"
        position="fixed"
        sx={{
          background: theme.palette.mode === 'light'
            ? 'rgba(255, 255, 255, 0.6)'
            : 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(20px)',
          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          boxShadow: 'none',
        }}
      >
        <Toolbar sx={{ height: 70 }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { lg: 'none' } }} // Show drawer on MD screens too if space is tight
          >
            <MenuIcon />
          </IconButton>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexGrow: 0, mr: 2, cursor: 'pointer' }} onClick={() => navigate('/')}>
            <img src="/Logo.png" alt="logo" style={{ height: 38, width: 38, borderRadius: '50%', boxShadow: theme.shadows[2] }} />
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <Typography variant="h6" component="div" sx={{ lineHeight: 1, fontWeight: 800, letterSpacing: '-0.5px' }}>
                Task Force
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.6, fontSize: '0.7rem', display: { xs: 'none', lg: 'block' } }}>
                Premium Task Manager
              </Typography>
            </Box>
          </Box>

          <Box sx={{ flexGrow: 1 }} /> {/* Spacer */}

          <Box sx={{ display: { xs: 'none', lg: 'flex' }, alignItems: 'center', gap: 1 }}> {/* Hide links on MD, show on LG */}
            {menuItems.map((item) => (
              <Button
                key={item.text}
                onClick={() => handleNavigation(item.path)}
                startIcon={item.icon}
                sx={{
                  color: location.pathname === item.path ? 'text.primary' : 'text.secondary',
                  fontWeight: location.pathname === item.path ? 700 : 500,
                  px: 1.5,
                  py: 0.5,
                  minWidth: 'auto',
                  borderRadius: 3,
                  fontSize: '0.9rem',
                  '&:hover': {
                    bgcolor: alpha(theme.palette.primary.main, 0.05),
                    color: 'primary.main'
                  },
                  bgcolor: location.pathname === item.path ? alpha(theme.palette.primary.main, 0.08) : 'transparent',
                }}
              >
                {item.text}
              </Button>
            ))}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: { xs: 0, lg: 2 } }}>
            <Tooltip title="Toggle Theme">
              <IconButton onClick={toggleTheme} color="inherit" sx={{ bgcolor: alpha(theme.palette.text.primary, 0.05) }}>
                {theme.palette.mode === 'dark' ? <Brightness7Icon color="warning" /> : <Brightness4Icon color="action" />}
              </IconButton>
            </Tooltip>

            {isAuthenticated ? (
              <>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => setOpenAddTask(true)}
                  sx={{
                    ml: 1,
                    borderRadius: 4,
                    px: 3,
                    boxShadow: theme.shadows[4],
                    display: { xs: 'none', sm: 'flex' }, // Hide text button on very small screens
                    whiteSpace: 'nowrap'
                  }}
                >
                  New Task
                </Button>
                <IconButton
                  onClick={() => setOpenAddTask(true)}
                  sx={{
                    ml: 1,
                    bgcolor: 'primary.main',
                    color: 'white',
                    display: { xs: 'flex', sm: 'none' },
                    '&:hover': { bgcolor: 'primary.dark' }
                  }}
                >
                  <AddIcon />
                </IconButton>

                <Tooltip title="Logout">
                  <IconButton onClick={handleLogout} sx={{ ml: 1, color: 'error.main', bgcolor: alpha(theme.palette.error.main, 0.1) }}>
                    <LogoutIcon />
                  </IconButton>
                </Tooltip>
              </>
            ) : (
              <Button
                variant="contained"
                onClick={() => navigate('/login')}
                sx={{ ml: 2, borderRadius: 50, px: 4 }}
              >
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', lg: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 280, borderRight: 'none' },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      <Dialog
        open={openAddTask}
        onClose={() => setOpenAddTask(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { p: 0 }
        }}
      >
        <DialogContent sx={{ p: 0 }}>
          <AddTask setOpen={setOpenAddTask} />
        </DialogContent>
      </Dialog>

    </Box>
  );
};

export default Navbar;
