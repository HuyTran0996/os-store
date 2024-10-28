import { createAsyncThunk } from "@reduxjs/toolkit";

import { apiService } from "../../app/apiService";

const limit = process.env.REACT_APP_LIMIT_PAGINATION;

export const getAllEnquiries = createAsyncThunk(
  "enquiries/getAllCoupons",
  async (queryString) => {
    const res = await apiService.get(`/enquiry?${queryString}&limit=${limit}`);

    return res.data.data;
  }
);

export const updateCoupon = createAsyncThunk(
  "enquiries/updateCoupon",
  async ({ couponId, name, expiry, discount }) => {
    const res = await apiService.put(`/enquiry/${couponId}`, {
      name,
      expiry,
      discount,
    });
    return res.data.updateOrderStatus;
  }
);
export const createCoupon = createAsyncThunk(
  "enquiries/createCoupon",
  async ({ name, expiry, discount }) => {
    const res = await apiService.post(`/enquiry`, {
      name,
      expiry,
      discount,
    });
    return res.data;
  }
);
export const smartEnquirySearch = createAsyncThunk(
  "enquiries/smartEnquirySearch",
  async ({ page, searchField }) => {
    const res = await apiService.post(
      `/enquiry/smartEnquirySearch?page=${page}&limit=${limit}`,
      {
        searchField,
      }
    );
    return res.data.data;
  }
);

export const blockCoupon = createAsyncThunk(
  "enquiries/blockCoupon",
  async (couponId) => {
    const res = await apiService.put(`/enquiry/blockCoupon/${couponId}`);
    return res.data.data;
  }
);

export const unblockCoupon = createAsyncThunk(
  "enquiries/unblockCoupon",
  async (couponId) => {
    const res = await apiService.put(`/enquiry/unblockCoupon/${couponId}`);
    return res.data.data;
  }
);
export const deleteCoupon = createAsyncThunk(
  "enquiries/deleteCoupon",
  async (couponId) => {
    const res = await apiService.delete(`/enquiry/${couponId}`);
    return res.data.data;
  }
);
