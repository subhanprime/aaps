// import mongoose, { Schema } from "mongoose";
// const mongoose = require('mongoose');
import mongoose from "mongoose";
const conversationSchema = new mongoose.Schema(
  {
    members:[]
    // chatOpen: {
    //     type: Boolean,
    //     default: false,
    // },
    // unRead: {
    //     type: Number,
    //     default: 0,
    // },
    // userUnRead: {
    //     type: Number,
    //     default: 0,
    // },
    // username: {
    //     type: String,
    // }
  },
  { timestamps: true }
);
export const conversationModal = mongoose.model(
  "conversationModal",
  conversationSchema
);
