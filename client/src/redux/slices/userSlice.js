import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: {},
    allUser: [],
  },
  reducers: {
    setUserData: (state, action) => {
      return { ...state, userInfo: { ...action.payload } };
    },
    addAllUser: (state, action) => {
      return { ...state, allUser: [...action.payload] };
    },
  },
});

export const { setUserData, addAllUser } = userSlice.actions;

export default userSlice.reducer;
