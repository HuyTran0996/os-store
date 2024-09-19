import { createAsyncThunk } from "@reduxjs/toolkit";

import { apiService } from "../../app/apiService";

export const loginAdmin = createAsyncThunk(
  "users/loginAdmin",
  async ({ email, password }) => {
    const admin = await apiService.post("/auth/loginAdmin", {
      email,
      password,
    });

    return admin.data.user;
  }
);
export const logoutAdmin = createAsyncThunk("users/logout", async () => {
  const admin = await apiService.get("/auth/logout");
  localStorage.removeItem("adminData");
  return admin.data.user;
});

export const forgotPassword = createAsyncThunk(
  "users/loginAdmin",
  async ({ email }) => {
    const frontEndLink = `${window.location.origin}/reset-password`;

    const message = await apiService.post("/auth/forgotPassword", {
      frontEndLink,
      email,
    });

    return message.data;
  }
);

export const resetPassword = createAsyncThunk(
  "users/loginAdmin",
  async ({ password, token }) => {
    const message = await apiService.patch(`/auth/resetPassword/${token}`, {
      password,
    });

    return message.data;
  }
);

export const userTotalCompare = createAsyncThunk(
  "users/userTotalCompare",
  async () => {
    const res = await apiService.get(`/user/userTotalCompare`);

    return res.data.data;
  }
);

export const getAllUser = createAsyncThunk("users/getAllUser", async (page) => {
  const limit = process.env.REACT_APP_LIMIT_PAGINATION;
  const res = await apiService.get(
    `/user/allUsers?page=${page || 1}&limit=${limit}`
  );
  return res.data.data;
});
