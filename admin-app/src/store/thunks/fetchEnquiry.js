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

export const getEnquiryById = createAsyncThunk(
  "enquiries/getEnquiryById",
  async (orderId) => {
    const res = await apiService.get(`/enquiry/${orderId}`);
    return res.data.enquiry;
  }
);
export const updateEnquiry = createAsyncThunk(
  "enquiries/updateEnquiry",
  async ({ id, status }) => {
    const res = await apiService.put(`/enquiry/${id}`, {
      status,
    });
    return res.data.updatedEnquiry;
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

export const deleteEnquiry = createAsyncThunk(
  "enquiries/deleteEnquiry",
  async (id) => {
    const res = await apiService.delete(`/enquiry/${id}`);
    return res.data.data;
  }
);
