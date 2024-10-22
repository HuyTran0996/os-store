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
export const rating = createAsyncThunk(
  "products/rating",
  async ({ star, prodId, comment }) => {
    const res = await apiService.post(`/product/rating`, {
      star,
      prodId,
      comment,
    });
    return res.data.product;
  }
);
export const toggleWishlist = createAsyncThunk(
  "products/toggleWishlist",
  async ({ prodId }) => {
    const res = await apiService.put(`/product/wishlist`, {
      prodId,
    });
    return res.data.wishlist;
  }
);
