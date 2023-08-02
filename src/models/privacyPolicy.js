import mongoose from "mongoose";

const privacyPolicySchema = new mongoose.Schema(
  {
    privacyPolicy:{
        type:String,
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

export const privacyPolicyModal = mongoose.model(
  "privacyPolicyModal",
  privacyPolicySchema
);
