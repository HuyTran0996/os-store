import { createSlice } from "@reduxjs/toolkit";
import { loginAdmin, userTotalCompare } from "../thunks/fetchUsers";

const initialState = {
  dataOfYou: [],
  dataOfUserTotalCompare: [],
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
  },
});

export const userReducer = userSlice.reducer;
