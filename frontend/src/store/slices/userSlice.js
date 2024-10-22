import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "../thunks/fetchUsers";

const initialState = {
  dataOfYou: [],
};

const userSlice = createSlice({
  name: "users",
  initialState,
  extraReducers(builder) {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.dataOfYou = action.payload;
    });
  },
});

export const userReducer = userSlice.reducer;
