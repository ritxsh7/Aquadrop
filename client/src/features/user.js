import { createSlice } from "@reduxjs/toolkit";

//===========token from local storage==============
const userInfo = JSON.parse(localStorage.getItem("aqua-user"));
let token;
if (userInfo) {
  const { tokenExpire } = userInfo;
  if (tokenExpire - Date.now() < 0) {
    window.localStorage.removeItem("aqua-user");
    window.localStorage.setItem("isLoggedIn", false);
  } else {
    token = userInfo.token;
    window.localStorage.setItem("isLoggedIn", "true");
  }
} else {
  window.localStorage.setItem("isLoggedIn", "false");
}

const initialState = userInfo || { location: "" };

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, { payload }) => {
      const { name, role, email, token, address } = payload;
      return { ...state, login: true, role, name, email, token, address };
    },
    updateUserAddress: (state, { payload }) => {
      if (payload) {
        return { ...state, address: payload };
      }
    },
    SaveLocation: (state, action) => {
      state.location = action.payload;
    },
  },
});

//====================exports=========================
export default user.reducer;
export const { loginUser, updateUserAddress, SaveLocation } = user.actions;
