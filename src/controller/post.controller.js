import { Post } from "../models/post.js";
import { CustomError } from "../middleware/index.js";
import { uploadFile } from "../utils/index.js";
import { User } from "../models/user.js";
import mongoose from "mongoose";
import { BoostPost } from "../models/boostPost.js";

// createPost

export const createPost = async (req, res) => {
  const files = req.body.file;
  const { fileType } = req.body;

  // if (!files || files.length === 0) {
  //   throw new CustomError("No Files Found!", 404);
  // }

  if (files || files?.length > 0) {
    const fileKeys = await Promise.all(
      files.map(async (file) => {
        let base64Image = file?.file?.split(";base64,").pop();
        const buffer = Buffer.from(base64Image, "base64");
        const fileKey = await uploadFile(buffer);
        return { fileKey, type: file?.type };
      })
    );
    req.body.file = fileKeys;
  }
  const userId = req.user?._id;
  const post = await Post.create({
    ...req.body,
    author: userId,
  });

  res.status(201).json({
    success: true,
    message: "Created Successfully.",
    post,
  });
};

// getAllPosts
export const getAllPosts = async (req, res) => {
  const maxBoostPosts = 3;
  const limit = req.query.limit || 5;
  const page = req.query.page || 1;
  const startIndex = Math.max(
    Number(limit) * (Number(page) - 1) - maxBoostPosts,
    0
  );

  const userInterest = req.user.interestingCategories;
  const country = req.user.country;
  const userId = req.user._id;

  const boostPosts = await BoostPost.find({
    $and: [
      { statusBoost: true },
      {
        interests: {
          $in: userInterest.map((interest) => new RegExp(interest, "i")),
        },
      },
      { targetCountry: { $regex: new RegExp(`^${country}$`, "i") } },
      {
        impression: {
          $nin: userId,
        },
      },
    ],
  })
    .populate([
      {
        path: "post",
        populate: [
          {
            path: "comments",
            populate: [
              {
                path: "author",
                select: ["firstName", "lastName", "accountType", "profilePic"],
              },
              {
                path: "replyComments",
                populate: {
                  path: "author",
                  select: [
                    "firstName",
                    "lastName",
                    "profilePic",
                    "accountType",
                  ],
                },
              },
            ],
          },
          {
            path: "author",
            select: ["firstName", "lastName", "profilePic", "accountType"],
          },
          {
            path: "likes",
            select: ["firstName", "lastName"],
          },
        ],
      },
    ])
    .sort({ updatedAt: -1, likes: -1 })
    .limit(maxBoostPosts);

  const boostPostCount = await BoostPost.countDocuments({
    $and: [
      { statusBoost: true },
      {
        interests: {
          $in: userInterest.map((interest) => new RegExp(interest, "i")),
        },
      },
      { targetCountry: { $regex: new RegExp(`^${country}$`, "i") } },
      {
        impression: {
          $nin: userId,
        },
      },
    ],
  }).sort({ updatedAt: -1, likes: -1 });

  const regularPosts = await Post.find({
    $and: [
      { _id: { $nin: boostPosts.map((post) => post._id) } },
      { "boostPost.impression": { $ne: userId } },
    ],
  })
    .populate([
      {
        path: "comments",
        populate: [
          {
            path: "author",
            select: ["firstName", "lastName", "profilePic", "accountType"],
          },
          {
            path: "replyComments",
            populate: {
              path: "author",
              select: ["firstName", "lastName", "profilePic", "accountType"],
            },
          },
        ],
      },
      {
        path: "likes",
        select: ["firstName", "lastName"],
      },
      {
        path: "author",
        select: ["firstName", "lastName", "profilePic", "accountType"],
      },
      {
        path: "boostPost",
        select: ["statusBoost"],
      },
    ])
    .skip(startIndex)
    .limit(Number(limit) - Math.min(maxBoostPosts, boostPostCount))
    .sort({ updatedAt: -1, likes: -1 });

  // const regularPosts = await Post.aggregate([
  //   {
  //     $match: {
  //       _id: { $nin: boostPosts.map((post) => post._id) },
  //       "boostPost.impression": { $ne: userId },
  //     },
  //   },

  //   {
  //     $lookup: {
  //       from: "comments",
  //       let: { commentIds: { $ifNull: ["$comments", []] } }, // Provide an empty array if "comments" is null
  //       pipeline: [
  //         {
  //           $match: {
  //             $expr: { $in: ["$_id", "$$commentIds"] },
  //           },
  //         },
  //         {
  //           $lookup: {
  //             from: "users", // Assuming you have a "users" collection for authors
  //             localField: "author",
  //             foreignField: "_id",
  //             as: "author",
  //           },
  //         },

  //         {
  //           $lookup: {
  //             from: "comments",
  //             let: { replyCommentIds: { $ifNull: ["$replyComments", []] } }, // Provide an empty array if "replyComments" is null
  //             pipeline: [
  //               {
  //                 $match: {
  //                   $expr: { $in: ["$_id", "$$replyCommentIds"] },
  //                 },
  //               },
  //               {
  //                 $lookup: {
  //                   from: "users", // Assuming you have a "users" collection for authors
  //                   localField: "author",
  //                   foreignField: "_id",
  //                   as: "author",
  //                 },
  //               },
  //               {
  //                 $unwind: "$author", // Since we only need the first matched author
  //               },
  //               {
  //                 $project: {
  //                   _id: 1,
  //                   text: 1,
  //                   createdAt:1,
  //                   author: {
  //                     firstName: "$author.firstName",
  //                     lastName: "$author.lastName",
  //                     accountType: "$author.accountType",
  //                     profilePic: "$author.profilePic",
  //                     replyComments: "$author.replyComments",
  //                   },
  //                 },
  //               },
  //             ],
  //             as: "replyComments",
  //           },
  //         },
  //         {
  //           $unwind: "$author", // Since we only need the first matched author
  //         },

  //       ],
  //       as: "comments",
  //     },
  //   },

  //   {
  //     $lookup: {
  //       from: "users",
  //       localField: "likes",
  //       foreignField: "_id",
  //       as: "likes",
  //     },
  //   },
  //   {
  //     $lookup: {
  //       from: "users",
  //       localField: "author",
  //       foreignField: "_id",
  //       as: "author",
  //     },
  //   },
  //   {
  //     $unwind: "$author", // Unwind the "author" array into individual documents
  //   },
  //   {
  //     $lookup: {
  //       from: "boostposts",
  //       localField: "boostPost",
  //       foreignField: "_id",
  //       as: "boostPost",
  //     },
  //   },

  //   {
  //     $addFields: {
  //       totalLikes: { $size: "$likes" },
  //       totalComments: { $size: "$comments" },
  //     },
  //   },
  //   {
  //     $addFields: {
  //       bigTotal: { $add: ["$totalLikes", "$totalComments"] },
  //     },
  //   },
  //   { $skip: startIndex },
  //   { $limit: Number(limit) - Math.min(maxBoostPosts, boostPostCount) },
  //   { $sort: { bigTotal: -1, updatedAt: -1 } },
  // ]);

  // console.log(regularPosts);

  const allPosts = [...boostPosts, ...regularPosts];

  res.status(200).json({
    success: true,
    allPosts,
  });
};

