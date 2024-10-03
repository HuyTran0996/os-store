import { createAsyncThunk } from "@reduxjs/toolkit";

import { apiService } from "../../app/apiService";

const limit = process.env.REACT_APP_LIMIT_PAGINATION;

export const getAllProduct = createAsyncThunk(
  "products/getAllProduct",
  async (queryString) => {
    let res;
    if (queryString) {
      res = await apiService.get(`/product?${queryString}&limit=${limit}`);
    } else {
      res = await apiService.get(`/brand?sort=title`);
    }
    return res.data.data;
  }
);

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

export const smartProductSearch = createAsyncThunk(
  "products/smartProductSearch",
  async ({ sort, page, searchField }) => {
    const res = await apiService.post(
      `/product/smartProductSearch?sort=${sort}&page=${page}&limit=${limit}`,
      {
        searchField,
      }
    );
    return res.data.data;
  }
);
export const getAProduct = createAsyncThunk(
  "products/getAProduct",
  async (id) => {
    const res = await apiService.get(`/product/${id}`);
    return res.data.product;
  }
);
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, formData }) => {
    const product = await apiService.put(`/product/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return product.data.product;
  }
);

export const deleteImages = createAsyncThunk(
  "products/deleteImages",
  async ({ productId, publicId }) => {
    const product = await apiService.delete(`/product/deleteImg`, {
      data: { productId, publicId },
    });

    return product.data.product;
  }
);
export const deleteProductColor = createAsyncThunk(
  "products/deleteProductColor",
  async ({ productId, colorName }) => {
    const product = await apiService.delete(`/product/deleteProductColor`, {
      data: { productId, colorName },
    });

    return product.data.product;
  }
);
