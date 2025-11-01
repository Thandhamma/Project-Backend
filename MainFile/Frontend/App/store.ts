import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import productsReducer from "../features/products/ProductSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer, // <-- 2. เพิ่ม products reducer ตรงนี้
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
