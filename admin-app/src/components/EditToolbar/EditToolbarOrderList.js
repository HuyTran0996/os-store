import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  TextField,
  IconButton,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import { GridToolbarContainer } from "@mui/x-data-grid";

import SearchIcon from "@mui/icons-material/Search";

export const EditToolbarOrderList = (props) => {
  const { isLoading, filter, setFilter } = props;
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate(`/orders?search=${searchValue.trim()}&page=1`);
  };

  return (
    <>
      <GridToolbarContainer
        sx={{
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          padding: "7px",
        }}
      >
        <form onSubmit={handleSubmit} style={{ width: "60%" }}>
          <Box
            sx={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              width: "100%",
            }}
          >
            <TextField
              className="input"
              placeholder="Search Orders By Order Code or Email..."
              type="text"
              fullWidth
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />

            <IconButton
              type="submit"
              color="primary"
              variant="contained"
              fullWidth
              size="large"
              disabled={isLoading}
              sx={{ position: "absolute", right: "7px" }}
            >
              <SearchIcon />
            </IconButton>
          </Box>
        </form>

        <Box>
          <Typography variant="p" sx={{ margin: "0 5px", fontSize: "16px" }}>
            Filter By:
          </Typography>
          <Select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            defaultValue="all"
          >
            <MenuItem value="all">Get All</MenuItem>
            <MenuItem value="Processing">Processing</MenuItem>
            <MenuItem value="Delivered">Delivered</MenuItem>
            <MenuItem value="Cancelled">Cancelled</MenuItem>
          </Select>
        </Box>
      </GridToolbarContainer>
    </>
  );
};
