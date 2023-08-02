import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import postSlice from "./slices/postSlice";
import allPostDetails from "./slices/allPostList";
// import adminSlice from './slices/adminSlice';
export default configureStore({
  reducer: {
    users: userSlice,
    posts: postSlice,
    allPostDetails: allPostDetails,
  },
  devTools: true,
});
