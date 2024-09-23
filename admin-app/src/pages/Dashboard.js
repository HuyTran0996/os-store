import React, { useEffect, useState } from "react";
import {
  Grid2,
  Typography,
  Container,
  Box,
  CircularProgress,
} from "@mui/material";

import { useSelector } from "react-redux";
import { useThunk } from "../hook/use-thunk";
import { userTotalCompare } from "../store/thunks/fetchUsers";
import { getMonthlyOrders } from "../store/thunks/fetchOrders";

import TotalCard from "../components/TotalCard";
import ChartBar from "../components/ChartBar";
import { showToast } from "../components/ToastMessage";
import ContainerLayout from "../components/ContainerLayout";
import { monthMap, datasetOrder, datasetIncome } from "../data/data";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [doFetchUsers] = useThunk(userTotalCompare);
  const [doFetchMonthlyOrders] = useThunk(getMonthlyOrders);

  const { dataOfUserTotalCompare } = useSelector((state) => {
    return state.users;
  });
  const { dataOrderMonthly } = useSelector((state) => {
    return state.orders;
  });

  const getData = async () => {
    setIsLoading(true);
    try {
      await doFetchUsers();
      await doFetchMonthlyOrders();
    } catch (err) {
      console.log("error", err);
      showToast("something goes wrong", "error", 3000);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  dataOrderMonthly.forEach((order) => {
    // Find the month name corresponding to the month number
    const monthName = Object.keys(monthMap).find(
      (key) => monthMap[key] === order._id
    );

    // Update the corresponding entry in datasetOrder1
    const monthOrder = datasetOrder.find((entry) => entry.month === monthName);
    if (monthOrder) {
      monthOrder.orders = order.totalOrders;
    }

    const monthIncome = datasetIncome.find(
      (entry) => entry.month === monthName
    );
    if (monthIncome) {
      monthIncome.orders = order.totalIncomes;
    }
  });

  return (
    <ContainerLayout>
      <Box sx={{ margin: "20px" }}>
        <Typography variant="h3">Dashboard</Typography>

        <Grid2
          container
          sx={{
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          {isLoading ? (
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-evenly",
                margin: "20px 0px 20px 0",
              }}
            >
              <CircularProgress />
              <CircularProgress />
              <CircularProgress />
            </Box>
          ) : (
            dataOfUserTotalCompare.map((item, index) => {
              const percentage = (item.thisMonth - item.lastMonth) * 100;
              return (
                <Grid2
                  key={index}
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  sx={{ paddingTop: "20px" }}
                >
                  <TotalCard
                    title={item.title}
                    amount={item.total}
                    percentage={percentage}
                    color={percentage > 0 ? "#76ff03" : "#ef5350"}
                  />
                </Grid2>
              );
            })
          )}
        </Grid2>

        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            marginTop: "40px",
          }}
        >
          <ChartBar
            dataset={datasetOrder}
            unit="order"
            dataKey="orders"
            label="OS Store's Orders (order)"
            isLoading={isLoading}
            color="#40c4ff"
          />

          <ChartBar
            dataset={datasetIncome}
            unit="usd"
            dataKey="orders"
            label="OS Store's Income (usd)"
            isLoading={isLoading}
            color="#cddc39"
          />
        </Box>
      </Box>
    </ContainerLayout>
  );
};

export default Dashboard;
