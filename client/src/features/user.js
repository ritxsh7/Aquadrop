import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: false,
  role: "",
  id: "",
  name: "",
  email: "",
  token: "",
  address: null,
};

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, { payload }) => {
      const { name, role, email, token, address } = payload;
      //   console.log(token);
      // console.log(payload);
      return { ...state, login: true, role, name, email, token, address };
    },
    updateUserAddress: (state, { payload }) => {
      if (payload) {
        return { ...state, address: payload };
      }
    },
  },
});

//====================exports=========================
export default user.reducer;
export const { loginUser, updateUserAddress } = user.actions;
