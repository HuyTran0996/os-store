import { createSlice } from "@reduxjs/toolkit";
import { getAllEnquiries, smartEnquirySearch } from "../thunks/fetchEnquiry";

const initialState = {
  dataAllEnquiries: [],
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
  },
});

export const enquiryReducer = enquirySlice.reducer;
