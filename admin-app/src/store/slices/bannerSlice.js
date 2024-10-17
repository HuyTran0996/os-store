import { createSlice } from "@reduxjs/toolkit";
import { getAllBanner, smartBannerSearch } from "../thunks/fetchBanners";

const initialState = {
  dataAllBanner: [],
};

const bannerSlice = createSlice({
  name: "banners",
  initialState,
  extraReducers(builder) {
    builder.addCase(getAllBanner.fulfilled, (state, action) => {
      state.dataAllBanner = action.payload;
    });
    builder.addCase(smartBannerSearch.fulfilled, (state, action) => {
      state.dataAllBanner = action.payload;
    });
  },
});

export const bannerReducer = bannerSlice.reducer;