export const getMyPosts = async (req, res) => {
  const userPosts = await Post.find({ author: req?.params?.userId })
    .populate([
      {
        path: "comments",
        populate: [
          {
            path: "author",
            select: ["firstName", "lastName", "profilePic"],
          },
          {
            path: "replyComments",
            populate: {
              path: "author",
              select: ["firstName", "lastName", "profilePic"],
            },
          },
        ],
      },
      {
        path: "likes",
        select: ["firstName", "lastName"],
      },
      {
        path: "author",
        select: ["firstName", "lastName", "profilePic", "accountType"],
      },
    ])
    .sort({ updatedAt: -1 });
  res.status(200).json({
    success: true,
    posts: userPosts,
  });
};

// comments
export const comments = async (req, res) => {
  const { text, postId } = req.body;

  const post = await Post.findById(postId);
  if (!post) {
    throw new CustomError("Post Not Found!", 404);
  }
  await post.updateOne(
    {
      $push: { comments: { text, user: req.user } },
    },
    { new: true }
  );
  res.status(201).json({
    success: true,
    message: "Comment added  Successfully",
  });
};

// delete-comments
export const deleteComment = async (req, res) => {
  const { postId, commentId } = req.params;
  const deleteComment = await Post.findByIdAndUpdate(postId, {
    $pull: {
      comments: { $and: [{ _id: commentId }, { user: req?.user?._id }] },
    },
  });

  if (!deleteComment) {
    throw new CustomError("You can't delete this comment", 404);
  }

  res.status(200).json({
    success: true,
    message: "Comment deleted successfully",
  });
};

