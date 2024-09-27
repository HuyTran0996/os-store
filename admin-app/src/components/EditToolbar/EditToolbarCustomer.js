import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Box, TextField, IconButton } from "@mui/material";
import { GridToolbarContainer } from "@mui/x-data-grid";

import SearchIcon from "@mui/icons-material/Search";

///////////Customer///////////////
export const EditToolbarCustomer = (props) => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const { isLoadingSelf } = props;

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate(`/customers?search=${searchValue.trim()}&page=${1}`);
  };

  return (
    <GridToolbarContainer sx={{ width: "100%" }}>
      <form onSubmit={handleSubmit} style={{ width: "100%", margin: "7px" }}>
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
            placeholder="Search User..."
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
            disabled={isLoadingSelf}
            sx={{ position: "absolute", right: "7px" }}
          >
            <SearchIcon />
          </IconButton>
        </Box>
      </form>
    </GridToolbarContainer>
  );
};
