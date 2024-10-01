import React from "react";
import { Grid2, Typography, Paper, Box } from "@mui/material";

import CallReceivedIcon from "@mui/icons-material/CallReceived";
import CallMadeIcon from "@mui/icons-material/CallMade";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AssignmentIcon from "@mui/icons-material/Assignment";
const TotalCard = ({ title, amount, percentage, color }) => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  let comparisonMonth = month - 1;
  let comparisonYear = year;

  if (comparisonMonth === 0) {
    comparisonMonth = 12;
    comparisonYear -= 1;
  }
  const formatter = new Intl.DateTimeFormat("en-US", {
    month: "long",
  });

  return (
    <Paper elevation={10} sx={{ p: 3 }}>
      <Grid2 container spacing={4}>
        <Grid2 xs={12} sm={8}>
          <Typography variant="body2" color="text.secondary">
            {title}
          </Typography>
          <Typography
            variant="h5"
            fontWeight={600}
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            {title === "User" ? (
              <PersonIcon sx={{ marginRight: "5px" }} />
            ) : title === "Product" ? (
              <ShoppingCartIcon sx={{ marginRight: "5px" }} />
            ) : title === "Order" ? (
              <AssignmentIcon sx={{ marginRight: "5px" }} />
            ) : (
              ""
            )}
            {amount}
          </Typography>
        </Grid2>
        <Grid2 xs={12} sm={4} textAlign="right">
          <Box display="flex" alignItems="center" justifyContent="flex-end">
            {percentage <= 0 ? <CallReceivedIcon /> : <CallMadeIcon />}
            <Typography variant="subtitle1" color={color}>
              {percentage}%
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            Compared To{" "}
            {formatter.format(new Date(comparisonYear, comparisonMonth))} of{" "}
            {comparisonYear}
          </Typography>
        </Grid2>
      </Grid2>
    </Paper>
  );
};

export default TotalCard;
