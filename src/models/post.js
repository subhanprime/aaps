import { Schema, model } from "mongoose";
import { Comment } from "./index.js";

const postSchema = new Schema(
  {
    privacyStatus: { type: String, required: true },
    text: { type: String },
    file: { type: Array },
    fileType: {
      type: String,
      enum: ["video", "image", "pdf", "text", "media"],
    },
    label: { type: String },
    audienceCountry: { type: String },
    audiencePlateform: { type: String },
    duration: { type: String },
    totalCost: { type: String },
    cardName: { type: String },
    cardNumber: { type: String },
    cardExpiry: { type: String },
    cardCVV: { type: String },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    hashtags: [{ type: String, required: true }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    boostPost: {
      type: Schema.Types.ObjectId,
      ref: "BoostPost",
    },
    bookmarks: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

postSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    const comments = this.comments;
    for (let i = 0; i < comments.length; i++) {
      const parent = await Comment.findOne({ _id: comments[i] });
      await Comment.deleteMany({ _id: { $in: parent.replyComments } });
    }
    await Comment.deleteMany({ _id: { $in: comments } });
    next();
  }
);

export const Post = model("Post", postSchema);
