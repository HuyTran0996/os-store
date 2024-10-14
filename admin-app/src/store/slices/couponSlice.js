import { createSlice } from "@reduxjs/toolkit";
import { getAllCoupons } from "../thunks/fetchCoupons";

const initialState = {
  dataAllCoupon: [],
};

const couponSlice = createSlice({
  name: "coupons",
  initialState,
  extraReducers(builder) {
    builder.addCase(getAllCoupons.fulfilled, (state, action) => {
      state.dataAllCoupon = action.payload;
    });
  },
});

export const couponReducer = couponSlice.reducer;
