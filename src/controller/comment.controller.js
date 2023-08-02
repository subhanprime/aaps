import { Comment, Post, User } from "../models/index.js";
import { CustomError } from "../middleware/throwErrors.js";
import { mongoose } from "mongoose";

// addComment
export const addComment = async (req, res) => {
  const { text, parentComment, postId, _id } = req.body;
  const user = await User.findOne({ _id: req?.user?._id });
  const findPost = await Post.findOne({ _id: postId });

  if (!user || !findPost) {
    throw new CustomError("User Or Post Not Found", 404);
  }

  const comment = await Comment.create({
    _id: mongoose.Types.ObjectId(_id),
    text,
    author: req.user._id,
    parentComment,
  });

  if (!parentComment) {
    await Post.findByIdAndUpdate(
      {
        _id: postId,
      },
      { $push: { comments: comment._id } }
    );
  } else {
    await Comment.findByIdAndUpdate(
      {
        _id: mongoose.Types.ObjectId(parentComment),
      },
      {
        $push: { replyComments: comment._id },
      }
    );
  }
  res.status(201).json({
    success: true,
    message: "Comment Added Successfully",
    data: comment,
  });
};

// likeComment
export const likeComment = async (req, res) => {
  const { comment } = req.params;

  const findUser = await User.findOne({
    _id: req?.user?._id,
  });
  const findComment = await Comment.findOne({
    _id: mongoose.Types.ObjectId(comment),
  });
  if (!findUser || !findComment) {
    throw new CustomError("User / Comment Not Found ", 404);
  }
  // if already liked
  const alreadyLiked = await Comment.findOne({
    $and: [{ likes: { $in: [findUser._id] } }, { _id: findComment._id }],
  });

  if (alreadyLiked) {
    const disLikeComment = await Comment.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(comment) },
      {
        $pull: { likes: findUser._id },
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Comment Disliked",
      data: disLikeComment,
    });
  } else {
    const likeComment = await Comment.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(comment) },
      {
        $push: { likes: findUser._id },
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Comment Liked",
      data: likeComment,
    });
  }
};

// dislikeComment
// export const dislikeComment = async (req, res) => {
//   const { comment } = req.params;
//   const findUser = await User.findOne({
//     _id: req?.user?._id,
//   });
//   const findComment = await Comment.findOne({
//     _id: mongoose.Types.ObjectId(comment),
//   });
//   if (!findUser || !findComment) {
//     throw new CustomError("User / Comment Not Found ", 404);
//   }
//   // If not liked Already
//   const alreadyLiked = await Comment.findOne({
//     $and: [{ likes: { $in: [findUser._id] } }, { _id: findComment._id }],
//   });

//   if (!alreadyLiked) {
//     throw new CustomError("Comment Not Liked Already", 401);
//   }

//   const disLikeComment = await Comment.findOneAndUpdate(
//     { _id: mongoose.Types.ObjectId(comment) },
//     {
//       $pull: { likes: findUser._id },
//     }
//   );

//   res.status(200).json({
//     success: true,
//     message: "Comment Disliked",
//     data: disLikeComment,
//   });
// };

// deleteComment
export const deleteComment = async (req, res) => {
  const { commentId } = req.params;

  const findComment = await Comment.findOne({
    _id: mongoose.Types.ObjectId(commentId),
  });
  if (!findComment) {
    throw new CustomError("Comment Not Found ", 404);
  }
  await Comment.deleteMany({ _id: { $in: findComment?.replyComments } });

  // child
  await Comment.findOneAndUpdate(
    { replyComments: { $in: findComment._id } },
    { $pull: { replyComments: findComment._id } }
  );

  await findComment.deleteOne();

  res.status(200).json({
    success: true,
    message: "Comment Deleted",
    data: findComment,
  });
};
