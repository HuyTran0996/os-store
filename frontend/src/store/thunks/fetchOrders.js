import { createAsyncThunk } from "@reduxjs/toolkit";

import { apiService } from "../../app/apiService";

const limit = process.env.REACT_APP_LIMIT_PAGINATION;

export const cashOrder = createAsyncThunk(
  "orders/cashOrder",
  async (shippingAddress) => {
    const res = await apiService.post(`/order/cart/cashOrder`, {
      COD: 1,
      shippingAddress,
    });
    return res.data.order;
  }
);

export const applyCoupon = createAsyncThunk(
  "orders/applyCoupon",
  async (coupon) => {
    const res = await apiService.post(`/order/cart/applyCoupon`, { coupon });
    return res.data.order;
  }
);

export const addToCart = createAsyncThunk(
  "orders/addToCart",
  async (checkoutInfo) => {
    const res = await apiService.post(`/order/cart`, { cart: checkoutInfo });
    return res.data.order;
  }
);

export const getOrderById = createAsyncThunk(
  "orders/getOrderById",
  async (orderId) => {
    const res = await apiService.get(`/order/getOrderById/${orderId}`);
    return res.data.order;
  }
);
