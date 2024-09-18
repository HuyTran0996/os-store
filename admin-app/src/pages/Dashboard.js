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
import { useSelector } from "react-redux";

import TotalCard from "../components/TotalCard";
import ChartBar from "../components/ChartBar";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);

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

  const [doFetchUsers, isLoadingUsers, loadingUsersError] =
    useThunk(userTotalCompare);

  const { dataOfUserTotalCompare } = useSelector((state) => {
    return state.users;
  });

  const getData = async () => {
    setIsLoading(true);
    try {
      const userData = await doFetchUsers();
      console.log("userData", userData);
    } catch (err) {
      console.log("error", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);
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
        <Box sx={{ marginTop: "40px" }}>
          <ChartBar
            dataset={datasetOrder}
            unit="order"
            dataKey="orders"
            label="OS Store's Orders"
            isLoading={isLoading ? "loading" : ""}
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
