import { createAsyncThunk } from "@reduxjs/toolkit";

import { apiService } from "../../app/apiService";

const limit = process.env.REACT_APP_LIMIT_PAGINATION;

export const getAllCategory = createAsyncThunk(
  "productCategories/getAllCategory",
  async () => {
    const res = await apiService.get(`/category?sort=title`);
    return res.data.data;
  }
);
export const updateCategory = createAsyncThunk(
  "productCategories/updateCategory",
  async (formData) => {
    const res = await apiService.put(`/category`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data.data;
  }
);
export const createCategory = createAsyncThunk(
  "productCategories/createCategory",
  async (formData) => {
    const res = await apiService.post(`/category`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data.data;
  }
);
export const deleteCategory = createAsyncThunk(
  "productCategories/deleteCategory",
  async (id) => {
    const res = await apiService.delete(`/category/${id}`);
    return res.data.data;
  }
);

export const smartCategorySearch = createAsyncThunk(
  "productCategories/smartCategorySearch",
  async ({ searchField }) => {
    const res = await apiService.post(`/category/smartCategorySearch`, {
      searchField,
    });
    return res.data.data;
  }
);
