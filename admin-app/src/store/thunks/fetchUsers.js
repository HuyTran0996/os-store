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
