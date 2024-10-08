import { createSlice } from "@reduxjs/toolkit";
import {
  getMonthlyOrders,
  getAllOrders,
  smartOrderSearch,
} from "../thunks/fetchOrders";

const initialState = {
  dataOrderMonthly: [],
  dataAllOrders: [],
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  extraReducers(builder) {
    builder.addCase(getMonthlyOrders.fulfilled, (state, action) => {
      state.dataOrderMonthly = action.payload;
    });
    builder.addCase(getAllOrders.fulfilled, (state, action) => {
      state.dataAllOrders = action.payload;
    });
    builder.addCase(smartOrderSearch.fulfilled, (state, action) => {
      state.dataAllOrders = action.payload;
    });
  },
});

export const orderReducer = orderSlice.reducer;
