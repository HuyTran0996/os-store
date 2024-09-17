import { createSlice } from "@reduxjs/toolkit";
import { loginAdmin } from "../thunks/fetchUsers";

const initialState = {
  dataOfYou: [],
};

const userSlice = createSlice({
  name: "users",
  initialState,
  extraReducers(builder) {
    builder.addCase(loginAdmin.fulfilled, (state, action) => {
      state.dataOfYou = action.payload;
    });
  },
});

export const userReducer = userSlice.reducer;
