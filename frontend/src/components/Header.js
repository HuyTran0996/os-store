import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Menu,
  Fade,
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import SearchIcon from "@mui/icons-material/Search";
import CompareIcon from "@mui/icons-material/Compare";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import LoginIcon from "@mui/icons-material/Login";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import DialpadIcon from "@mui/icons-material/Dialpad";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MenuIcon from "@mui/icons-material/Menu";

const style = {
  header: {
    backgroundColor: "#131921",
    "& p": { color: "white", marginBottom: "0" },
    "& a": { color: "white" },
  },

  headerUpper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "20px 50px",
    borderBottom: "1px solid #3b4149",
  },
  search: {
    position: "relative",
    alignItems: "center",
    width: "100%",
    height: "50px",
    backgroundColor: "white",
    borderRadius: "7px",
    display: { xs: "none", sm: "flex" },
  },

  upperLink: {
    display: "flex",
    alignItems: "center",
    gap: "30px",
    "& a": { display: "flex", alignItems: "center", gap: "10px" },
  },

  cartCount: {
    position: "absolute",
    top: "-15px",
    right: "-10px",
    background: "white",
    color: "black",
    padding: "0px 3px",
    borderRadius: "5px",
  },
  headerBottom: {
    padding: "10px 50px",
    backgroundColor: "#232f3e",
    alignItems: "center",
    gap: "30px",
    display: { xs: "none", sm: "flex" },
  },
  menuCategories: {
    "& .css-1tktgsa-MuiPaper-root-MuiPopover-paper-MuiMenu-paper": {
      backgroundColor: "#131921",
      color: "white",
      "& li:not(:last-child)": {
        borderBottom: "1px solid #3b4149",
      },
      "& li:hover": { color: "orange" },
    },
  },
};

const Header = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = React.useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const toggleDrawer = (newOpen) => () => {
    setOpenMenu(newOpen);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate(`/product?search=${searchValue.trim()}`);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
  return (
    <Box sx={style.header}>
      {/* header upper */}
      <Box sx={style.headerUpper}>
        {/* logo */}
        <Link to="/">
          <h4
            style={{
              display: "flex",
              alignItems: "center",
              margin: 0,
            }}
          >
            <MenuIcon
              fontSize="large"
              onClick={toggleDrawer(true)}
              sx={{ display: { sm: "none", xs: "flex" } }}
            />
            <img
              src="images/logo.png"
              alt="logo"
              style={{
                width: "40px",
                margin: "0 5px",
              }}
            />
            <Box
              component="span"
              sx={{
                display: { xs: "none", md: "inline" },
                whiteSpace: "nowrap",
              }}
            >
              OS Store
            </Box>
          </h4>
        </Link>

        {/* search box */}
        <form onSubmit={handleSubmit} style={{ width: "42%" }}>
          <Box sx={style.search}>
            <TextField
              placeholder="Search Product..."
              type="text"
              fullWidth
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              sx={{ "& .MuiOutlinedInput-notchedOutline": { border: "none" } }}
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              // disabled={isLoadingSelf}
              sx={{
                position: "absolute",
                right: "0px",
                height: "100%",
              }}
            >
              <SearchIcon />
            </Button>
          </Box>
        </form>

        {/* header-upper-links */}
        <Box sx={style.upperLink}>
          <Link to="/compare-product">
            <CompareIcon fontSize="large" />
            <Box
              component="p"
              sx={{
                display: { xs: "none", lg: "inline" },
                whiteSpace: "nowrap",
              }}
            >
              Compare <br />
              Products
            </Box>
          </Link>

          <Link to="/wishlist">
            <VolunteerActivismIcon fontSize="large" sx={{ color: "pink" }} />
            <Box
              component="p"
              sx={{
                display: { xs: "none", lg: "inline" },
                whiteSpace: "nowrap",
              }}
            >
              Favorite <br />
              Wishlist
            </Box>
          </Link>

          <Link to="/login">
            <LoginIcon fontSize="large" />
            <Box
              component="p"
              sx={{
                display: { xs: "none", lg: "inline" },
                whiteSpace: "nowrap",
              }}
            >
              Log <br /> In
            </Box>
          </Link>

          <Link style={{ position: "relative" }} to="/cart">
            <LocalMallIcon fontSize="large" sx={{ color: "orange" }} />
            <Box sx={style.cartCount}>0</Box>
          </Link>
        </Box>
      </Box>

      {/* search box small screen */}
      <Box sx={{ ...style.headerUpper, display: { sm: "none", xs: "flex" } }}>
        {/* search box */}
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <Box sx={{ ...style.search, display: { sm: "none", xs: "flex" } }}>
            <TextField
              placeholder="Search Product..."
              type="text"
              fullWidth
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              sx={{ "& .MuiOutlinedInput-notchedOutline": { border: "none" } }}
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              // disabled={isLoadingSelf}
              sx={{
                position: "absolute",
                right: "0px",
                height: "100%",
              }}
            >
              <SearchIcon />
            </Button>
          </Box>
        </form>
      </Box>

      {/* header bottom */}
      <Box sx={style.headerBottom}>
        <Box sx={{ borderRight: "1px solid white" }}>
          <Button
            id="fade-button"
            aria-controls={open ? "fade-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            sx={{ color: "white" }}
          >
            <DialpadIcon sx={{ marginRight: "5px" }} /> SHOP CATEGORIES{" "}
            <ArrowDropDownIcon />
          </Button>
          <Menu
            id="fade-menu"
            MenuListProps={{
              "aria-labelledby": "fade-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            TransitionComponent={Fade}
            sx={style.menuCategories}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: "30px" }}>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/product">Our Store</NavLink>
          <NavLink to="/blogs">Blogs</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </Box>
      </Box>
      {/* menu list small screen */}
      <Drawer open={openMenu} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </Box>
  );
};

export default Header;
