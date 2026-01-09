import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useFetchHook } from '../../API/useFetchHook';
import { API } from '../../API/APIRoute';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Avatar,
  Link as MuiLink,
  useTheme,
  alpha
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const UserLogin = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const { setAuthToken, setUser, setRole } = useAuth();
  const { fetchData } = useFetchHook();
  const navigate = useNavigate();
  const theme = useTheme();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetchData({
      API_URL: API.USER_LOGIN,
      METHOD_TYPE: 'POST',
      PAYLOAD: credentials
    });
    if (response.access_token) {
      setAuthToken(response.access_token);
      setUser(response.user.email);
      setRole(response.user.role || 'user');
      localStorage.setItem('accessToken', response.access_token);
      localStorage.setItem('user', response.user.email);
      localStorage.setItem('role', response.user.role || 'user');
      response?.user?.role === "admin" ? navigate('/admin') : navigate('/alltasks');
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Paper
          elevation={0} // Using custom glassmorphism instead of default shadow
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: 4,
            width: '100%',
            background: theme.palette.mode === 'light'
              ? 'rgba(255, 255, 255, 0.7)'
              : 'rgba(30, 41, 59, 0.6)',
            backdropFilter: 'blur(20px)',
            border: `1px solid ${theme.palette.mode === 'light' ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.05)'}`,
            boxShadow: theme.shadows[4],
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main', width: 56, height: 56, boxShadow: theme.shadows[3] }}>
            <LockOutlinedIcon fontSize="large" />
          </Avatar>
          <Typography component="h1" variant="h4" fontWeight="800" sx={{ mt: 1, mb: 1, background: '-webkit-linear-gradient(45deg, #2563eb, #7c3aed)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Welcome Back
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Login to manage your tasks efficiently
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={credentials.email}
              onChange={handleChange}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={credentials.password}
              onChange={handleChange}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, py: 1.5, fontSize: '1rem', borderRadius: 3 }}
            >
              Sign In
            </Button>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, fontSize: '0.875rem' }}>
              <MuiLink component={Link} to="/register" variant="body2" sx={{ fontWeight: 600 }}>
                {"Don't have an account? Sign Up"}
              </MuiLink>
              {/* <MuiLink href="#" variant="body2" sx={{ color: 'text.secondary' }}>
                Forgot password?
              </MuiLink> */}
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default UserLogin;
