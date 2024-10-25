import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Box, TextField, Button, Badge, Menu, MenuItem } from "@mui/material";

import "../styles/Header.scss";
import { useThunk } from "../hook/use-thunk";
import { showToast } from "./ToastMessage";
import MenuList from "./Sidebar/MenuList";

import {
  logoutUser,
  userWishList,
  getUserCart,
  updateCartList,
} from "../store/thunks/fetchUsers";

import SearchIcon from "@mui/icons-material/Search";
import CompareIcon from "@mui/icons-material/Compare";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import LoginIcon from "@mui/icons-material/Login";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AssignmentIcon from "@mui/icons-material/Assignment";

import logo from "../images/logo.png";

const Header = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);

  const [logOut] = useThunk(logoutUser);
  const [getUserWishList] = useThunk(userWishList);
  const [getCart] = useThunk(getUserCart);
  const [updateCartListUser] = useThunk(updateCartList);

  const { dataUserCompare, dataUserCart } = useSelector((state) => {
    return state.users;
  });

  const userInfo = localStorage.getItem("userData");
  const parsedUserData = JSON.parse(userInfo);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const getData = async () => {
    try {
      setIsLoading(true);

      if (parsedUserData && !parsedUserData.note) {
        await getUserWishList();
        const userCart = localStorage.getItem("userCart");
        updateCartListUser(JSON.parse(userCart));
      }
    } catch (err) {
      showToast(`${err.message}`, "error");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const search = searchValue.trim();
    if (!search) {
      showToast("Type the product name to search", "warn");
      return;
    }
    navigate(`/product?search=${searchValue.trim()}&page=1`);
  };

  const handleLogOut = async () => {
    setAnchorEl(null);
    try {
      setIsLoading(true);

      if (parsedUserData) {
        await logOut();
      }
    } catch (err) {
      showToast(`${err.message}`, "error");
    } finally {
      navigate("/login");
      setIsLoading(false);
    }
  };

  return (
    <Box className="header">
      {/* header upper */}
      <Box className="headerUpper">
        {/* logo */}
        <MenuList />
        <Link to="/">
          <h4>
            <img
              src={logo}
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
          <Box className="search smallScreenHide">
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
        <Box className="upperLink">
          <Link to="/compare-product">
            <Badge badgeContent={dataUserCompare.length || 0} color="secondary">
              <CompareIcon />
            </Badge>
            <Box className="smallerLGhide" component="p">
              Compare <br />
              Products
            </Box>
          </Link>

          <Link to="/wishlist">
            <VolunteerActivismIcon />
            <Box className="smallerLGhide" component="p">
              Favorite <br />
              Wishlist
            </Box>
          </Link>
          <Link>
            <AccountCircleIcon onClick={handleClick} />
            <Box className="smallerLGhide" component="p">
              User <br /> Profile
            </Box>
            <Menu
              id="demo-positioned-menu"
              aria-labelledby="demo-positioned-button"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              <MenuItem onClick={handleClose}>
                <Link to="/profile">
                  <AccountCircleIcon sx={{ marginRight: "10px" }} /> Profile
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link to="/orders">
                  <AssignmentIcon sx={{ marginRight: "10px" }} /> My orders
                </Link>
              </MenuItem>
              <MenuItem onClick={handleLogOut}>
                <LoginIcon sx={{ marginRight: "10px" }} /> Log Out
              </MenuItem>
            </Menu>
          </Link>

          <Link to="/cart">
            <Badge badgeContent={dataUserCart.length || 0} color="success">
              <LocalMallIcon />
            </Badge>
          </Link>
        </Box>
      </Box>

      {/* search box small screen */}
      <Box className="headerUpper smallScreenShow">
        {/* search box */}
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <Box className="search smallScreenShow">
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
      <Box className="headerBottom smallScreenHide">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/product">Our Store</NavLink>
        <NavLink to="/blogs">Blogs</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </Box>
    </Box>
  );
};

export default Header;
