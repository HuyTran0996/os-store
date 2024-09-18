import React from "react";
import {
  Grid2,
  Typography,
  CssBaseline,
  Toolbar,
  Container,
  AppBar,
  Paper,
  Box,
  SvgIcon,
} from "@mui/material";
import { BsArrowDownRight, BsArrowUpRight } from "react-icons/bs";

const TotalCard = ({ title, amount, percentage, color }) => {
  return (
    <Paper elevation={10} sx={{ p: 3 }}>
      <Grid2 container spacing={4}>
        <Grid2 item xs={12} sm={8}>
          <Typography variant="body2" color="text.secondary">
            {title}
          </Typography>
          <Typography variant="h5" fontWeight={600}>
            ${amount}
          </Typography>
        </Grid2>
        <Grid2 item xs={12} sm={4} textAlign="right">
          <Box display="flex" alignItems="center" justifyContent="flex-end">
            <SvgIcon
              component={BsArrowUpRight}
              sx={{ fontSize: 20, mr: 0.5 }}
            />
            <Typography variant="subtitle1" color={color}>
              {percentage}%
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            Compared To April 2022
          </Typography>
        </Grid2>
      </Grid2>
    </Paper>
  );
};

export default TotalCard;
