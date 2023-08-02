import { BoostPost } from "../models/boostPost.js";
import { Post } from "../models/post.js";
import { CustomError } from "../middleware/index.js";
import { mongoose } from "mongoose";

// createBoostPost

export const createBoostPost = async (req, res) => {
  const { duration, costPay, targetCountry, interests, postId } = req.body;

  const findPost = await Post.findById(postId);

  if (!findPost) {
    throw new CustomError("Post does not found", 404);
  }

  const boostPost = await BoostPost.create({
    post: findPost._id,
    user: req?.user?._id,
    duration,
    costPay,
    targetCountry,
    interests,
  });

  if (boostPost) {
    await findPost.updateOne({ boostPost: boostPost._id });
  }

  res.status(201).json({
    success: true,
    message: "Boost Post successfully",
    boostPost,
  });
};

// getBoostPost
export const getBoostPost = async (req, res) => {
  const { postId } = req.params;
  const findBoostPost = await BoostPost.find({ post: postId });
  if (!findBoostPost) {
    throw new CustomError("Boost Post does not found", 404);
  }
  res.status(200).json({
    success: true,
    message: "Boost Post get successfully",
    findBoostPost,
  });
};

// getAllUserBoostPost
export const getAllUserBoostPost = async (req, res) => {
  const findBoostPost = await BoostPost.find({ user: req?.user?._id });
  if (!findBoostPost) {
    throw new CustomError("Boost Post not found", 404);
  }

  await Promise.all(
    findBoostPost.map(async (item) => {
      const duration = item.duration;
      const milliSecond = duration * 24 * 60 * 60 * 1000;
      const createdAt = item.createdAt;
      const addMilliSecond = createdAt.getTime() + milliSecond;
      const addMilliSecondDate = new Date(addMilliSecond);
      const currentDate = new Date();
      if (currentDate > addMilliSecondDate) {
        findBoostPost = await BoostPost.findByIdAndUpdate(
          item._id,
          {
            statusBoost: false,
          },
          {
            new: true,
          }
        );
      } else {
        findBoostPost = await BoostPost.findByIdAndUpdate(
          item._id,
          {
            statusBoost: true,
          },
          {
            new: true,
          }
        );
      }
    })
  );

  res.status(200).json({
    success: true,
    message: "Boost Posts retrieved successfully",
    findBoostPost,
  });
};

// getAllBoostPost
// export const getAllBoostPost = async (req, res) => {
//   let findBoostPost = await BoostPost.find();
//   if (!findBoostPost) {
//     throw new CustomError("Boost Post not found", 404);
//   }
//   //get the created at date and time its comparsion with the current time

//   await Promise.all(
//     findBoostPost.map(async (item) => {
//       const duration = item.duration;
//       const milliSecond = duration * 24 * 60 * 60 * 1000;
//       const createdAt = item.createdAt;
//       const addMilliSecond = createdAt.getTime() + milliSecond;
//       const addMilliSecondDate = new Date(addMilliSecond);
//       const currentDate = new Date();
//       if (currentDate > addMilliSecondDate) {
//         findBoostPost = await BoostPost.findByIdAndUpdate(
//           item._id,
//           {
//             statusBoost: false,
//           },
//           {
//             new: true,
//           }
//         );
//       } else {
//         findBoostPost = await BoostPost.findByIdAndUpdate(
//           item._id,
//           {
//             statusBoost: true,
//           },
//           {
//             new: true,
//           }
//         );
//       }
//     })
//   );
//   res.status(200).json({
//     success: true,
//     message: "Boost Posts retrieved successfully",
//     findBoostPost,
//   });
// };

// deleteBoostPost
export const deleteBoostPost = async (req, res) => {
  const { postId } = req.params;
  const findBoostPost = await BoostPost.findByIdAndDelete(postId);
  if (!findBoostPost) {
    throw new CustomError("Boost Post does not found", 404);
  }
  res.status(200).json({
    success: true,
    message: "Boost Post deleted successfully",
  });
};

// impressionCount
export const impressionCount = async (req, res) => {
  const { boostPostId } = req.params;
  const findBoostPost = await BoostPost.findById(boostPostId);
  if (!findBoostPost) {
    throw new CustomError("Boost Post does not found", 404);
  }
  await findBoostPost.updateOne({
    $push: {
      impression: {
        userId: mongoose.Types.ObjectId(req.user._id),
        date: new Date(),
      },
    },
  });
  res.status(200).json({
    success: true,
    message: "impression count successfully",
    findBoostPost,
  });
};

// impressionChart
export const impressionChart = async (req, res) => {
  const { boostPostId, day } = req.params;
  const findBoostPost = await BoostPost.findById(boostPostId);
  if (!findBoostPost) {
    throw new CustomError("Boost Post does not found", 404);
  }
  const currentDate = new Date();
  const impressionStartDate = new Date();
  impressionStartDate.setDate(currentDate.getDate() - day);
  const filteredImpressions = findBoostPost.impression.filter((impression) => {
    return (
      impression.date >= impressionStartDate && impression.date <= currentDate
    );
  });
  res.status(200).json({
    success: true,
    message: "successfully",
    total: filteredImpressions.length,
    filteredImpressions,
  });
};
