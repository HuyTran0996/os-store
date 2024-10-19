import { createSlice } from "@reduxjs/toolkit";
import { getAllBrand } from "../thunks/fetchBrands";

const initialState = {
  dataAllBrand: [],
};

const brandSlice = createSlice({
  name: "brands",
  initialState,
  extraReducers(builder) {
    builder.addCase(getAllBrand.fulfilled, (state, action) => {
      state.dataAllBrand = action.payload;
    });
  },
});

export const brandReducer = brandSlice.reducer;
