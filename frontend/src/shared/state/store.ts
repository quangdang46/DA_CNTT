import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsSlice";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
