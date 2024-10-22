import { createSlice } from "@reduxjs/toolkit";
import { loginUser, userWishList } from "../thunks/fetchUsers";
import { toggleWishlist } from "../thunks/fetchProduct";

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
    builder.addCase(toggleWishlist.fulfilled, (state, action) => {
      // const wish = action.payload.map((w) => {
      //   return { _id: w };
      // });

      state.dataUserWishList = action.payload;
    });
  },
});

export const userReducer = userSlice.reducer;
