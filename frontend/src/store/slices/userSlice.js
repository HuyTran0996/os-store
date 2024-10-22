import { createSlice } from "@reduxjs/toolkit";
import { loginUser, userWishList } from "../thunks/fetchUsers";

const initialState = {
  dataOfYou: [],
  dataUserWishList: [],
};

const userSlice = createSlice({
  name: "users",
  initialState,
  extraReducers(builder) {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.dataOfYou = action.payload;
    });
    builder.addCase(userWishList.fulfilled, (state, action) => {
      state.dataUserWishList = action.payload;
    });
  },
});

export const userReducer = userSlice.reducer;
