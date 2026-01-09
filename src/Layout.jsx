import React from 'react';
import Navbar from './components/AppNavbar/Navbar';
import { Box, Container, Toolbar, useTheme } from '@mui/material';

const Layout = ({ Component, hideNavbar = false }) => {
  const theme = useTheme();

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      // Animated Mesh Gradient Background
      background: theme.palette.mode === 'light'
        ? 'radial-gradient(at 0% 0%, hsla(253,16%,70%,1) 0, transparent 50%), radial-gradient(at 50% 0%, hsla(225,39%,30%,1) 0, transparent 50%), radial-gradient(at 100% 0%, hsla(339,49%,30%,1) 0, transparent 50%)'
        : 'radial-gradient(at 0% 0%, hsla(253,16%,10%,1) 0, transparent 50%), radial-gradient(at 50% 0%, hsla(225,39%,15%,1) 0, transparent 50%), radial-gradient(at 100% 0%, hsla(339,49%,15%,1) 0, transparent 50%)',
      backgroundColor: theme.palette.background.default,
      backgroundSize: '150% 150%',
      animation: 'gradientBG 15s ease infinite',
      '@keyframes gradientBG': {
        '0%': { backgroundPosition: '0% 50%' },
        '50%': { backgroundPosition: '100% 50%' },
        '100%': { backgroundPosition: '0% 50%' },
      },
      transition: 'background-color 0.5s ease',
    }}>
      {/* Subtle overlay for better text contrast */}
      <Box sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
        background: theme.palette.mode === 'light'
          ? 'rgba(255,255,255,0.6)'
          : 'rgba(15,23,42,0.6)',
        backdropFilter: 'blur(60px)',
      }} />

      {!hideNavbar && <Navbar />}
      <Box component="main" sx={{ flexGrow: 1, p: 3, width: '100%', position: 'relative', zIndex: 1 }}>
        {!hideNavbar && <Toolbar />}
        <Container maxWidth="xl" disableGutters sx={{ px: { xs: 2, md: 4 } }}>
          {Component && <Component />}
        </Container>
      </Box>
    </Box>
  )
}

export default Layout;