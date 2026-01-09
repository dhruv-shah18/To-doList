import { createTheme, alpha } from '@mui/material/styles';

export const getTheme = (mode) => createTheme({
    palette: {
        mode,
        ...(mode === 'light'
            ? {
                // Light Mode Colors
                primary: {
                    main: '#2563eb', // Vibrant Blue
                    light: '#60a5fa',
                    dark: '#1d4ed8',
                    contrastText: '#ffffff',
                },
                secondary: {
                    main: '#7c3aed', // Vibrant Violet
                    light: '#a78bfa',
                    dark: '#5b21b6',
                    contrastText: '#ffffff',
                },
                background: {
                    default: '#f8fafc',
                    paper: '#ffffff',
                    gradient: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
                },
                text: {
                    primary: '#1e293b',
                    secondary: '#64748b',
                },
                action: {
                    hover: alpha('#2563eb', 0.04),
                    selected: alpha('#2563eb', 0.08),
                }
            }
            : {
                // Dark Mode Colors
                primary: {
                    main: '#3b82f6',
                    light: '#60a5fa',
                    dark: '#2563eb',
                    contrastText: '#ffffff',
                },
                secondary: {
                    main: '#8b5cf6',
                    light: '#a78bfa',
                    dark: '#7c3aed',
                    contrastText: '#ffffff',
                },
                background: {
                    default: '#0f172a',
                    paper: '#1e293b',
                    gradient: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
                },
                text: {
                    primary: '#f1f5f9',
                    secondary: '#94a3b8',
                },
                action: {
                    hover: alpha('#3b82f6', 0.08),
                    selected: alpha('#3b82f6', 0.16),
                }
            }),
    },
    typography: {
        fontFamily: '"Inter", "Outfit", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontSize: '3rem',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            background: mode === 'light'
                ? 'linear-gradient(45deg, #2563eb, #7c3aed)'
                : 'linear-gradient(45deg, #3b82f6, #8b5cf6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
        },
        h2: {
            fontSize: '2.25rem',
            fontWeight: 700,
            letterSpacing: '-0.01em',
        },
        h3: {
            fontSize: '1.75rem',
            fontWeight: 600,
            letterSpacing: '-0.01em',
        },
        h4: {
            fontWeight: 600,
        },
        body1: {
            lineHeight: 1.7,
            fontSize: '1rem',
        },
        button: {
            textTransform: 'none',
            fontWeight: 600,
            letterSpacing: '0.01em',
        },
    },
    shape: {
        borderRadius: 16,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    boxShadow: 'none',
                    padding: '10px 24px',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    },
                    '&:active': {
                        transform: 'translateY(0)',
                    }
                },
                contained: {
                    background: mode === 'light'
                        ? 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)'
                        : 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                    color: 'white',
                    '&:hover': {
                        filter: 'brightness(1.1)',
                    }
                }
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                    transition: 'box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out',
                },
                elevation1: {
                    boxShadow: mode === 'light'
                        ? '0 2px 8px -2px rgba(0,0,0,0.05), 0 4px 16px -4px rgba(0,0,0,0.1)'
                        : '0 2px 8px -2px rgba(0,0,0,0.3), 0 4px 16px -4px rgba(0,0,0,0.4)',
                },
                rounded: {
                    borderRadius: 16,
                }
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 20,
                    overflow: 'visible', // For hover effects that might expand
                }
            }
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: mode === 'light' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(15, 23, 42, 0.7)',
                    backdropFilter: 'blur(20px)',
                    borderBottom: `1px solid ${mode === 'light' ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.05)'}`,
                    boxShadow: 'none',
                },
            },
        },
        MuiDialog: {
            styleOverrides: {
                paper: {
                    borderRadius: 24,
                    backdropFilter: 'blur(10px)',
                    backgroundColor: mode === 'light' ? 'rgba(255,255,255,0.95)' : 'rgba(30,41,59,0.95)',
                }
            }
        }
    },
});
