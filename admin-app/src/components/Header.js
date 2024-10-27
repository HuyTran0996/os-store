import React, { useState, useMemo, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import FormControlLabel from "@mui/material/FormControlLabel";

import AccountCircle from "@mui/icons-material/AccountCircle";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LoginIcon from "@mui/icons-material/Login";
import MenuList from "./Sidebar/MenuList";
import logo from "../images/logo.png";
import { MaterialUISwitch } from "../data/data";

import { showToast } from "./ToastMessage";
import { useThunk } from "../hook/use-thunk";
import { logoutAdmin } from "../store/thunks/fetchUsers";

export default function Header({ themeMode, toggleTheme, setLogOut }) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const [signOut] = useThunk(logoutAdmin);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    setAnchorEl(null);
    try {
      setLogOut(true);
      await signOut();
      navigate("/login");
    } catch (err) {
      showToast("Sign Out Failed", "error");
    } finally {
      setLogOut(false);
    }
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <Link to="/profile" style={{ display: "flex", alignItems: "center" }}>
          <AccountCircleIcon sx={{ marginRight: "10px" }} /> Profile
        </Link>
      </MenuItem>
      <MenuItem onClick={handleLogout}>
        <LoginIcon sx={{ marginRight: "10px" }} /> Log Out
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ height: "10vh" }}>
        <Toolbar>
          <MenuList />
          <Box
            sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            <img
              src={logo}
              alt="logo"
              style={{
                width: "40px",
                marginRight: "5px",
              }}
            />
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              OS Store
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: "flex" }}>
            <FormControlLabel
              control={<MaterialUISwitch />}
              checked={themeMode === "dark"}
              onChange={toggleTheme}
            />
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {renderMenu}
    </Box>
  );
}
