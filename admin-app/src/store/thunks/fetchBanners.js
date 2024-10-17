import { createAsyncThunk } from "@reduxjs/toolkit";

import { apiService } from "../../app/apiService";

const limit = process.env.REACT_APP_LIMIT_PAGINATION;

export const getAllBanner = createAsyncThunk(
  "banners/getAllBanner",
  async () => {
    const res = await apiService.get(`/banner`);
    return res.data.data;
  }
);
export const updateBanner = createAsyncThunk(
  "banners/updateBanner",
  async (formData) => {
    const res = await apiService.put(`/banner`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data.data;
  }
);
export const createBanner = createAsyncThunk(
  "banners/createBanner",
  async (formData) => {
    const res = await apiService.post(`/banner`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data.data;
  }
);
export const deleteBanner = createAsyncThunk(
  "banners/deleteBanner",
  async (id) => {
    const res = await apiService.delete(`/banner/${id}`);
    return res.data.data;
  }
);

export const smartBannerSearch = createAsyncThunk(
  "banners/smartBannerSearch",
  async ({ searchField }) => {
    const res = await apiService.post(`/banner/smartBannerSearch`, {
      searchField,
    });
    return res.data.data;
  }
);
