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
export const updateBrand = createAsyncThunk(
  "brands/updateBrand",
  async (formData) => {
    const res = await apiService.put(`/brand`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
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
export const deleteBrand = createAsyncThunk(
  "brands/deleteBrand",
  async (id) => {
    console.log("ádas", id);
    const res = await apiService.delete(`/brand/${id}`);
    return res.data.data;
  }
);

export const smartBrandSearch = createAsyncThunk(
  "brands/smartBrandSearch",
  async ({ page, searchField }) => {
    const res = await apiService.post(
      `/brand/smartBrandSearch?page=${page}&limit=${limit}`,
      { searchField }
    );
    return res.data.data;
  }
);
