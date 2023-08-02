import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "post",
  initialState: [],
  reducers: {
    allPostDetails: (state, action) => {
      return [...action.payload];
    },
  },
});

export const { allPostDetails } = userSlice.actions;

export default userSlice.reducer;
