import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  SelectedItems: {},
  AllItems: [],
};

const inventory = createSlice({
  initialState,
  name: "inventory",
  reducers: {
    handleSelectRow: (state, action) => {
      const productId = action.payload;

      if (state.SelectedItems[productId] === undefined) {
        state.SelectedItems[productId] = true;
      } else {
        delete state.SelectedItems[productId];
      }
    },
  },
});

export default inventory.reducer;

export const { handleSelectRow } = inventory.actions;
