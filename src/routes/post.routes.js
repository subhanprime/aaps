import { Router } from "express";
import { catchAsync, upload } from "../middleware/index.js";
import {
  createPost,
  getAllPosts,
  getMyPosts,
  bookmarks,
  comments,
  likes,
  getUserBookmarks,
  searchPost,
  deletePost,
  // dislike,
  deleteComment,
  updatePost,
  allPost,
  allPostList,
  handlePostSearch,
} from "../controller/post.controller.js";
import passport from "passport";

export const postRoutes = Router();

// create
postRoutes.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  // upload.array("file"),
  catchAsync(createPost)
);

// getAllPosts
postRoutes.get(
  "/getAllPosts",
  passport.authenticate("jwt", { session: false }),
  catchAsync(getAllPosts)
);

// getUsersPosts
postRoutes.get(
  "/getMyPosts/:userId",
  passport.authenticate("jwt", { session: false }),
  catchAsync(getMyPosts)
);

// comments
// postRoutes.post(
//   "/comments",
//   passport.authenticate("jwt", { session: false }),
//   catchAsync(comments)
// );

// bookmarks
postRoutes.get(
  "/bookmarks/:postId",
  passport.authenticate("jwt", { session: false }),
  catchAsync(bookmarks)
);

// Likes
postRoutes.get(
  "/likes/:postId",
  passport.authenticate("jwt", { session: false }),
  catchAsync(likes)
);

postRoutes.get(
  "/getUserBookmarks",
  passport.authenticate("jwt", { session: false }),
  catchAsync(getUserBookmarks)
);
//deletePost
postRoutes.delete(
  "/delete/:postId",
  passport.authenticate("jwt", { session: false }),
  catchAsync(deletePost)
);

// updatePost
postRoutes.put(
  "/update/:postId",
  passport.authenticate("jwt", { session: false }),
  upload.array("file"),
  catchAsync(updatePost)
);

// DisLikes
// postRoutes.get(
//   "/dislike/:postId",
//   passport.authenticate("jwt", { session: false }),
//   catchAsync(dislike)
// );

// delete-Comment
postRoutes.get(
  "/delete-comment/:postId/:commentId",
  passport.authenticate("jwt", { session: false }),
  catchAsync(deleteComment)
);

// search_post
postRoutes.get(
  "/search-post",
  passport.authenticate("jwt", { session: false }),
  catchAsync(searchPost)
);

postRoutes.get(
  "/allPost",
  passport.authenticate("jwt", { session: false }),
  catchAsync(allPost)
);
postRoutes.get(
  "/allPostList",
  passport.authenticate("jwt", { session: false }),
  catchAsync(allPostList)
);

postRoutes.get("/search/:text", catchAsync(handlePostSearch));
