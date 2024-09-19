import { createAsyncThunk } from "@reduxjs/toolkit";

import { apiService } from "../../app/apiService";

export const getMonthlyOrders = createAsyncThunk(
  "orders/getMonthlyOrders",
  async () => {
    const dataOrder = await apiService.get("/order/getMonthlyOrders");

    return dataOrder.data.ordersByMonth;
  }
);
