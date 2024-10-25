import { createSlice } from "@reduxjs/toolkit";
import { getOrderById } from "../thunks/fetchOrders";

const initialState = {
  dataOrder: [],
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  extraReducers(builder) {
    builder.addCase(getOrderById.fulfilled, (state, action) => {
      state.dataOrder = action.payload;
    });
  },
});

export const orderReducer = orderSlice.reducer;
