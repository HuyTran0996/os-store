import { configureStore } from "@reduxjs/toolkit";

import { userReducer } from "./slices/userSlice";
import { orderReducer } from "./slices/orderSlice";
import { productReducer } from "./slices/productSlice";
import { brandReducer } from "./slices/brandSlice";
import { productCategoryReducer } from "./slices/productCategorySlice";
import { couponReducer } from "./slices/couponSlice";
import { bannerReducer } from "./slices/bannerSlice";
import { enquiryReducer } from "./slices/enquirySlice";

export const store = configureStore({
  reducer: {
    users: userReducer,
    orders: orderReducer,
    products: productReducer,
    brands: brandReducer,
    productCategories: productCategoryReducer,
    coupons: couponReducer,
    banner: bannerReducer,
    enquiries: enquiryReducer,
  },
  devTools: process.env.REACT_APP_NODE_ENV !== "production", // Enable DevTools only in development
});
