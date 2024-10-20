import { createSlice } from "@reduxjs/toolkit";
import {
  getAllProduct,
  smartProductSearch,
  getAProduct,
} from "../thunks/fetchProduct";

const initialState = {
  dataAllProduct: [],
  dataProduct: [],
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
    builder.addCase(getAProduct.fulfilled, (state, action) => {
      state.dataProduct = action.payload;
    });
  },
});

export const productReducer = productSlice.reducer;
