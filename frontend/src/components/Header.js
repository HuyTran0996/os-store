import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Box, TextField, Button } from "@mui/material";
import "../styles/Header.scss";
import { showToast } from "./ToastMessage";
import MenuList from "./Sidebar/MenuList";

import SearchIcon from "@mui/icons-material/Search";
import CompareIcon from "@mui/icons-material/Compare";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import LoginIcon from "@mui/icons-material/Login";
import LocalMallIcon from "@mui/icons-material/LocalMall";

const Header = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const search = searchValue.trim();
    if (!search) {
      showToast("Type the product name to search", "warn");
      return;
    }
    navigate(`/product?search=${searchValue.trim()}&page=1`);
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
            <CompareIcon />
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

          <Link to="/login">
            <LoginIcon />
            <Box className="smallerLGhide" component="p">
              Log <br /> In
            </Box>
          </Link>

          <Link to="/cart">
            <LocalMallIcon />
            <Box className="cartCount">0</Box>
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
