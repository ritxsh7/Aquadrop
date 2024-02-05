import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  login: false,
  dealer: null,
  token: localStorage.getItem("aqua-dealer-tkn"),
};

const dealer = createSlice({
  name: "dealer",
  initialState,
  reducers: {
    saveDealer: (state, action) => {
      state.dealer = action.payload;
      state.login = true;
    },
    loginDealer: (state, action) => {
      state.dealer = action.payload.data;
      state.login = true;
      localStorage.setItem("aqua-dealer-tkn", action.payload.token);
    },
    logoutDealer: (state, action) => {
      localStorage.removeItem("aqua-dealer-tkn");
    },

    toggleLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export default dealer.reducer;

export const { saveDealer, loginDealer, toggleLoading, logoutDealer } =
  dealer.actions;
