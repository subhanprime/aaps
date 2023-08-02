import mongoose, { Schema } from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: String,
    },
    senderId: {
      type: String,
    },
    text: {
      type: String,
    },
  },
  { timestamps: true }
);
export const messageModal = mongoose.model("messageModal", messageSchema);
