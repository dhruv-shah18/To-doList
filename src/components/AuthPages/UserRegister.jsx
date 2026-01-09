import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  useTheme
} from '@mui/material';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';

const UserRegister = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const { fetchData } = useFetchHook();
  const theme = useTheme();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetchData({
      API_URL: API.USER_REGISTER,
      METHOD_TYPE: 'POST',
      PAYLOAD: formData
    });
    if (response.user && response.user.email) {
      navigate('/login');
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
          elevation={0}
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
          <Avatar sx={{ m: 1, bgcolor: 'primary.main', width: 56, height: 56, boxShadow: theme.shadows[3] }}>
            <PersonAddAltIcon fontSize="large" />
          </Avatar>
          <Typography component="h1" variant="h4" fontWeight="800" sx={{ mt: 1, mb: 1, background: '-webkit-linear-gradient(45deg, #2563eb, #7c3aed)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Sign up
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Create an account to start managing tasks
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={formData.username}
              onChange={handleChange}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={formData.email}
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
              autoComplete="new-password"
              value={formData.password}
              onChange={handleChange}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, py: 1.5, fontSize: '1rem', borderRadius: 3 }}
            >
              Sign Up
            </Button>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <MuiLink component={Link} to="/login" variant="body2" sx={{ fontWeight: 600 }}>
                {"Already have an account? Sign In"}
              </MuiLink>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default UserRegister;
