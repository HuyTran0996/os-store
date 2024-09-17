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
  async ({ password }) => {
    const message = await apiService.patch("/auth/resetPassword/", {
      password,
    });

    return message;
  }
);
