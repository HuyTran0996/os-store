import { createAsyncThunk } from "@reduxjs/toolkit";

import { apiService } from "../../app/apiService";

const limit = process.env.REACT_APP_LIMIT_PAGINATION;

export const updateCompareList = createAsyncThunk(
  "users/updateCompareList",
  async (compareList) => {
    return compareList;
  }
);
export const updateCartList = createAsyncThunk(
  "users/updateCartList",
  async (cartList) => {
    return cartList;
  }
);

export const userWishList = createAsyncThunk("users/userWishList", async () => {
  const wishlist = await apiService.get("/user/wishlist");

  return wishlist.data.wishlist;
});

export const getUserCartForCheckOut = createAsyncThunk(
  "users/getUserCartForCheckOut",
  async () => {
    const cart = await apiService.get("/order/cart");
    return cart.data.cart;
  }
);
export const getUserInfo = createAsyncThunk("users/getUserInfo", async () => {
  const user = await apiService.get(`/user`);
  return user.data.getUser;
});

export const getUserCart = createAsyncThunk("users/getUserCart", async () => {
  const cart = await apiService.get("/order/cart");
  return cart.data.cart.products;
});

export const signupUser = createAsyncThunk(
  "users/signupUser",
  async ({ name, email, phone, password }) => {
    const admin = await apiService.post("/auth/register", {
      name,
      email,
      phone,
      password,
    });

    return admin.data.user;
  }
);
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

export const logoutUser = createAsyncThunk("users/logout", async () => {
  const user = await apiService.get("/auth/logout");
  localStorage.removeItem("userData");
  localStorage.removeItem("userCart");
  return user.data.user;
});

export const forgotPassword = createAsyncThunk(
  "users/forgotPassword",
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
  "users/resetPassword",
  async ({ password, token }) => {
    const message = await apiService.patch(`/auth/resetPassword/${token}`, {
      password,
    });

    return message.data;
  }
);

export const updateNamePhone = createAsyncThunk(
  "users/updateNamePhone",
  async ({ name, phone }) => {
    const res = await apiService.put(`/user/editUserSelf`, { name, phone });
    return res.data.data;
  }
);

export const blockUser = createAsyncThunk("users/blockUser", async () => {
  const res = await apiService.put(`/user/blockUserSelf`);
  localStorage.removeItem("userData");
  localStorage.removeItem("userCart");
  return res.data.data;
});
