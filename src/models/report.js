import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      required: true,
    },
    heading: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    scammerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"Post",
      required: true,
    },
    reporterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:'User',
      required: true,
    },
  },
  { timestamps: true }
);

export const reportModals = mongoose.model("reportModals", reportSchema);


