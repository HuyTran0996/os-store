import { createAsyncThunk } from "@reduxjs/toolkit";

import { apiService } from "../../app/apiService";

const limit = process.env.REACT_APP_LIMIT_PAGINATION;

export const createEnquiry = createAsyncThunk(
  "enquiries/createEnquiry",
  async ({ name, email, phone, message }) => {
    const res = await apiService.post(`/enquiry`, {
      name,
      email,
      phone,
      message,
    });
    return res.data;
  }
);
