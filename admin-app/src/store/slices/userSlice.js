import { createSlice } from "@reduxjs/toolkit";
import {
  loginAdmin,
  userTotalCompare,
  getAllUser,
  smartUserSearch,
} from "../thunks/fetchUsers";

const initialState = {
  dataOfYou: [],
  dataOfUserTotalCompare: [],
  dataAllUser: [],
};

const userSlice = createSlice({
  name: "users",
  initialState,
  extraReducers(builder) {
    builder.addCase(loginAdmin.fulfilled, (state, action) => {
      state.dataOfYou = action.payload;
    });
    builder.addCase(userTotalCompare.fulfilled, (state, action) => {
      state.dataOfUserTotalCompare = action.payload;
    });
    builder.addCase(getAllUser.fulfilled, (state, action) => {
      state.dataAllUser = action.payload;
    });
    builder.addCase(smartUserSearch.fulfilled, (state, action) => {
      state.dataAllUser = action.payload;
    });
  },
});

export const userReducer = userSlice.reducer;
