import { createAsyncThunk } from "@reduxjs/toolkit";

import { apiService } from "../../app/apiService";

const limit = process.env.REACT_APP_LIMIT_PAGINATION;

export const getAllBrand = createAsyncThunk(
  "brands/getAllBrand",
  async ({ tag }) => {
    let res;
    if (tag) {
      res = await apiService.get(`/brand?tag=${tag}`);
    } else {
      res = await apiService.get(`/brand`);
    }
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
    const res = await apiService.delete(`/brand/${id}`);
    return res.data.data;
  }
);

export const smartBrandSearch = createAsyncThunk(
  "brands/smartBrandSearch",
  async ({ searchField }) => {
    const res = await apiService.post(`/brand/smartBrandSearch`, {
      searchField,
    });
    return res.data.data;
  }
);
