import { createSlice } from "@reduxjs/toolkit";
import {
  userWishList,
  updateCompareList,
  updateCartList,
  getUserCart,
} from "../thunks/fetchUsers";
import { toggleWishlist } from "../thunks/fetchProduct";

const compareList = JSON.parse(localStorage.getItem("compareList") || "[]");

const initialState = {
  dataUserWishList: [],
  dataUserCompare: [...compareList],
  dataUserCart: [],
};

const userSlice = createSlice({
  name: "users",
  initialState,
  extraReducers(builder) {
    builder.addCase(userWishList.fulfilled, (state, action) => {
      state.dataUserWishList = action.payload;
    });
    builder.addCase(toggleWishlist.fulfilled, (state, action) => {
      state.dataUserWishList = action.payload;
    });
    builder.addCase(updateCompareList.fulfilled, (state, action) => {
      state.dataUserCompare = action.payload;
    });
    builder.addCase(getUserCart.fulfilled, (state, action) => {
      state.dataUserCart = action.payload;
    });
    builder.addCase(updateCartList.fulfilled, (state, action) => {
      state.dataUserCart = action.payload;
    });
  },
});

export const userReducer = userSlice.reducer;
