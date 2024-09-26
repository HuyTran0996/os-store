import { createAsyncThunk } from "@reduxjs/toolkit";

import { apiService } from "../../app/apiService";

const limit = process.env.REACT_APP_LIMIT_PAGINATION;

export const getAllBrand = createAsyncThunk(
  "brands/getAllBrand",
  async (page) => {
    const res = await apiService.get(`/brand?page=${page || 1}&limit=${limit}`);
    return res.data.data;
  }
);
export const createBrand = createAsyncThunk(
  "brands/createBrand",
  async (formData) => {
    const res = await apiService.post(`/brand`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data.data;
  }
);
