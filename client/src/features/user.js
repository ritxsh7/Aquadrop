import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: false,
  role: "",
  id: "",
  name: "",
  email: "",
  token: "",
};

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, { payload }) => {
      const { name, role, email, token } = payload;
      //   console.log(token);
      console.log(payload);
      return { ...state, login: true, role, name, email, token };
    },
  },
});

//====================exports=========================
export default user.reducer;
export const { loginUser } = user.actions;
