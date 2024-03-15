import { configureStore, createSlice } from "@reduxjs/toolkit";

let userData = createSlice({
  name: "userData",
  initialState: { token: "fdasfsdfasfsadf" },
  reducers: {
    changeToken(token) {
      return "바뀐토큰," + token;
    },
  },
});

export let { changeToken } = userData.actions;

export default configureStore({
  reducer: {
    userData: userData.reducer,
  },
});
