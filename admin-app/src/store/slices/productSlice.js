import { createSlice } from "@reduxjs/toolkit";
import {} from "../thunks/fetchProduct";

const initialState = {
  dataOfYou: [],
  dataOfUserTotalCompare: [],
  dataAllUser: [],
};

const productSlice = createSlice({
  name: "users",
  initialState,
  extraReducers(builder) {
    // builder.addCase(loginAdmin.fulfilled, (state, action) => {
    //   state.dataOfYou = action.payload;
    // });
  },
});

export const productReducer = productSlice.reducer;
