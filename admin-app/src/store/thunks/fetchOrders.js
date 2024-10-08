import { createAsyncThunk } from "@reduxjs/toolkit";

import { apiService } from "../../app/apiService";

const limit = process.env.REACT_APP_LIMIT_PAGINATION;

export const getMonthlyOrders = createAsyncThunk(
  "orders/getMonthlyOrders",
  async () => {
    const dataOrder = await apiService.get("/order/getMonthlyOrders");

    return dataOrder.data.ordersByMonth;
  }
);

export const getAllOrders = createAsyncThunk(
  "orders/getAllOrders",
  async (queryString) => {
    let res;
    if (queryString) {
      res = await apiService.get(
        `/order/getAllOrder?${queryString}&limit=${limit}`
      );
    } else {
      res = await apiService.get(`/order/getAllOrder`);
    }
    return res.data.data;
  }
);

export const smartOrderSearch = createAsyncThunk(
  "products/smartOrderSearch",
  async ({ sort, page, searchField }) => {
    const res = await apiService.post(
      `/product/smartOrderSearch?sort=${sort}&page=${page}&limit=${limit}`,
      {
        searchField,
      }
    );
    return res.data.data;
  }
);
