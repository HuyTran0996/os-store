import { createAsyncThunk } from "@reduxjs/toolkit";

import { apiService } from "../../app/apiService";

const limit = process.env.REACT_APP_LIMIT_PAGINATION;

export const updateCompareList = createAsyncThunk(
  "users/updateCompareList",
  async (compareList) => {
    return compareList;
  }
);
export const userWishList = createAsyncThunk("users/userWishList", async () => {
  const wishlist = await apiService.get("/user/wishlist");

  return wishlist.data.wishlist;
});

export const loginUser = createAsyncThunk(
  "users/loginUser",
  async ({ email, password }) => {
    const admin = await apiService.post("/auth/login", {
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

export const updateNameEmail = createAsyncThunk(
  "users/updateNameEmail",
  async ({ id, name, phone }) => {
    const res = await apiService.put(`/user/editUser`, { id, name, phone });
    return res.data.data;
  }
);

export const blockUser = createAsyncThunk("users/blockUser", async (userId) => {
  const res = await apiService.put(`/user/blockUser/${userId}`);
  return res.data.data;
});

export const unblockUser = createAsyncThunk(
  "users/unblockUser",
  async (userId) => {
    const res = await apiService.put(`/user/unblockUser/${userId}`);
    return res.data.data;
  }
);
