import mongoose from "mongoose";

const termsAndConditionsSchema = new mongoose.Schema(
  {
    terms: {
      type: String,
      required: true,
    },
    // userEmail: String,
    // title: {
    //     type: String,
    // },
    // userName: String,
    // userImage: String,
  },
  { timestamps: true }
);

export const termsAndConditionsModal = mongoose.model(
  "termsAndConditionsModal",
  termsAndConditionsSchema
);
