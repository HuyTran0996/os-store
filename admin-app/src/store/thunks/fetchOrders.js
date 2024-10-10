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
    const res = await apiService.get(
      `/order/getAllOrder?${queryString}&limit=${limit}`
    );

    return res.data.data;
  }
);
export const getOrderById = createAsyncThunk(
  "orders/getOrderById",
  async (orderId) => {
    const res = await apiService.get(`/order/getOrderById/${orderId}`);
    return res.data.order;
  }
);

export const smartOrderSearch = createAsyncThunk(
  "orders/smartOrderSearch",
  async ({ filter, page, searchField }) => {
    let res;
    if (filter) {
      res = await apiService.post(
        `/order/smartOrderSearch?filter=${filter}&page=${page}&limit=${limit}`,
        {
          searchField,
        }
      );
    } else {
      res = await apiService.post(
        `/order/smartOrderSearch?page=${page}&limit=${limit}`,
        {
          searchField,
        }
      );
    }
    return res.data.data;
  }
);
