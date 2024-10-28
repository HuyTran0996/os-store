import { createSlice } from "@reduxjs/toolkit";
import {
  getAllEnquiries,
  smartEnquirySearch,
  getEnquiryById,
} from "../thunks/fetchEnquiry";

const initialState = {
  dataAllEnquiries: [],
  dataEnquiry: [],
};

const enquirySlice = createSlice({
  name: "enquiries",
  initialState,
  extraReducers(builder) {
    builder.addCase(getAllEnquiries.fulfilled, (state, action) => {
      state.dataAllEnquiries = action.payload;
    });
    builder.addCase(smartEnquirySearch.fulfilled, (state, action) => {
      state.dataAllEnquiries = action.payload;
    });
    builder.addCase(getEnquiryById.fulfilled, (state, action) => {
      state.dataEnquiry = action.payload;
    });
  },
});

export const enquiryReducer = enquirySlice.reducer;