// bookmarks
export const bookmarks = async (req, res) => {
  const { postId } = req.params;
  const findPost = await Post.findById(postId);
  if (!findPost) {
    throw new CustomError("Post does not found", 404);
  }
  const userId = req.user._id;
  if (findPost.bookmarks.includes(userId)) {
    await findPost.updateOne({ $pull: { bookmarks: userId } });
    const getBookMarkPost = await Post.findById(postId);
    return res.status(200).json({
      success: true,
      message: "remove successfully",
      post: getBookMarkPost,
    });
  } else {
    await findPost.updateOne(
      {
        $push: { bookmarks: userId },
      },
      { new: true }
    );
    const getBookMarkPost = await Post.findById(postId);
    return res.status(200).json({
      success: true,
      message: "bookmark successfully",
      post: getBookMarkPost,
    });
  }
};

//getUserBookmarks
export const getUserBookmarks = async (req, res) => {
  const { _id } = req.user;
  const foundPosts = await Post.find({ bookmarks: { $in: _id } }).populate([
    {
      path: "comments",
      populate: [
        {
          path: "author",
          select: ["firstName", "lastName", "profilePic"],
        },
        {
          path: "replyComments",
          populate: {
            path: "author",
            select: ["firstName", "lastName", "profilePic"],
          },
        },
      ],
    },
    {
      path: "likes",
      select: ["firstName", "lastName"],
    },
    {
      path: "author",
      select: ["firstName", "lastName", "profilePic"],
    },
  ]);
  res.status(200).json({
    success: true,
    message: "UserBookmarks successfully",
    foundPosts,
  });
};

//likes and dislike
export const likes = async (req, res) => {
  const { postId } = req.params;

  const findPost = await Post.findById(postId);

  if (!findPost) {
    throw new CustomError("Post does not found", 404);
  }

  const userId = req.user._id;

  if (findPost.likes.includes(userId)) {
    await findPost.updateOne({ $pull: { likes: userId } });
    const getDisLikesPost = await Post.findById(postId);
    res.status(200).json({
      success: true,
      message: "Disliked successfully",
      likeCount: getDisLikesPost?.likes.length,
      post: getDisLikesPost,
    });
  } else {
    await findPost.updateOne(
      {
        $push: { likes: userId },
      },
      { new: true }
    );

    const getLikesPost = await Post.findById(postId);
    res.status(200).json({
      success: true,
      message: "Liked successfully",
      likeCount: getLikesPost?.likes.length,
      post: getLikesPost,
    });
  }
};
//delete post
export const deletePost = async (req, res) => {
  const { postId } = req.params;
  if (!postId || postId == undefined) {
    throw new CustomError("Please Provide postId", 401);
  }

  const findPost = await Post.findOne({
    _id: mongoose.Types.ObjectId(postId),
  });
  if (!findPost) {
    throw new CustomError("User / Post does not found", 401);
    return false;
  }
  findPost.deleteOne();

  return res.status(200).json({
    success: true,
    message: "Post Deleted",
    data: findPost,
  });
};

