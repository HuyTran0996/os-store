import { createSlice } from "@reduxjs/toolkit";
import {
  getAllCategory,
  smartCategorySearch,
} from "../thunks/fetchProductCategories";

const initialState = {
  dataAllProductCategory: [],
};

const productCategorySlice = createSlice({
  name: "brands",
  initialState,
  extraReducers(builder) {
    builder.addCase(getAllCategory.fulfilled, (state, action) => {
      state.dataAllProductCategory = action.payload;
    });
    builder.addCase(smartCategorySearch.fulfilled, (state, action) => {
      state.dataAllProductCategory = action.payload;
    });
  },
});

export const productCategoryReducer = productCategorySlice.reducer;
