import { configureStore } from "@reduxjs/toolkit";

import { userReducer } from "./slices/userSlice";
import { orderReducer } from "./slices/orderSlice";

export const store = configureStore({
  reducer: {
    users: userReducer,
    orders: orderReducer,
  },
});
