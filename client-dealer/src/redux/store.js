import { configureStore } from "@reduxjs/toolkit";
import dealerReducer from "./features/dealer";
import inventoryReducer from "./features/inventory";

export const store = configureStore({
  reducer: {
    dealer: dealerReducer,
    inventory: inventoryReducer,
  },
});
