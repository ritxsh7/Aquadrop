import { configureStore } from "@reduxjs/toolkit";
import dealerReducer from "./features/dealer";

export const store = configureStore({
  reducer: {
    dealer: dealerReducer,
  },
});
