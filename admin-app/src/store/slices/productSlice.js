import { createSlice } from "@reduxjs/toolkit";
import { getAllProduct, smartProductSearch } from "../thunks/fetchProduct";

const initialState = {
  dataAllProduct: [],
};

const productSlice = createSlice({
  name: "products",
  initialState,
  extraReducers(builder) {
    builder.addCase(getAllProduct.fulfilled, (state, action) => {
      state.dataAllProduct = action.payload;
    });
    builder.addCase(smartProductSearch.fulfilled, (state, action) => {
      state.dataAllProduct = action.payload;
    });
  },
});

export const productReducer = productSlice.reducer;
