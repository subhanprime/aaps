import { Router } from "express";
import passport from "passport";
import { catchAsync } from "../middleware/index.js";
import {
  addComment,
  deleteComment,
//   dislikeComment,
  likeComment,
} from "../controller/comment.controller.js";

export const commentRoutes = Router();

// addComment
commentRoutes.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  catchAsync(addComment)
);

// delete comment
commentRoutes.delete(
  "/delete/:commentId",
  passport.authenticate("jwt", { session: false }),
  catchAsync(deleteComment)
);

// like comment
commentRoutes.get(
  "/like/:comment",
  passport.authenticate("jwt", { session: false }),
  catchAsync(likeComment)
);

// // dislike comment
// commentRoutes.get(
//   "/dislike/:comment",
//   passport.authenticate("jwt", { session: false }),
//   catchAsync(dislikeComment)
// );
