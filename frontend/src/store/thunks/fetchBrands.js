import { createAsyncThunk } from "@reduxjs/toolkit";

import { apiService } from "../../app/apiService";

const limit = process.env.REACT_APP_LIMIT_PAGINATION;

export const getAllBrand = createAsyncThunk("brands/getAllBrand", async () => {
  const res = await apiService.get(`/brand?sort=title`);
  return res.data.data;
});
