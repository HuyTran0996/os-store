import React, { useState, useMemo, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { createTheme } from "@mui/material";
import { AppProvider } from "@toolpad/core/AppProvider";
import Header from "./Header";
import Footer from "./Footer";

import { showToast } from "./ToastMessage";
import { Logout } from "./Loading/Loading";

const demoTheme = (mode) =>
  createTheme({
    components: {
      MuiToolbar: {
        styleOverrides: {
          root: {
            height: "10vh",
          },
        },
      },
    },

    palette: {
      mode, // Either "light" or "dark"
      ...(mode === "light"
        ? {
            background: {
              default: "#F9F9FE",
              paper: "#EEEEF9",
              footer: "#1976d2",
            },
          }
        : {
            background: {
              default: "#2A4364",
              paper: "#112E4D",
              footer: "#112E4D",
            },
          }),
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
  });

const appTheme = localStorage.getItem("appTheme");
let initialTheme = "light";
if (appTheme && (String(appTheme) === "light" || String(appTheme) === "dark")) {
  initialTheme = String(appTheme);
}
const MainLayout = () => {
  const navigate = useNavigate();
  const [themeMode, setThemeMode] = useState(initialTheme);
  const theme = useMemo(() => demoTheme(themeMode), [themeMode]);

  const [logOut, setLogOut] = useState(false);
  const adminInfo = localStorage.getItem("adminData");

  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
    const theme = themeMode === "light" ? "dark" : "light";
    localStorage.setItem("appTheme", theme);
  };

  useEffect(() => {
    if (!adminInfo) {
      showToast("Something goes wrong, please login again", "error");
      navigate("/login");
    }
  }, []);

  if (logOut) {
    return <Logout />;
  }

  return (
    <AppProvider theme={theme}>
      <Header
        themeMode={themeMode}
        toggleTheme={toggleTheme}
        setLogOut={setLogOut}
      />
      <Outlet />
      <Footer />
    </AppProvider>
  );
};

export default MainLayout;
