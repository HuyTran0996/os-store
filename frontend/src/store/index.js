import { configureStore } from "@reduxjs/toolkit";

import { bannerReducer } from "./slices/bannerSlice";
import { productCategoryReducer } from "./slices/productCategorySlice";

export const store = configureStore({
  reducer: {
    banner: bannerReducer,
    productCategories: productCategoryReducer,
  },
});
