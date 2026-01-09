// ThemeContext.js
import { createContext, useMemo, useState, useContext } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { getTheme } from "../theme";

const ThemeToggleContext = createContext();

export const useThemeToggle = () => useContext(ThemeToggleContext);

export const CustomThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(localStorage.getItem("theme") || "light");

  const toggleTheme = () => {
    localStorage.setItem("theme", mode === "light" ? "dark" : "light");
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <ThemeToggleContext.Provider value={toggleTheme}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeToggleContext.Provider>
  );
};
