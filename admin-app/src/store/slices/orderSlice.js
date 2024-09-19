import { createSlice } from "@reduxjs/toolkit";
import { getMonthlyOrders } from "../thunks/fetchOrders";

const initialState = {
  dataOrderMonthly: [],
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  extraReducers(builder) {
    builder.addCase(getMonthlyOrders.fulfilled, (state, action) => {
      state.dataOrderMonthly = action.payload;
    });
  },
});

export const orderReducer = orderSlice.reducer;