// updatePost
export const updatePost = async (req, res) => {
  const { fileType } = req.body;
  const { postId, days } = req.params;
  const post = await Post.findOne({
    $and: [{ _id: postId, author: req?.user?._id }],
  });
  if (!post) {
    throw new CustomError("You can't update this post", 401);
  }
  const files = req.body.file;
  // let fileKeys;
  if (files || files?.length > 0) {
    const fileKeys = await Promise.all(
      files.map(async (file) => {
        let base64Image = file?.file?.split(";base64,").pop();
        const buffer = Buffer.from(base64Image, "base64");
        const fileKey = await uploadFile(buffer);
        return { fileKey, type: file?.type };
      })
    );
    req.body.file = fileKeys;
  }

  const updatedPost = await post.updateOne(
    {
      ...req.body,
      // file: fileKeys,
    },
    { new: true }
  );
  if (!updatedPost) {
    throw new CustomError("Post Not Found!", 404);
  }

  const updatedData = await Post.findOne({
    $and: [{ _id: postId, author: req?.user?._id }],
  });
  res.status(200).json({
    success: true,
    message: "Post updated successfully",
    data: updatedData,
  });
};
//  Update
export const searchPost = async (req, res) => {
  const { text } = req.query;
  const allPosts = await Post.find();
  const regex = new RegExp(text, "i");
  const posts = allPosts.filter((post) => regex.test(post.text));
  if (posts.length === 0) {
    throw new CustomError("Post Not Found!", 404);
  }
  res.status(201).json({
    success: true,
    message: "Search post successful",
    posts,
  });
};

export const allPost = async (req, res) => {
  const allPost = await Post.find().count();
  if (allPost) {
    res
      .status(200)
      .json({ message: "all Posts", status: "success", posts: allPost });
  } else {
    res
      .status(400)
      .json({ message: "filed to get Post", status: "failed", posts: 0 });
  }
};

export const allPostList = async (req, res) => {
  const allPost = await Post.find();
  if (allPost) {
    res
      .status(200)
      .json({ message: "all Posts", status: "success", posts: allPost });
  } else {
    res
      .status(400)
      .json({ message: "filed to get Post", status: "failed", posts: [] });
  }
};

export const handlePostSearch = async (req, res) => {
  const limit = req.query.limit || 30;
  const page = req.query.page || 1;
  const startIndex = Math.max(Number(limit) * (Number(page) - 1), 0);
  const { text } = req.params;

  const totalDocuments = await Post.countDocuments({
    text: { $regex: new RegExp(`${text}`, "mgi") },
  });

  const totalPages = Math.ceil(totalDocuments / limit);

  const response = await Post.find({
    text: { $regex: new RegExp(`${text}`, "mgi") },
  })
    .populate([
      {
        path: "comments",
        populate: [
          {
            path: "author",
            select: ["firstName", "lastName", "profilePic"],
          },
          {
            path: "replyComments",
            populate: {
              path: "author",
              select: ["firstName", "lastName", "profilePic"],
            },
          },
        ],
      },
      {
        path: "likes",
        select: ["firstName", "lastName"],
      },
      {
        path: "author",
        select: ["firstName", "lastName", "profilePic", "accountType"],
      },
    ])
    .skip(startIndex)
    .limit(Number(limit))
    .sort({ updatedAt: -1 });

  if (response) {
    let data = {
      totalPages,
      currentPage: page,
      response,
    };
    return res.status(200).json({
      message: "Get All Post According To Search",
      data,
      status: "success",
    });
  } else {
    return res.status(400).json({
      message: "Failed to Get All Post According To Search",
      data: null,
      status: "failed",
    });
  }
};
