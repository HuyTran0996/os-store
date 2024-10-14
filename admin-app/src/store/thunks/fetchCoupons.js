import { createAsyncThunk } from "@reduxjs/toolkit";

import { apiService } from "../../app/apiService";

const limit = process.env.REACT_APP_LIMIT_PAGINATION;

export const getAllCoupons = createAsyncThunk(
  "coupons/getAllCoupons",
  async (queryString) => {
    const res = await apiService.get(`/coupon?${queryString}&limit=${limit}`);

    return res.data.data;
  }
);

export const blockCoupon = createAsyncThunk(
  "coupons/blockCoupon",
  async (couponId) => {
    const res = await apiService.put(`/coupon/blockCoupon/${couponId}`);
    return res.data.data;
  }
);

export const unblockCoupon = createAsyncThunk(
  "coupons/unblockCoupon",
  async (couponId) => {
    const res = await apiService.put(`/coupon/unblockCoupon/${couponId}`);
    return res.data.data;
  }
);
export const deleteCoupon = createAsyncThunk(
  "coupons/deleteCoupon",
  async (couponId) => {
    const res = await apiService.delete(`/coupon/${couponId}`);
    return res.data.data;
  }
);
// export const getOrderById = createAsyncThunk(
//   "orders/getOrderById",
//   async (orderId) => {
//     const res = await apiService.get(`/order/getOrderById/${orderId}`);
//     return res.data.order;
//   }
// );
// export const updateOrder = createAsyncThunk(
//   "orders/updateOrder",
//   async ({ orderId, orderStatus, paymentStatus }) => {
//     const res = await apiService.put(`/order/updateOrder/${orderId}`, {
//       orderStatus,
//       paymentStatus,
//     });
//     return res.data.updateOrderStatus;
//   }
// );

// export const smartOrderSearch = createAsyncThunk(
//   "orders/smartOrderSearch",
//   async ({ filter, page, searchField }) => {
//     let res;
//     if (filter) {
//       res = await apiService.post(
//         `/order/smartOrderSearch?filter=${filter}&page=${page}&limit=${limit}`,
//         {
//           searchField,
//         }
//       );
//     } else {
//       res = await apiService.post(
//         `/order/smartOrderSearch?page=${page}&limit=${limit}`,
//         {
//           searchField,
//         }
//       );
//     }
//     return res.data.data;
//   }
// );
