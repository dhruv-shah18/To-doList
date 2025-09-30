// ThemeContext.js
import { createContext, useMemo, useState, useContext } from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

const ThemeToggleContext = createContext();

export const useThemeToggle = () => useContext(ThemeToggleContext);

export const CustomThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(localStorage.getItem("theme") || "light");

  const toggleTheme = () => {
    localStorage.setItem("theme", mode === "light" ? "dark" : "light");
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "light"
            ? {
                primary: { main: "#1976d2" },
                background: { default: "#f5f5f5" },
              }
            : {
                primary: { main: "#90caf9" },
                background: { default: "#121212" },
              }),
        },
        shape: {
          borderRadius: 10,
        },
      }),
    [mode]
  );

  return (
    <ThemeToggleContext.Provider value={toggleTheme}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeToggleContext.Provider>
  );
};
