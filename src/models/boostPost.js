import { Schema, model, mongoose } from "mongoose";

const boostPost = new Schema({
  post: { type: Schema.Types.ObjectId, ref: "Post" },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  //duration is time
  duration: {
    type: String,
    required: true,
  },
  costPay: { type: String },
  interests: [],
  impression: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      date: { type: Date, default: Date.now },
    },
  ],
  statusBoost: {
    type: String,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  targetCountry: {
    type: String,
  },
});

export const BoostPost = model("BoostPost", boostPost);
