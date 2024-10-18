import { configureStore } from "@reduxjs/toolkit";

import { bannerReducer } from "./slices/bannerSlice";

export const store = configureStore({
  reducer: {
    banner: bannerReducer,
  },
});
