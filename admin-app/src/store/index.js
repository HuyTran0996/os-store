import { configureStore } from "@reduxjs/toolkit";

import { userReducer } from "./slices/userSlice";
import { orderReducer } from "./slices/orderSlice";
import { productReducer } from "./slices/productSlice";

export const store = configureStore({
  reducer: {
    users: userReducer,
    orders: orderReducer,
    products: productReducer,
  },
});
