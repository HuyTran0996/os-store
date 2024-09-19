import React from "react";
import {
  Grid2,
  Typography,
  Container,
  Box,
  CircularProgress,
} from "@mui/material";
import DataGridTable from "../components/DataGridTable";
import { margin } from "@mui/system";

const Customer = () => {
  return (
    <>
      <Container maxWidth="xl" sx={{ padding: "20px" }}>
        <Typography variant="h3" sx={{ marginBottom: "20px" }}>
          Customers
        </Typography>
        <DataGridTable />
      </Container>
    </>
  );
};

export default Customer;
