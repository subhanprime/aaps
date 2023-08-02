import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    feedback: String,
    feederId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

export const feedbackModal = mongoose.model("feedback", feedbackSchema);
