import { configureStore } from "@reduxjs/toolkit";

import { bannerReducer } from "./slices/bannerSlice";
import { productCategoryReducer } from "./slices/productCategorySlice";
import { brandReducer } from "./slices/brandSlice";
import { productReducer } from "./slices/productSlice";

export const store = configureStore({
  reducer: {
    banner: bannerReducer,
    productCategories: productCategoryReducer,
    brands: brandReducer,
    products: productReducer,
  },
});
