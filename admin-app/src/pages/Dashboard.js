import React from "react";
import { Grid2, Typography, CssBaseline, Container, Box } from "@mui/material";

import "../styles/Dashboard.scss";

import TotalCard from "../components/TotalCard";
import ChartBar from "../components/ChartBar";

const Dashboard = () => {
  const items = [1, 2, 3];
  const datasetOrder = [
    {
      orders: 21,
      month: "Jan",
    },
    {
      orders: 28,
      month: "Feb",
    },
    {
      orders: 41,
      month: "Mar",
    },
    {
      orders: 73,
      month: "Apr",
    },
    {
      orders: 99,
      month: "May",
    },
    {
      orders: 144,
      month: "June",
    },
    {
      orders: 319,
      month: "July",
    },
    {
      orders: 249,
      month: "Aug",
    },
    {
      orders: 131,
      month: "Sept",
    },
    {
      orders: 55,
      month: "Oct",
    },
    {
      orders: 48,
      month: "Nov",
    },
    {
      orders: 25,
      month: "Dec",
    },
  ];
  const datasetIncome = [
    {
      orders: 21,
      month: "Jan",
    },
    {
      orders: 28,
      month: "Feb",
    },
    {
      orders: 41,
      month: "Mar",
    },
    {
      orders: 73,
      month: "Apr",
    },
    {
      orders: 99,
      month: "May",
    },
    {
      orders: 144,
      month: "June",
    },
    {
      orders: 319,
      month: "July",
    },
    {
      orders: 249,
      month: "Aug",
    },
    {
      orders: 131,
      month: "Sept",
    },
    {
      orders: 55,
      month: "Oct",
    },
    {
      orders: 48,
      month: "Nov",
    },
    {
      orders: 25,
      month: "Dec",
    },
  ];
  return (
    <>
      <CssBaseline />
      <Container maxWidth="xl" sx={{ padding: "20px" }}>
        <Typography variant="h3">Dashboard</Typography>

        <Grid2
          container
          sx={{
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          {items.map((item, index) => (
            <Grid2
              key={index}
              item
              xs={12}
              sm={6}
              md={4}
              sx={{ paddingTop: "20px" }}
            >
              <TotalCard
                title="Total"
                amount="1100"
                percentage="32"
                color="error.main"
              />
            </Grid2>
          ))}
        </Grid2>
        <Box sx={{ marginTop: "40px" }}>
          <ChartBar
            dataset={datasetOrder}
            unit="order"
            dataKey="orders"
            label="OS Store's Orders"
          />
        </Box>
        <Box sx={{ margin: "40px 0 40px 0" }}>
          <ChartBar
            dataset={datasetIncome}
            unit="Income (usd)"
            dataKey="orders"
            label="OS Store's Income"
          />
        </Box>
      </Container>
    </>
  );
};

export default Dashboard;
