import React, { useEffect, useState } from "react";
import {
  Grid2,
  Typography,
  Container,
  Box,
  CircularProgress,
} from "@mui/material";
import { useThunk } from "../hook/use-thunk";
import { userTotalCompare } from "../store/thunks/fetchUsers";
import { getMonthlyOrders } from "../store/thunks/fetchOrders";
import { useSelector } from "react-redux";

import TotalCard from "../components/TotalCard";
import ChartBar from "../components/ChartBar";

const monthMap = {
  Jan: 1,
  Feb: 2,
  Mar: 3,
  Apr: 4,
  May: 5,
  June: 6,
  July: 7,
  Aug: 8,
  Sept: 9,
  Oct: 10,
  Nov: 11,
  Dec: 12,
};
const datasetOrder = [
  {
    orders: 0,
    month: "Jan",
  },
  {
    orders: 0,
    month: "Feb",
  },
  {
    orders: 0,
    month: "Mar",
  },
  {
    orders: 0,
    month: "Apr",
  },
  {
    orders: 0,
    month: "May",
  },
  {
    orders: 0,
    month: "June",
  },
  {
    orders: 0,
    month: "July",
  },
  {
    orders: 0,
    month: "Aug",
  },
  {
    orders: 0,
    month: "Sept",
  },
  {
    orders: 0,
    month: "Oct",
  },
  {
    orders: 0,
    month: "Nov",
  },
  {
    orders: 0,
    month: "Dec",
  },
];
const datasetIncome = [
  {
    orders: 0,
    month: "Jan",
  },
  {
    orders: 0,
    month: "Feb",
  },
  {
    orders: 0,
    month: "Mar",
  },
  {
    orders: 0,
    month: "Apr",
  },
  {
    orders: 0,
    month: "May",
  },
  {
    orders: 0,
    month: "June",
  },
  {
    orders: 0,
    month: "July",
  },
  {
    orders: 0,
    month: "Aug",
  },
  {
    orders: 0,
    month: "Sept",
  },
  {
    orders: 0,
    month: "Oct",
  },
  {
    orders: 0,
    month: "Nov",
  },
  {
    orders: 0,
    month: "Dec",
  },
];

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [doFetchUsers, isLoadingUsers, loadingUsersError] =
    useThunk(userTotalCompare);
  const [
    doFetchMonthlyOrders,
    isLoadingMonthlyOrders,
    loadingMonthlyOrdersError,
  ] = useThunk(getMonthlyOrders);

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
    <>
      <Container maxWidth="xl" sx={{ padding: "20px" }}>
        <Typography variant="h3">Dashboard</Typography>

        <Grid2
          container
          sx={{
            width: "100%",
            justifyContent: "space-evenly",
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
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            gap: 2,
            marginTop: 3,
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
      </Container>
    </>
  );
};

export default Dashboard;
