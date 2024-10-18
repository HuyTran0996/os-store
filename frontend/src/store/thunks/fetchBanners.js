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
