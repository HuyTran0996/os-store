import { createAsyncThunk } from "@reduxjs/toolkit";

import { apiService } from "../../app/apiService";

const limit = process.env.REACT_APP_LIMIT_PAGINATION;

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (formData) => {
    const product = await apiService.post("/product", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return product.data.newProduct;
  }
);
export const addColor = createAsyncThunk(
  "products/addColor",
  async (formData) => {
    const product = await apiService.post("/product/addColor", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return product.data;
  }
);
